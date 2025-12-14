import React from "react";
import { useLanguage } from "../../context/LanguageContext";
<<<<<<< HEAD
function DaireBlokYonetimi() {
  const { t } = useLanguage();
=======

function DaireBlokYonetimi() {
  const { t } = useLanguage();

>>>>>>> restore-old
  const styles = {
    container: { padding: "20px", fontFamily: "Arial, sans-serif" },
    title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
    section: {
      marginBottom: "30px",
      padding: "15px",
      background: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    sectionTitle: { fontSize: "18px", fontWeight: "600", marginBottom: "10px" },
    infoBox: {
      background: "#f2f2f2",
      padding: "12px",
      borderRadius: "6px",
      lineHeight: "1.6",
      fontSize: "15px",
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
  };

return (
    <div style={styles.container}>
      <h2 style={styles.title}>{t("apartmenttitle")}</h2>

      {/* Apartment Information */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("apartmentdetails")}</h3>
        <div style={styles.infoBox}>
          <p><strong>{t("apartmentblock")}:</strong> A</p>
          <p><strong>{t("apartmentfloor")}:</strong> 3</p>
          <p><strong>{t("apartmentnumber")}:</strong> 12</p>
<<<<<<< HEAD
          <p><strong>{t("apartmentstatus")}:</strong> Sahip</p>
=======
          <p><strong>{t("apartmentstatus")}:</strong> {t("owner")}</p>
>>>>>>> restore-old
        </div>
      </div>

      {/* Resident Information */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("apartmentowner")}</h3>
        <div style={styles.infoBox}>
          <p><strong>{t("apartmentname")}:</strong> Onur K.</p>
          <p><strong>{t("apartmentphone")}:</strong> 555 123 45 67</p>
          <p><strong>{t("apartmentemail")}:</strong> onur@example.com</p>
        </div>
      </div>

      {/* Vehicle Information */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("apartmentvehicle")}</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("apartmentplate")}</th>
              <th style={styles.th}>{t("apartmentbrand")}</th>
              <th style={styles.th}>{t("apartmentmodel")}</th>
              <th style={styles.th}>{t("apartmentcolor")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>34 ABC 123</td>
              <td style={styles.td}>BMW</td>
              <td style={styles.td}>320i</td>
              <td style={styles.td}>{t("siyah")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DaireBlokYonetimi;
