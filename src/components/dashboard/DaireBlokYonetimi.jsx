import React from "react";

function DaireBlokYonetimi() {
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
      <h2 style={styles.title}>Daireniz</h2>

      {/* Kişisel Daire Bilgileri */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Daire Bilgileri</h3>
        <div style={styles.infoBox}>
          <p><strong>Blok:</strong> A</p>
          <p><strong>Kat:</strong> 3</p>
          <p><strong>Daire No:</strong> 12</p>
          <p><strong>Durum:</strong> Sahip</p>
        </div>
      </div>

      {/* Kişi Bilgileri */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Kişi Bilgileri</h3>
        <div style={styles.infoBox}>
          <p><strong>Ad Soyad:</strong> Onur K.</p>
          <p><strong>Telefon:</strong> 555 123 45 67</p>
          <p><strong>Email:</strong> onur@example.com</p>
        </div>
      </div>

      {/* Araç Bilgileri */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Araç Bilgileri</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Plaka</th>
              <th style={styles.th}>Marka</th>
              <th style={styles.th}>Model</th>
              <th style={styles.th}>Renk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>34 ABC 123</td>
              <td style={styles.td}>BMW</td>
              <td style={styles.td}>320i</td>
              <td style={styles.td}>Siyah</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DaireBlokYonetimi;
