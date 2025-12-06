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
        <Routes>
          {/* Login page */}
          <Route path="/" element={<Login />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Admin Panel */}
          <Route path="/adminPanel" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
