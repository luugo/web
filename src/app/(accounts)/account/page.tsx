'use client'
import Label from "@/components/Label/Label";
import React, { ChangeEvent, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Textarea from "@/shared/Textarea/Textarea";
import { avatarImgs } from "@/contains/fakeData";
import Image from "next/image";
import { AlertOptions } from "@/interfaces";
import { AuthenticationPostDefaultResponse, User, UserApi, UserContactApi, UserPutRequest, UserTypeEnum } from "../../../../luugoapi";
import { useUserContext } from "@/context";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { Alert } from "@/shared/Alert/Alert";
import { useRouter } from "next/navigation";
import ModalDelete from "@/components/ModalDelete";


const AccountPage = () => {
  const router = useRouter();
  const [alert, setAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState<keyof AlertOptions>('success');
  const [isShowAlert, setShowAlert] = useState<boolean>(false);
  const [place, setPlace] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [id, setId] = useState<string | undefined>('');
  const [authId, setAuthId] = useState<string | null | undefined>('');
  const [token, setToken] = useState<string | null | undefined>('');
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  const userApi = new UserApi();
  const userContactApi = new UserContactApi();

  const {
    handleFirstNameChange,
    handleLastNameChange,
    handlePlaceChange,
  } = useUserContext();

  let storageData: any = null;
  if (typeof window !== 'undefined') {
    storageData = localStorage.getItem('luugo');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storageData !== null) {
          const luugo: AuthenticationPostDefaultResponse = JSON.parse(storageData);
          const userResp: User[] = await userApi.userGet({ id: luugo.user?.id });
          if (userResp) {
            const user = userResp[0];
            setId(user.id);
            setAuthId(user.authenticationId);
            setToken(luugo.token);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setPlace(user.place);
            if (user.id) {
              const userContactResp = await userContactApi.userContactGet({ userId: user.id });
              if (userContactResp.length) {
                const _phone = userContactResp.filter(c => c.type == 'PHONE')
                const _email = userContactResp.filter(c => c.type == 'EMAIL')
                if (_phone.length) setPhone(_phone[0].value);
                if (_email.length) {
                  setEmail(_email[0].value);
                }
              }
            }
          }
        } else {
          handlePlaceChange('');
          handleFirstNameChange('');
          handleLastNameChange('');
          router.push('/login');
        }
      } catch (error) {
        console.error("Erro ao recuperar dados do usuário:", error);
      }
    };

    fetchData();
  }, []);

  const showAlert = (msg: string, type: keyof AlertOptions = 'success') => {
    setAlert(msg);
    setTypeAlert(type);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  }

  const changeFisrtName = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const changeLastName = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const changeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const changePlace = (event: ChangeEvent<HTMLInputElement>) => {
    setPlace(event.target.value);
  };

  const onUpdateAccount = async () => {
    try {
      const user: User =
      {
        id,
        firstName: firstName,
        lastName: lastName,
        place,
        authenticationId: authId,
        type: UserTypeEnum.Normal
      }

      if (storageData !== null) {
        let luugo = JSON.parse(storageData);
        luugo['user'].firstName = firstName;
        luugo['user'].lastName = lastName;
        luugo['user'].place = place;
        localStorage.setItem('luugo', JSON.stringify(luugo));
      }

      const userPutResponse = await userApi.userPut({ user }, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (userPutResponse) {
        showAlert('Atualizado com sucesso!');
        handleFirstNameChange(firstName);
        handleLastNameChange(lastName);
        handlePlaceChange(place);
      } else {
        showAlert('Error', 'error')
      }
    } catch (error) {
      console.error("Erro ao salvar dados do usuário:", error);
    }
  }

  const onDeleteAccount = async () => {
    if (storageData !== null) {
      let luugo = JSON.parse(storageData);
      console.log(luugo)
      userApi.userDelete({ id: luugo.user?.id }).then(
        (res: any) => {
          if (res.status == 204) {
            localStorage.removeItem('luugo');
            router.push("/");
          }
        }
      );
    }
  }

  return (
    <div className={`nc-AccountPage `}>
      <div className="fixed left-0 top-0 z-max w-full p-4">
        {isShowAlert && (<Alert type={typeAlert} onClick={() => setShowAlert(false)}>{alert}</Alert>)}
      </div>
      <div className="space-y-10 sm:space-y-12">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Account infomation
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 flex items-start">
            {/* AVATAR */}
            <div className="relative rounded-full overflow-hidden flex">
              <Image
                src={avatarImgs[2]}
                alt="avatar"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full object-cover z-0"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="mt-1 text-xs">Trocar Imagem</span>
              </div>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
            <div>
              <Label>Nome</Label>
              <Input className="mt-1.5" defaultValue={firstName} onChange={changeFisrtName} />
            </div>
            <div>
              <Label>Sobrenome</Label>
              <Input className="mt-1.5" defaultValue={lastName} onChange={changeLastName} />
            </div>

            {/* ---- */}

            {/* ---- */}
            <div>
              <Label>E-mail</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-envelope"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  placeholder="example@email.com"
                  defaultValue={email}
                  onChange={changeEmail}
                />
              </div>
            </div>

            {/* ---- */}
            <div className="max-w-lg">
              <Label>Data de nascimento</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-calendar"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  type="date"
                  defaultValue="1990-07-22"
                />
              </div>
            </div>
            {/* ---- */}
            <div>
              <Label>Endereço</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-map-signs"></i>
                </span>
                <Input
                  className="!rounded-l-none"
                  defaultValue={place}
                  onChange={changePlace}
                />
              </div>
            </div>

            {/* ---- */}
            <div>
              <Label>Gênero</Label>
              <Select className="mt-1.5">
                <option value="Male">Masculino</option>
                <option value="Female">Feminino</option>
                <option value="Other">Outro</option>
              </Select>
            </div>

            {/* ---- */}
            <div>
              <Label>Telefone</Label>
              <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-phone-volume"></i>
                </span>
                <Input className="!rounded-l-none" defaultValue={phone} />
              </div>
            </div>
            {/* ---- */}
            <div>
              <Label>Sobre você</Label>
              <Textarea className="mt-1.5" defaultValue="..." />
            </div>
            <div className="flex pt-2 gap-6">
              <ButtonPrimary onClick={onUpdateAccount}>Atualizar conta</ButtonPrimary>
              <ButtonSecondary
                onClick={() => setDeleteModalVisible(true)}
                className="text-red-500 border border-red-400 dark:border-slate-700">
                Deletar Conta
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </div>
      <ModalDelete
        modalTitle={'Deletar Conta'}
        modalDescription={'Tem certeza que deseja deletar sua conta? Esta ação é irrevessível'}
        show={deleteModalVisible}
        onCloseModalDelete={() => setDeleteModalVisible(false)}
        handleConfirm={onDeleteAccount}
      />
    </div>
  );
};

export default AccountPage;
