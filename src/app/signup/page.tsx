"use client"
import React, {useState} from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {AuthenticationApi} from "@api";
import {Alert} from "@/shared/Alert/Alert";

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const fromToError = (message: string) => {
  let msg = message;
  switch (message) {
    case 'weak_password':
      msg = 'Por favor, escolha uma senha mais forte. Uma senha forte deve conter uma combinação de letras maiúsculas e minúsculas, números e caracteres especiais.';
      break;
    default:
      break;
  }
  return msg
}

const renderOR = () => {
  if(!loginSocials.length) {
    return (
      <div className="relative text-center">
        <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
          OR
        </span>
        <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
      </div>
    )
  }
}

const PageSignUp = () => {
  const [alert, setAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if(password != confirmPassword) {
        return showError('As senhas não coincidem. Por favor, tente novamente.');
      }
      const authenticationApi = new AuthenticationApi();
      const requestParameters = {
        authenticationEmailPostRequest: {
          email,
          password,
          confirmPassword: password,
        }
      }
  
      const result = await authenticationApi.authenticationEmailPost(requestParameters)
      
      router.push("/sign-up-confirm-code");
      
    } catch (e: any) {
      const response = await e.response.json();
      const error = response.map((err: any)=>err.message).join(', ')
      showError(error, true);
      console.error('Erro durante a solicitação:', response);
    }
  };

  const showError = (msg: string, fromTo: boolean = false) => {
    if(fromTo) msg = fromToError(msg);
    setAlert(msg);
    setShowAlert(true);
    setTimeout(()=>{
      setShowAlert(false);
    },5000);
  }
  
  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="absolute top-0 z-max w-full p-4">
      {showAlert && (<Alert type="error" onClick={() => setShowAlert(false)}>{alert}</Alert>)}
      </div>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
        Inscrever-se
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
            {!loginSocials.length && loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className=" flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  sizes="40px"
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          {renderOR()}
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6"
          onSubmit={(e) => handleSubmit(e)}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                E-mail
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                value={email}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Senha
              </span>
              <Input type="password" className="mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirmar senha
              </span>
              <Input type="password" className="mt-1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            <ButtonPrimary type="submit">Continuar</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Já tem uma conta? {` `}
            <Link className="text-green-600" href="/login">
              Entrar
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
