import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import swapStyleSheet from "../index.js";
const loginUrl = new URL('./styles/login.css', import.meta.url).href;
const dashboardUrl = new URL('./styles/dashboard.css', import.meta.url).href;
const adminPanelUrl = new URL('./styles/adminPanel.css', import.meta.url).href;
function RouteChangeTracker() {
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case ("/"):
        swapStyleSheet(loginUrl);
        break;
      case ("/dashboard"):
        swapStyleSheet(dashboardUrl);
        break;
      case ("/adminPanel"):
        swapStyleSheet(adminPanelUrl);
        break;
    }
  }, [location]);

  return null; // No UI
}
export default RouteChangeTracker;
