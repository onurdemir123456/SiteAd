import React, { useEffect, useState } from "react";
import supabase from "../../helper/supabaseClient";
import { useLanguage } from "../../context/LanguageContext";
function AdminSikayetler() {
  const { t } = useLanguage();
  const [sikayetler, setSikayetler] = useState([]);
  const [arizalar, setArizalar] = useState([]);
  const [talepler, setTalepler] = useState([]);


  const [showPopup, setShowPopup] = useState(false);
  const [currentArizaId, setCurrentArizaId] = useState(null);
  const [iscilikInput, setIscilikInput] = useState("");
  const [yuzdeInput, setYuzdeInput] = useState(0);


  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "25px",
    },
    section: {
      marginBottom: "35px",
      padding: "15px",
      background: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "15px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      padding: "10px 12px",
      borderBottom: "1px solid #ddd",
      background: "#f0f0f0",
      textAlign: "left",
      fontWeight: "600",
    },
    td: {
      padding: "10px 12px",
      borderBottom: "1px solid #ddd",
    },
    btn: {
      padding: "6px 10px",
      background: "#2196F3",
      border: "none",
      color: "#fff",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      marginRight: "8px",
    },
    btnGreen: {
      padding: "6px 10px",
      background: "#4CAF50",
      border: "none",
      color: "#fff",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    },
    statusOpen: { color: "red", fontWeight: "bold" },
    statusClosed: { color: "green", fontWeight: "bold" },
  };


  const popupOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const popupBoxStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "300px",
};

const popupInputStyle = {
  width: "100%",
  marginBottom: "10px",
  padding: "6px",
};

const popupSaveBtnStyle = {
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  padding: "8px",
  marginRight: "10px",
  cursor: "pointer",
};

