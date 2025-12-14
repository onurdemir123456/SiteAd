import React from "react";
import { useLanguage } from "../../context/LanguageContext";

function BelgelerArsiv() {
  const { t } = useLanguage();

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
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{t("documentsArchive")}</h2>

      {/* Yönetim Kurulu Kararları */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("boardDecisions")}</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("date")}</th>
              <th style={styles.th}>{t("file")}</th>
              <th style={styles.th}>{t("download")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>01/10/2025</td>
              <td style={styles.td}>{t("meetingDecision")} 01</td>
              <td style={styles.td}>
                <button style={styles.btn}>{t("downloadPdf")}</button>
              </td>
            </tr>
            <tr>
              <td style={styles.td}>15/09/2025</td>
              <td style={styles.td}>{t("meetingDecision")} 02</td>
              <td style={styles.td}>
                <button style={styles.btn}>{t("downloadPdf")}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sözleşmeler */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("contracts")}</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("name")}</th>
              <th style={styles.th}>{t("date")}</th>
              <th style={styles.th}>{t("download")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>{t("duesContract")} 2025</td>
              <td style={styles.td}>01/01/2025</td>
              <td style={styles.td}>
                <button style={styles.btn}>{t("downloadPdf")}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bütçe Dosyaları */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("budgetFiles")}</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("year")}</th>
              <th style={styles.th}>{t("file")}</th>
              <th style={styles.th}>{t("download")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>2025</td>
              <td style={styles.td}>{t("budget")} 2025</td>
              <td style={styles.td}>
                <button style={styles.btn}>{t("downloadPdf")}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PDF Arşivi */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("pdfArchive")}</h3>
        <p>{t("pdfArchiveDescription")}</p>
        <button style={styles.btn}>{t("downloadAll")}</button>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default BelgelerArsiv;

=======
export default BelgelerArsiv;
>>>>>>> restore-old
