import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteChangeTracker from "./RouteChangeTracker";
import Login from "./pages/Login.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Dashboard from "./pages/Dashboard.jsx";
function App() {
  return(
  <BrowserRouter>
  <RouteChangeTracker/>
    <Routes>
      {/*Login page*/}
      <Route path = "/" element = {<Login/>} />
      {/*dashboard*/}
      <Route path= "/dashboard" element = {<Dashboard/>}/>
      <Route path= "/adminPanel" element = {<AdminPanel/>}/>
    </Routes>
  </BrowserRouter>);
}
export default App;