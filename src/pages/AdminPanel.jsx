import ScrollableListBootstrap from "../components/ScrollableListBootStrap";
import { useState } from "react";
import MainPanel from "../components/adminPanel/MainPanel";
import Duyurular from "../components/adminPanel/Duyurular";
import DaireBlokYonetimi from "../components/adminPanel/DaireBlokYonetimi";
import AidatOdemeler from "../components/adminPanel/AidatOdemeler";
import GelirGider from "../components/adminPanel/GelirGider";
import TaleplerAriza from "../components/adminPanel/TaleplerAriza";
import GuvenlikZiyaretci from "../components/adminPanel/GuvenlikZiyaretci";
import PersonelYonetimi from "../components/adminPanel/PersonelYonetimi";
import TeslimatlarKargo from "../components/adminPanel/TeslimatlarKargo";
import BelgelerArsiv from "../components/adminPanel/BelgelerArsiv";
import MesajlasmaChat from "../components/adminPanel/MesajlasmaChat";
import Ayarlar from "../components/adminPanel/Ayarlar";
import logoNoBg from "../assets/logoNoBg.png";
import { useLanguage } from "../context/LanguageContext";
import { useEffect } from "react";
import supabase from "../helper/supabaseClient";

function AdminPanel() {
  const [activeComponent, setActiveComponent] = useState("Ana Panel");
  const { t } = useLanguage();
  const { changeLanguage } = useLanguage();

  const renderComponent = () => {
    switch (activeComponent) {
      case "Ana Panel": return <MainPanel />;
      case "Duyurular": return <Duyurular />;
      case "Daireler/Blok Yönetimi": return <DaireBlokYonetimi />;
      case "Aidat & Ödemeler": return <AidatOdemeler />;
      case "Gelir – Gider": return <GelirGider />;
      case "Talepler – Arıza Bildirimleri": return <TaleplerAriza />;
      case "Güvenlik & Ziyaretçi Girişi": return <GuvenlikZiyaretci />;
      case "Personel Yönetimi": return <PersonelYonetimi />;
      case "Teslimatlar & Kargo": return <TeslimatlarKargo />;
      case "Belgeler & Arşiv": return <BelgelerArsiv />;
      case "Mesajlaşma / Chat": return <MesajlasmaChat />;
      case "Ayarlar": return <Ayarlar />;
      default: return null;
    }
  };

  const buttons = [
    { label: t("menudashboard"), onClick: () => setActiveComponent("Ana Panel") },
    { label: t("menuannouncements"), onClick: () => setActiveComponent("Duyurular") },
    { label: t("menuapartmentBlock"), onClick: () => setActiveComponent("Daireler/Blok Yönetimi") },
    { label: t("menuduesPayments"), onClick: () => setActiveComponent("Aidat & Ödemeler") },
    { label: t("menuincomeExpense"), onClick: () => setActiveComponent("Gelir – Gider") },
    { label: t("menurequestsFaults"), onClick: () => setActiveComponent("Talepler – Arıza Bildirimleri") },
    { label: t("menusecurityVisitor"), onClick: () => setActiveComponent("Güvenlik & Ziyaretçi Girişi") },
    { label: t("menustaffManagement"), onClick: () => setActiveComponent("Personel Yönetimi") },
    { label: t("menudeliveriesCargo"), onClick: () => setActiveComponent("Teslimatlar & Kargo") },
    { label: t("menudocumentsArchive"), onClick: () => setActiveComponent("Belgeler & Arşiv") },
    { label: t("menumessagingChat"), onClick: () => setActiveComponent("Mesajlaşma / Chat") },
    { label: t("menusettings"), onClick: () => setActiveComponent("Ayarlar") },
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
        <span>{t("SiteYönetimPaneli")}</span>

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

export default AdminPanel;