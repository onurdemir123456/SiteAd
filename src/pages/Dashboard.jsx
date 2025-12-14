// DashboardPanel.jsx
import React, { useState } from "react";
import ScrollableListBootstrap from "../components/ScrollableListBootStrap";
import DaireBlokYonetimi from "../components/dashboard/DaireBlokYonetimi";
import AidatOdemeler from "../components/dashboard/AidatOdemeler";
import TaleplerAriza from "../components/dashboard/TaleplerAriza";
import MesajlasmaChat from "../components/dashboard/MesajlasmaChat";
import MainPanel from "../components/dashboard/MainPanel";
import Duyurular from "../components/dashboard/Duyurular";
import Ayarlar from "../components/dashboard/Ayarlar";
import logoNoBg from "../assets/logoNoBg.png";

import Ayarlar from "../components/dashboard/Ayarlar";
import { useLanguage } from "../context/LanguageContext";
import { useEffect } from "react";
import supabase from "../helper/supabaseClient";


function DashboardPanel() {
  const { changeLanguage } = useLanguage();
  const [activeComponent, setActiveComponent] = useState("Ana Panel");
  const { t } = useLanguage();




  const renderComponent = () => {
    switch (activeComponent) {
      case "Ana Panel": return <MainPanel />;
      case "Duyurular": return <Duyurular />;
      case "Daireler": return <DaireBlokYonetimi />;
      case "Aidat": return <AidatOdemeler />;
      case "Talepler": return <TaleplerAriza />;
      case "Mesajlar": return <MesajlasmaChat />;
      case "Ayarlar": return <Ayarlar />;



      default: return null;
    }
  };
  useEffect(() => {
    const fetchUserLanguage = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log(data);
      if (error) {
        console.error(error);
        return;
      }
      const user = data.user;
      if (!user) return; // login değilse işlem yapma

      const { data: settings } = await supabase
        .from("settings")
        .select("language")
        .eq("id", user.id)
        .single();

      if (settings) changeLanguage(settings.language);
    };

    fetchUserLanguage();
  }, []);
  const buttons = [
    { label: t("menudashboard"), onClick: () => setActiveComponent("Ana Panel") },

    { label: t("apartments"), onClick: () => setActiveComponent("Daireler") },
    { label: t("menuannouncements"), onClick: () => setActiveComponent("Duyurular") },
    { label: t("menudues"), onClick: () => setActiveComponent("Aidat") },
    { label: t("demands"), onClick: () => setActiveComponent("Talepler") },
    { label: t("menumessages"), onClick: () => setActiveComponent("Mesajlar") },
    { label: t("menusettings"), onClick: () => setActiveComponent("Ayarlar") }

  ];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

      {/* NAVBAR */}
      <div style={{
        height: "60px",
        minHeight: "60px",
        maxHeight: "60px",
        backgroundColor: "#dadadaff",
        color: "#000000",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        fontSize: "20px",
        fontWeight: "bold",
        boxSizing: "border-box",
      }}>


        <span>{t("dashboardPanel")}</span>


        {/* LOGO */}
        <img
          src={logoNoBg}
          alt="Logo"
          style={{ height: "40px", objectFit: "contain" }}
        />
      </div>

      {/* ALT KISIM (sidebar + content) */}
      <div style={{ display: "flex", flex: 1 }}>

        {/* SIDEBAR */}
        <div style={{
          width: "150px",
          backgroundColor: "#f0f0f0",
          padding: "10px",
          borderRight: "1px solid #ddd"
        }}>
          <ScrollableListBootstrap
            items={buttons}
            height="100%"
            width="150px"
            buttonStyle={{
              width: 135,
              height: 50,
              backgroundColor: "#fff",
              color: "#000000",
              border: "none",
              marginBottom: "10px",
            }}
          />
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, padding: "20px" }}>
          {renderComponent()}
        </div>
      </div>

    </div>
  );
}

export default DashboardPanel;
