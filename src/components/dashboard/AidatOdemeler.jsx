// UserAidat.jsx
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
function AidatOdemeler() {
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
    },
  };
  const { t } = useLanguage();
   return (
    <div style={styles.container}>
      <h2 style={styles.title}>{t("paymenttitle")}</h2>

      {/* Kullanıcının Borç Durumu */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("paymentdebts")}</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("paymentapartment")}</th>
              <th style={styles.th}>{t("paymentamount")}</th>
              <th style={styles.th}>{t("paymentdueDate")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>A3-12</td>
              <td style={styles.td}>1.200₺</td>
              <td style={styles.td}>01/11/2025</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Kullanıcının Ödeme Geçmişi */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("paymenthistory")}</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("paymentdate")}</th>
              <th style={styles.th}>{t("paymentamount")}</th>
              <th style={styles.th}>{t("paymenttype")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>01/10/2025</td>
              <td style={styles.td}>1.200₺</td>
              <td style={styles.td}>Online (iyzico)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Online Ödeme */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("paymentonlinePayment")}</h3>
        <button style={styles.btn}>{t("paymentpayIyzico")}</button>
        <button style={styles.btn}>{t("paymentpayStripe")}</button>
      </div>
    </div>
  );
}

export default AidatOdemeler;
