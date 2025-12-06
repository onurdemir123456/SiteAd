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
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    section: {
      marginBottom: "30px",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    },
    sectionTitle: {
      fontSize: "20px",
      marginBottom: "10px",
      fontWeight: "bold",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      border: "1px solid #ddd",
      padding: "8px",
      backgroundColor: "#f2f2f2",
      textAlign: "left",
    },
    td: {
      border: "1px solid #ddd",
      padding: "8px",
    },
    statusOpen: {
      color: "green",
      fontWeight: "bold",
    },
    statusClosed: {
      color: "red",
      fontWeight: "bold",
    },
    btn: {
      padding: "5px 10px",
      margin: "2px",
      cursor: "pointer",
      backgroundColor: "#2196F3",
      color: "white",
      border: "none",
      borderRadius: "4px",
    },
    btnGreen: {
      padding: "5px 10px",
      margin: "2px",
      cursor: "pointer",
      backgroundColor: "green",
      color: "white",
      border: "none",
      borderRadius: "4px",
    },

    // Popup
    popupOverlayStyle: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    popupBoxStyle: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      minWidth: "300px",
      maxWidth: "500px",
      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    },
    // Popup input/button stilleri
    popupInputStyle: {
      width: "100%",
      padding: "8px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },

    popupSaveBtnStyle: {
      padding: "8px 15px",
      marginRight: "10px",
      backgroundColor: "#2196F3",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },

    popupCloseBtnStyle: {
      padding: "8px 15px",
      backgroundColor: "red",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    }
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
  const updateArizaDetails = async (id) => {

    await supabase
      .from("arizalar")
      .update({ iscilik: iscilikInput, tamamlanma: yuzdeInput })
      .eq("id", id);

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
                  {t.durum === "Açık" ? (
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
        <div style={styles.popupOverlayStyle}>
          <div style={styles.popupBoxStyle}>
            <h3>{t("adminworkCompletion")}</h3>

            <label>{t("adminworkCost")} (₺)</label>
            <input
              type="number"
              value={iscilikInput}
              onChange={(e) => setIscilikInput(e.target.value)}
              style={styles.popupInputStyle}
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

            <button style={styles.popupSaveBtnStyle} onClick={async () => {
              updateArizaDetails(currentArizaId); setShowPopup(false); setIscilikInput("");
              setYuzdeInput(0);
            }}>
              {t("adminsave")}
            </button>
            <button style={styles.popupCloseBtnStyle} onClick={() => setShowPopup(false)}>
              {t("adminclose")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminSikayetler;
