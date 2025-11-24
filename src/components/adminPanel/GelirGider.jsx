import React from "react";

function GelirGider() {
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
      <h2 style={styles.title}>Gelir – Gider</h2>

      {/* Aylık Bütçe */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Aylık Bütçe</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Ay</th>
              <th style={styles.th}>Gelir</th>
              <th style={styles.th}>Gider</th>
              <th style={styles.th}>Bakiye</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Ocak</td>
              <td style={styles.td}>50.000₺</td>
              <td style={styles.td}>35.000₺</td>
              <td style={styles.td}>15.000₺</td>
            </tr>
            <tr>
              <td style={styles.td}>Şubat</td>
              <td style={styles.td}>45.000₺</td>
              <td style={styles.td}>30.000₺</td>
              <td style={styles.td}>15.000₺</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Makbuz & Fatura Girişleri */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Makbuz & Fatura Girişleri</h3>
        <button style={styles.btn}>Yeni Makbuz Ekle</button>
        <button style={styles.btn}>Yeni Fatura Ekle</button>
      </div>

      {/* Banka Hareketleri */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Banka Hareketleri</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tarih</th>
              <th style={styles.th}>Açıklama</th>
              <th style={styles.th}>Tutar</th>
              <th style={styles.th}>Tip</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>01/11/2025</td>
              <td style={styles.td}>Aidat Tahsilatı</td>
              <td style={styles.td}>5.000₺</td>
              <td style={styles.td}>Gelir</td>
            </tr>
            <tr>
              <td style={styles.td}>05/11/2025</td>
              <td style={styles.td}>Elektrik Faturası</td>
              <td style={styles.td}>1.200₺</td>
              <td style={styles.td}>Gider</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Raporlama */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Raporlama</h3>
        <button style={styles.btn}>PDF Çıktı Al</button>
        <button style={styles.btn}>Excel Çıktı Al</button>
      </div>
    </div>
  );
}

export default GelirGider;