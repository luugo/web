import { createContext, useCallback, useContext, useState } from "react";

interface UserContextProps {
  name: string;
  email: string;
  place: string;
  phone: string;
  handleNameChange: (name: string) => void;
  handleEmailChange: (name: string) => void;
  handlePlaceChange: (name: string) => void;
  handlePhoneChange: (name: string) => void;
}

const UserContext = createContext<UserContextProps>({
  name: "",
  email: "",
  place: "",
  phone: "",
  handleNameChange: () => {},
  handleEmailChange: () => {},
  handlePlaceChange: () => {},
  handlePhoneChange: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [place, setPlace] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = useCallback((name: string) => {setName(name)}, [])
  const handleEmailChange = useCallback((email: string) => {setEmail(email)}, [])
  const handlePlaceChange = useCallback((place: string) => {setPlace(place)}, [])
  const handlePhoneChange = useCallback((phone: string) => {setPhone(phone)}, [])

  return <UserContext.Provider
    value={{
      name,
      email,
      place,
      phone,
      handleNameChange,
      handleEmailChange,
      handlePlaceChange,
      handlePhoneChange
    }}>{ children }</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);