import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteChangeTracker from "./RouteChangeTracker";
import Login from "./pages/Login.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <RouteChangeTracker />
<<<<<<< HEAD

        <Routes>
          {/*Login page*/}
          <Route path="/" element={<Login />} />

          {/*dashboard*/}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/adminPanel" element={<AdminPanel />} />
        </Routes>

=======
        <Routes>
          {/* Login page */}
          <Route path="/" element={<Login />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Admin Panel */}
          <Route path="/adminPanel" element={<AdminPanel />} />
        </Routes>
>>>>>>> restore-old
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
