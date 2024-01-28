import { createContext, useCallback, useContext, useState } from "react";

interface UserContextProps {
  id: string;
  authId: string;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  place: string;
  phone: string;
  handleIdChange: (name: string) => void;
  handleAuthIdChange: (name: string) => void;
  handleTokenChange: (name: string) => void;
  handleFirstNameChange: (name: string) => void;
  handleLastNameChange: (name: string) => void;
  handleEmailChange: (name: string) => void;
  handlePlaceChange: (name: string) => void;
  handlePhoneChange: (name: string) => void;
}

const UserContext = createContext<UserContextProps>({
  id: '',
  authId: '',
  token: '',
  firstName: '',
  lastName: '',
  email: '',
  place: '',
  phone: '',
  handleIdChange: () => {},
  handleAuthIdChange: () => {},
  handleTokenChange: () => {},
  handleFirstNameChange: () => {},
  handleLastNameChange: () => {},
  handleEmailChange: () => {},
  handlePlaceChange: () => {},
  handlePhoneChange: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [id, setId] = useState<string>('');
  const [authId, setAuthId] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [place, setPlace] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const handleIdChange = useCallback((id: string) => setId(id), [])
  const handleAuthIdChange = useCallback((authId: string) => setAuthId(authId), [])
  const handleTokenChange = useCallback((token: string) => setToken(token), [])
  const handleFirstNameChange = useCallback((name: string) => setFirstName(name), [])
  const handleLastNameChange = useCallback((name: string) => setLastName(name), [])
  const handleEmailChange = useCallback((email: string) => setEmail(email), [])
  const handlePlaceChange = useCallback((place: string) => setPlace(place), [])
  const handlePhoneChange = useCallback((phone: string) => setPhone(phone), [])

  return <UserContext.Provider
    value={{
      id,
      authId,
      token,
      firstName,
      lastName,
      email,
      place,
      phone,
      handleIdChange,
      handleAuthIdChange,
      handleTokenChange,
      handleFirstNameChange,
      handleLastNameChange,
      handleEmailChange,
      handlePlaceChange,
      handlePhoneChange
    }}>{ children }</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);