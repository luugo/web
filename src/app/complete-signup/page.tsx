"use client"
import React, {useEffect, useState} from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {useRouter} from "next/navigation";
import {AuthenticationPostDefaultResponse, Place, PlaceApi, UserApi, UserTypeEnum} from "@api";
import Select from "@/shared/Select/Select";
import {useLocalStorage} from "react-use";

const PageRegister = () => {
  const router = useRouter();

  const [hasPermission, setHasPermission] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [place, setPlace] = useState('');
  const [options, setOptions] = useState<Place[]>([]);
  const [auth, ] = useLocalStorage<AuthenticationPostDefaultResponse|null>('auth', null);

  useEffect(() => {
    if (auth) {
      if (!auth.authenticationId && auth.token) return router.push("/");
      else setHasPermission(true);
    } else {
      return router.push("/")
    }

    (async () => {
      try {
        const placeApi = new PlaceApi();
        const result = await placeApi.placeGet({isActive: true});
        setOptions(result);
      } catch (error) {
        console.error('Erro ao buscar opções da API', error);
      }
    })();
  }, [auth, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (auth) {
      try {
        const authenticationId = auth!.authenticationId;
        const userApi = new UserApi();

        const user = {
          authenticationId,
          firstName,
          lastName,
          place,
          type: UserTypeEnum.Normal
        }

        const result = await userApi.userPost({user: user})

        if (result.token) {
          localStorage.setItem('auth', JSON.stringify(result));
          router.push("/");
        }
      } catch (error) {
        console.error('Erro durante a solicitação:', error);
      }
    }
  };

  return (
    <div>
      {hasPermission && (
        <div className={`nc-PageRegister`} data-nc-id="PageRegister">
          <div className="container mb-24 lg:mb-32">
            <h2
              className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
              Cadastro
            </h2>
            <div className="max-w-md mx-auto space-y-6">
              {/* FORM */}
              <form className="grid grid-cols-1 gap-6"
                    onSubmit={(e) => handleSubmit(e)}>
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Nome
                  </span>
                  <Input
                    type="text"
                    className="mt-1"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Sobrenome
                  </span>
                  <Input
                    type="text"
                    className="mt-1"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                    Localização
                  </span>
                  <Select className="mt-1.5"
                          value={place}
                          onChange={(e) => setPlace(e.target.value)}>
                    <option value="">Selecione...</option>
                    {options.map((option) => (
                      <option key={`${option.city}-${option.state}`}
                              value={`${option.city}/${option.state}`}>
                        {`${option.city}, ${option.state}`}
                      </option>
                    ))}
                  </Select>
                </label>
                <ButtonPrimary type="submit" onClick={() => handleSubmit}>Continuar</ButtonPrimary>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageRegister;
