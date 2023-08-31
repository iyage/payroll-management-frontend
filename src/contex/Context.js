import { createContext, useState } from "react";

export const GlobalContext = createContext({});
export function ContexProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [auth, setAuth] = useState({});
  return (
    <GlobalContext.Provider
      value={{
        login,
        setLogin,
        auth,
        setAuth,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
