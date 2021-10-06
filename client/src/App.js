import "./App.css";
import "./components/Layout";
import Login from "./components/Login";

import { useContext } from "react";
import AdminContext from "./contexts/AdminContext";
import LoggedContext from "./contexts/LoggedContext";
import Layout from "./components/Layout";
import AdminPanel from "./components/AdminPanel";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const adminCtx = useContext(AdminContext);
  const loggedCtx = useContext(LoggedContext);
  const isLogged = loggedCtx.isLogged();
  const isAdmin = adminCtx.getIsAdmin();

  console.log(`Is logged: ${isLogged}`);

  return (
    <div className="App">
      {!isLogged ? (
        <Login></Login>
      ) : isAdmin ? (
        <AdminPanel></AdminPanel>
      ) : (
        <Layout></Layout>
      )}
    </div>
  );
}

export default App;
