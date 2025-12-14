import React from "react";
import { useLanguage } from "../../context/LanguageContext";

function GuvenlikZiyaretci() {
  const { t } = useLanguage();
  
  // Stil tanımları, çeviri gerektirmediği için olduğu gibi bırakıldı.
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    section: {
      marginBottom: "30px",
      padding: "15px",
      background: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "10px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px",
      textAlign: "left",
    },
    th: {
      padding: "10px 12px",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#f5f5f5",
      fontWeight: "600",
    },
    td: {
      padding: "10px 12px",
      borderBottom: "1px solid #ddd",
      fontSize: "15px",
    },
    btn: {
      padding: "8px 12px",
      background: "#4caf50",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      color: "#fff",
      fontSize: "14px",
      marginRight: "10px",
      marginTop: "5px",
    },
    input: {
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "100%",
      marginBottom: "10px",
      fontSize: "14px",
      boxSizing: "border-box",
    },
  };

  return (
    <div style={styles.container}>
      {/* Başlık */}
      <h2 style={styles.title}>{t("securitytitle")}</h2>

      {/* Ziyaretçi Ekleme */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("securityvisitortitle")}</h3>
        <input 
          style={styles.input} 
          type="text" 
          placeholder={t("securityvisitorname")} 
        />
        <input 
          style={styles.input} 
          type="text" 
          placeholder={t("securityvisitorblock")} 
        />
        <input 
          style={styles.input} 
          type="text" 
          placeholder={t("securityvisitorphone")} 
        />
        <button style={styles.btn}>{t("securityvisitorsave")}</button>
      </div>

      {/* Plaka Kaydı */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("securityplatetitle")}</h3>
        <input 
          style={styles.input} 
          type="text" 
          placeholder={t("securityplatenumber")} 
        />
        <input 
          style={styles.input} 
          type="text" 
          placeholder={t("securityplateowner")} 
        />
        <button style={styles.btn}>{t("securityplatesave")}</button>
      </div>

      {/* Güvenlik Logları */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("securitylogstitle")}</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("securitylogsdate")}</th>
              <th style={styles.th}>{t("securitylogsuser")}</th>
              <th style={styles.th}>{t("securitylogsevent")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>23/11/2025</td>
              <td style={styles.td}>{t("securitylogsuser_A")}</td> {/* Örnek kullanıcı A çevrildi */}
              <td style={styles.td}>{t("securitylogsdoorEntry")}</td>
            </tr>
            <tr>
              <td style={styles.td}>22/11/2025</td>
              <td style={styles.td}>{t("securitylogsuser_B")}</td> {/* Örnek kullanıcı B çevrildi */}
              <td style={styles.td}>{t("securitylogsvisitorEntry")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Kamera İzleme */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("securitycameratitle")}</h3>
        <p>{t("securitycameradesc")}</p>
      </div>
    </div>
  );
}

export default GuvenlikZiyaretci;
