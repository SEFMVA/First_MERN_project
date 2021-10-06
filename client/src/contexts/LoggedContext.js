import { createContext, useState } from "react";

const LoggedContext = createContext({
  token: false,
  setToken: (token) => {},
  getToken: () => {},
  isLogged: () => {},
  logout: () => {},
});

export function LoggedContextProvider(props) {
  const [token, setToken] = useState(false);
  const [logged, setLogged] = useState(false);

  function setTokenWrapper(token) {
    localStorage.setItem("authToken", token);
    setToken((prev) => token);
    setLogged((prev) => true);
  }

  function getToken() {
    return token;
  }

  function isLogged() {
    return logged;
  }

  function logout() {
    localStorage.clear();
    setToken((prev) => false);
    setLogged((prev) => false);
  }

  const context = {
    token: token,
    setToken: setTokenWrapper,
    getToken: getToken,
    isLogged: isLogged,
    logout: logout,
  };

  return (
    <LoggedContext.Provider value={context}>
      {props.children}
    </LoggedContext.Provider>
  );
}

export default LoggedContext;
