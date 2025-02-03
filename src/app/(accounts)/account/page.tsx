'use client'
import Label from "@/components/Label/Label";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import {AlertOptions} from "@/interfaces";
import {AuthenticationPostDefaultResponse, MediaApi, User, UserApi, UserContactApi, UserTypeEnum} from "@api";
import {useUserContext} from "@/context";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import {Alert} from "@/shared/Alert/Alert";
import {useRouter} from "next/navigation";
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
  const [emailContactId, setEmailContactId] = useState<string | undefined>('');
  const [phoneContactId, setPhoneContactId] = useState<string | undefined>('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const userApi = new UserApi();
  const mediaApi = new MediaApi();
  const userContactApi = new UserContactApi();

  const {
    handleFirstNameChange,
    handleLastNameChange,
    handlePlaceChange,
    handleEmailChange,
    handlePhoneChange
  } = useUserContext();

  let storageData: any = null;
  if (typeof window !== 'undefined') {
    storageData = localStorage.getItem('luugo');
  }

  const handleUserContacts = async (userId: string, token: string) => {
    const response = await userContactApi.userContactGet({ userId: userId }, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })

    return response
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storageData !== null) {
          const luugo: AuthenticationPostDefaultResponse = JSON.parse(storageData);

          if (id) return;

          const userResp: User[] = await userApi.userGet({ id: luugo.user?.id }, {
            headers: {
              "Authorization": `Bearer ${luugo?.token}`,
              "Content-Type": "application/json",
            }
          });
          if (userResp) {
            const user = userResp[0];
            setUser(userResp[0]);
            setId(user.id);
            setAuthId(user.authenticationId);
            setToken(luugo.token);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setPlace(user.place);
            if (user.id && luugo.token) {
              const data = await handleUserContacts(user.id, luugo.token)
              if (data.length) {
                const _phone = data.filter((c: { type: string; }) => c.type == 'PHONE')
                const _email = data.filter((c: { type: string; }) => c.type == 'EMAIL')
                if (_phone.length) {
                  setPhoneContactId(_phone[0].id)
                  setPhone(_phone[0].value);
                }
                if (_email.length) {
                  setEmailContactId(_email[0].id)
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
  },  [id, router]);

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

  const changePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
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
          place: place,
          authenticationId: authId,
          type: UserTypeEnum.Normal,
        }

      const userContact: any = [
        {
          userId: id,
          type: "EMAIL",
          value: email,
          isVisible: true
        },
        {
          userId: id,
          type: "PHONE",
          value: phone,
          isVisible: true
        }
      ]

      if (storageData !== null) {
        let luugo = JSON.parse(storageData);
        luugo['user'].firstName = firstName;
        luugo['user'].lastName = lastName;
        luugo['user'].place = place;
        let contactsObject: any = []
        userContact?.forEach((obj: any) => {
          contactsObject.push(obj)
        })
        luugo['contacts'] = contactsObject;
        localStorage.setItem('luugo', JSON.stringify(luugo));
      }

      const userPutResponse = await userApi.userPut({ user }, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const putUserContact: any = [
        {
          id: emailContactId,
          userId: id,
          type: "EMAIL",
          value: email,
          isVisible: true
        },
        {
          id: phoneContactId,
          userId: id,
          type: "PHONE",
          value: phone,
          isVisible: true
        }
      ]

      let contactPutResponse;
      let storage = JSON.parse(storageData)

      // if (storage['contacts'] === undefined) {
      //   for (let contact of userContact) {
      //     contactPutResponse = await userContactApi.userContactPost({ userContact: contact }, {
      //       headers: {
      //         "Authorization": `Bearer ${token}`,
      //         "Content-Type": "application/json",
      //       },
      //     })
      //   }
      // } else {
      //   for (let contact of putUserContact) {
      //     contactPutResponse = await userContactApi.userContactPut({ userContact: contact }, {
      //       headers: {
      //         "Authorization": `Bearer ${token}`,
      //         "Content-Type": "application/json",
      //       }
      //     })
      //   }
      // }

      if (userPutResponse) {
        showAlert('Atualizado com sucesso!');
        handleFirstNameChange(firstName);
        handleLastNameChange(lastName);
        handlePlaceChange(place);
        // handlePhoneChange(phone);
        // handleEmailChange(email);
      } else {
        showAlert('Error', 'error')
      }
    } catch (error) {
      console.error("Erro ao salvar dados do usuário:", error);
    }
  }

  const onDeleteAccount = useCallback(async () => {
    if (storageData !== null) {
      let luugo = JSON.parse(storageData);
      try {
        await userApi.userDelete({ id: luugo.user?.id }, {
          headers: {
            "Authorization": `Bearer ${luugo?.token}`,
            "Content-Type": "application/json",
          }
        })
        setDeleteModalVisible(false);
        localStorage.removeItem('luugo');
        showAlert('Conta de usuário Deletada com Sucesso!')
        setTimeout(() => {
          router.push("/");
        }, 5000)
      } catch (error) {
        setDeleteModalVisible(false);
        showAlert('Conta de usuário não deletada. Por favor tente outra vez!', 'error');
      }
    }
  }, [storageData, userApi])

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setThumbnailPreview(imageUrl);

    setSelectedImage(file);

    try {
      const uploadedMediaId = await mediaApi.mediaPost({
        file: file,
        type: 'PHOTO',
      }, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      const mediaDetails = await mediaApi.mediaGet({ id: uploadedMediaId }, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      const user: User =
        {
          id,
          firstName: firstName,
          lastName: lastName,
          place: place,
          authenticationId: authId,
          type: UserTypeEnum.Normal,
          thumbnail: mediaDetails[0].url,
        }

      const userPutResponse = await userApi.userPut({ user }, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (userPutResponse) {
        setThumbnail(mediaDetails[0].url!);
        showAlert("Imagem atualizada com sucesso!");
      } else {
        showAlert("Erro ao atualizar a imagem.", "error");
      }
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      showAlert("Erro ao atualizar a imagem.", "error");
    }
  };

  return (
    <>
      <div className={`nc-AccountPage`}>
        <div className="fixed left-0 top-0 z-max w-full p-4">
          {isShowAlert && (
            <Alert type={typeAlert} onClick={() => setShowAlert(false)}>
              {alert}
            </Alert>
          )}
        </div>
        <div className="space-y-10 sm:space-y-12">
          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl font-semibold">Informações de Usuário</h2>
          <div className="flex flex-col md:flex-row items-start md:space-x-6">
            {/* Avatar no topo, com o nome e outras informações abaixo */}
            <div className="flex-shrink-0 flex items-center justify-center w-full md:w-32 h-32 mb-6 md:mb-0">
              {/* AVATAR */}
              <div className="relative rounded-full overflow-hidden flex">
                <img
                  src={thumbnailPreview || user?.thumbnail || ""}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover z-0"
                  alt={""}/>
                {/* Botão de editar */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white cursor-pointer group">
                  <i className="text-2xl las la-camera"></i>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageChange} // Chama a função para tratar o upload
                  />
                </div>
              </div>
            </div>

            {/* Informações do usuário */}
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div>
                <Label>Nome</Label>
                <Input className="mt-1.5" defaultValue={firstName} onChange={changeFisrtName} />
              </div>
              <div>
                <Label>Sobrenome</Label>
                <Input className="mt-1.5" defaultValue={lastName} onChange={changeLastName} />
              </div>
              <div>
                <Label>Endereço</Label>
                <div className="mt-1.5 flex">
                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-map-signs"></i>
                </span>
                  <Input className="!rounded-l-none" defaultValue={place} onChange={changePlace} />
                </div>
              </div>
              {/*<div>*/}
              {/*  <Label>E-mail</Label>*/}
              {/*  <div className="mt-1.5 flex">*/}
              {/*  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">*/}
              {/*    <i className="text-2xl las la-envelope"></i>*/}
              {/*  </span>*/}
              {/*    <Input*/}
              {/*      className="!rounded-l-none"*/}
              {/*      placeholder="example@email.com"*/}
              {/*      defaultValue={email}*/}
              {/*      onChange={changeEmail}*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*</div>*/}
              {/*<div>*/}
              {/*  <Label>Telefone</Label>*/}
              {/*  <div className="mt-1.5 flex">*/}
              {/*  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">*/}
              {/*    <i className="text-2xl las la-phone-volume"></i>*/}
              {/*  </span>*/}
              {/*    <Input className="!rounded-l-none" defaultValue={phone} onChange={changePhone} />*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className="flex pt-2 gap-6">
                <ButtonPrimary onClick={onUpdateAccount}>Atualizar conta</ButtonPrimary>
                <ButtonSecondary
                  onClick={() => setDeleteModalVisible(true)}
                  className="text-red-500 border border-red-400 dark:border-slate-700"
                >
                  Deletar Conta
                </ButtonSecondary>
              </div>
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
    </>
  );
};

export default AccountPage;
