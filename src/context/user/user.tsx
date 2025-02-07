import React, { createContext, useCallback, useContext, useState } from "react";

interface UserContextProps {
  id: string | undefined;
  authId: string | undefined | null;
  token: string | undefined;
  firstName: string;
  lastName: string;
  email: string;
  place: string;
  geolocation: { lat: number | undefined; long: number | undefined };
  phone: string;
  handleIdChange: (name: string | undefined) => void;
  handleAuthIdChange: (name: string | undefined | null) => void;
  handleTokenChange: (name: string | undefined) => void;
  handleFirstNameChange: (name: string) => void;
  handleLastNameChange: (name: string) => void;
  handleEmailChange: (name: string) => void;
  handlePlaceChange: (name: string) => void;
  handleGeolocationChange: (lat: number, long: number) => void;
  handlePhoneChange: (name: string) => void;
}

const UserContext = createContext<UserContextProps>({
  id: "",
  authId: "",
  token: "",
  firstName: "",
  lastName: "",
  email: "",
  place: "",
  geolocation: { lat: undefined, long: undefined },
  phone: "",
  handleIdChange: () => {},
  handleAuthIdChange: () => {},
  handleTokenChange: () => {},
  handleFirstNameChange: () => {},
  handleLastNameChange: () => {},
  handleEmailChange: () => {},
  handlePlaceChange: () => {},
  handleGeolocationChange: () => {},
  handlePhoneChange: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [id, setId] = useState<string | undefined>("");
  const [authId, setAuthId] = useState<string | undefined | null>("");
  const [token, setToken] = useState<string | undefined>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [geolocation, setGeolocalion] = useState<{
    lat: number | undefined;
    long: number | undefined;
  }>({ lat: undefined, long: undefined });
  const [phone, setPhone] = useState<string>("");

  const handleIdChange = useCallback((id: string | undefined) => setId(id), []);
  const handleAuthIdChange = useCallback(
    (authId: string | undefined | null) => setAuthId(authId),
    [],
  );
  const handleTokenChange = useCallback(
    (token: string | undefined) => setToken(token),
    [],
  );
  const handleFirstNameChange = useCallback(
    (name: string) => setFirstName(name),
    [],
  );
  const handleLastNameChange = useCallback(
    (name: string) => setLastName(name),
    [],
  );
  const handleEmailChange = useCallback((email: string) => setEmail(email), []);
  const handlePlaceChange = useCallback((place: string) => setPlace(place), []);
  const handleGeolocationChange = useCallback(
    (lat: number, long: number) => setGeolocalion({ lat, long }),
    [],
  );
  const handlePhoneChange = useCallback((phone: string) => setPhone(phone), []);

  return (
    <UserContext.Provider
      value={{
        id,
        authId,
        token,
        firstName,
        lastName,
        email,
        place,
        geolocation,
        phone,
        handleIdChange,
        handleAuthIdChange,
        handleTokenChange,
        handleFirstNameChange,
        handleLastNameChange,
        handleEmailChange,
        handlePlaceChange,
        handleGeolocationChange,
        handlePhoneChange,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
