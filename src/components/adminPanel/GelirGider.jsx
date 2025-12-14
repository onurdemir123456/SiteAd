import React from "react";
import { useLanguage } from "../../context/LanguageContext";
function GelirGider() {
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
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{t("title")}</h2>

      {/* Aylık Bütçe */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("monthly_budget")}</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("month")}</th>
              <th style={styles.th}>{t("income")}</th>
              <th style={styles.th}>{t("expense")}</th>
              <th style={styles.th}>{t("balance")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>{t("january")}</td>
              <td style={styles.td}>50.000₺</td>
              <td style={styles.td}>35.000₺</td>
              <td style={styles.td}>15.000₺</td>
            </tr>
            <tr>
              <td style={styles.td}>{t("february")}</td>
              <td style={styles.td}>45.000₺</td>
              <td style={styles.td}>30.000₺</td>
              <td style={styles.td}>15.000₺</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Makbuz & Fatura Girişleri */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("receipts_invoices")}</h3>
        <button style={styles.btn}>{t("add_receipt")}</button>
        <button style={styles.btn}>{t("add_invoice")}</button>
      </div>

      {/* Banka Hareketleri */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("bank_transactions")}</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("date")}</th>
              <th style={styles.th}>{t("description")}</th>
              <th style={styles.th}>{t("amount")}</th>
              <th style={styles.th}>{t("type")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>01/11/2025</td>
              <td style={styles.td}>{t("dues_collection")}</td>
              <td style={styles.td}>5.000₺</td>
              <td style={styles.td}>{t("income")}</td>
            </tr>
            <tr>
              <td style={styles.td}>05/11/2025</td>
              <td style={styles.td}>{t("electricity_bill")}</td>
              <td style={styles.td}>1.200₺</td>
              <td style={styles.td}>{t("expense")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Raporlama */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("reporting")}</h3>
        <button style={styles.btn}>{t("export_pdf")}</button>
        <button style={styles.btn}>{t("export_excel")}</button>
      </div>
    </div>
  );
}

export default GelirGider;
