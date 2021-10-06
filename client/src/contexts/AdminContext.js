import { createContext, useState } from "react";

const AdminContext = createContext({
  isAdmin: false,
  setAsAdmin: (flag) => {},
  getIsAdmin: () => {},
});

export function AdminContextProvider(props) {
  const [isAdmin, setIsAdmin] = useState(false);

  function setAsAdmin(flag) {
    setIsAdmin((prev) => flag);
  }

  function getIsAdmin() {
    return isAdmin;
  }

  const context = {
    isAdmin: isAdmin,
    setAsAdmin: setAsAdmin,
    getIsAdmin: getIsAdmin,
  };
  return (
    <AdminContext.Provider value={context}>
      {props.children}
    </AdminContext.Provider>
  );
}

export default AdminContext;