const popupCloseBtnStyle = {
  background: "#f44336",
  color: "#fff",
  border: "none",
  padding: "8px",
  cursor: "pointer",
};


  // ----------------------------
  // Supabase Data Fetch
  // ----------------------------

  const fetchSikayetler = async () => {
    const { data } = await supabase.from("sikayetler").select("*").order("tarih", { ascending: false });
    setSikayetler(data || []);
  };

  const fetchArizalar = async () => {
    const { data } = await supabase.from("arizalar").select("*").order("tarih", { ascending: false });
    setArizalar(data || []);
  };

  const fetchTalepler = async () => {
    const { data } = await supabase.from("talepler").select("*").order("tarih", { ascending: false });
    setTalepler(data || []);
  };

  useEffect(() => {
    fetchSikayetler();
    fetchArizalar();
    fetchTalepler();
  }, []);

  // ----------------------------
  // Durum Güncellemeler
  // ----------------------------

  const closeSikayet = async (id) => {
    await supabase.from("sikayetler").update({ durum: "Kapalı" }).eq("id", id);
    fetchSikayetler();
  };

  const closeAriza = async (id) => {
    await supabase.from("arizalar").update({ durum: "Kapalı" }).eq("id", id);
    fetchArizalar();
  };

  const closeTalep = async (id) => {
    await supabase.from("talepler").update({ durum: "Kapalı" }).eq("id", id);
    fetchTalepler();
  };


  const openArizaPopup = (id) => {
    setCurrentArizaId(id);
    setShowPopup(true);
  };

  const handleSavePopup = async () => {
  if (!iscilikInput) {
    alert("İşçilik tutarı giriniz");
    return;
  }

  await supabase
    .from("arizalar")
    .update({
      iscilik: iscilikInput,
      tamamlanma: `%${yuzdeInput}`,
    })
    .eq("id", currentArizaId);

  setShowPopup(false);
  setIscilikInput("");
  setYuzdeInput(0);
  setCurrentArizaId(null);

  fetchArizalar();
};



  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {t("admintitle")} {/* Admin Paneli – Talepler & Arıza & Şikayet Yönetimi */}
      </h2>

      {/* ------------------------------------------------------------------ */}
      {/* ŞİKAYETLER */}
      {/* ------------------------------------------------------------------ */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("admincomplaints")}</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("admindate")}</th>
              <th style={styles.th}>{t("adminapartment")}</th>
              <th style={styles.th}>{t("adminsubject")}</th>
              <th style={styles.th}>{t("admindescription")}</th>
              <th style={styles.th}>{t("adminstatus")}</th>
              <th style={styles.th}>{t("adminaction")}</th>
            </tr>
          </thead>
          <tbody>
            {sikayetler.map((s) => (
              <tr key={s.id}>
                <td style={styles.td}>{new Date(s.tarih).toLocaleDateString()}</td>
                <td style={styles.td}>{s.daire}</td>
                <td style={styles.td}>{s.konu}</td>
                <td style={styles.td}>{s.aciklama}</td>
                <td style={styles.td}>
                  {s.durum === "Açık" ? (
                    <span style={styles.statusOpen}>{t("adminopen")}</span>
                  ) : (
                    <span style={styles.statusClosed}>{t("adminclosed")}</span>
                  )}
                </td>
                <td style={styles.td}>
                  {s.durum === "Açık" && (
                    <button style={styles.btn} onClick={() => closeSikayet(s.id)}>
                      {t("adminclose")}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ARIZA BİLDİRİMLERİ */}
      {/* ------------------------------------------------------------------ */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("adminfaultReports")}</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("admindate")}</th>
              <th style={styles.th}>{t("adminapartment")}</th>
              <th style={styles.th}>{t("adminsubject")}</th>
              <th style={styles.th}>{t("admindescription")}</th>
              <th style={styles.th}>{t("adminworkCost")}</th>
              <th style={styles.th}>{t("admincompletion")}</th>
              <th style={styles.th}>{t("adminstatus")}</th>
              <th style={styles.th}>{t("adminaction")}</th>
            </tr>
          </thead>
          <tbody>
            {arizalar.map((a) => (
              <tr key={a.id}>
                <td style={styles.td}>{new Date(a.tarih).toLocaleDateString()}</td>
                <td style={styles.td}>{a.daire}</td>
                <td style={styles.td}>{a.konu}</td>
                <td style={styles.td}>{a.aciklama}</td>
                <td style={styles.td}>{a.iscilik ? `${a.iscilik} ₺` : "-"}</td>
                <td style={styles.td}>{a.tamamlanma || "-"}</td>
                <td style={styles.td}>
                  {a.durum === "Açık" ? (
                    <span style={styles.statusOpen}>{t("adminopen")}</span>
                  ) : (
                    <span style={styles.statusClosed}>{t("adminclosed")}</span>
                  )}
                </td>
                <td style={styles.td}>
                  {a.durum === "Açık" && (
                    <>
                      <button style={styles.btn} onClick={() => openArizaPopup(a.id)}>
                        {t("adminworkCompletion")}
                      </button>
                      <button style={styles.btnGreen} onClick={() => closeAriza(a.id)}>
                        {t("adminclose")}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TEKNİK DESTEK TALEPLERİ */}
      {/* ------------------------------------------------------------------ */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("admintechRequests")}</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("admindate")}</th>
              <th style={styles.th}>{t("adminsubject")}</th>
              <th style={styles.th}>{t("admindetails")}</th>
              <th style={styles.th}>{t("adminstatus")}</th>
              <th style={styles.th}>{t("adminaction")}</th>
            </tr>
          </thead>
          <tbody>
            {talepler.map((e) => (
              <tr key={e.id}>
                <td style={styles.td}>{new Date(e.tarih).toLocaleDateString()}</td>
                <td style={styles.td}>{e.konu}</td>
                <td style={styles.td}>{e.detay}</td>
                <td style={styles.td}>
                  {e.durum === "Açık" ? (
                    <span style={styles.statusOpen}>{t("adminopen")}</span>
                  ) : (
                    <span style={styles.statusClosed}>{t("adminclosed")}</span>
                  )}
                </td>
                <td style={styles.td}>
                  {e.durum === "Açık" && (
                    <button style={styles.btnGreen} onClick={() => closeTalep(e.id)}>
                      {t("adminclose")}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* İşçilik / Tamamlanma Popup */}
      {showPopup && (
        <div style={popupOverlayStyle}>
          <div style={popupBoxStyle}>
            <h3>{t("adminworkCompletion")}</h3>

            <label>{t("adminworkCost")} (₺)</label>
            <input
              type="number"
              value={iscilikInput}
              onChange={(e) => setIscilikInput(e.target.value)}
              style={popupInputStyle}
            />

            <label>
              {t("admincompletion")}: % {yuzdeInput}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={yuzdeInput}
              onChange={(e) => setYuzdeInput(e.target.value)}
              style={{ width: "100%" }}
            />

            <button style={popupSaveBtnStyle} onClick={handleSavePopup}>
              {t("adminsave")}
            </button>
            <button style={popupCloseBtnStyle} onClick={() => setShowPopup(false)}>
              {t("adminclose")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminSikayetler;
