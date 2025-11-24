import React from "react";

function PersonelYonetimi() {
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
    input: {
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "100%",
      marginBottom: "10px",
      fontSize: "14px",
      boxSizing: "border-box",
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
      <h2 style={styles.title}>Personel Yönetimi</h2>

      {/* Görev Dağılımı */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Görev Dağılımı</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Personel</th>
              <th style={styles.th}>Görev</th>
              <th style={styles.th}>Birim</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Ali Y.</td>
              <td style={styles.td}>Güvenlik</td>
              <td style={styles.td}>Site Girişi</td>
            </tr>
            <tr>
              <td style={styles.td}>Ayşe K.</td>
              <td style={styles.td}>Temizlik</td>
              <td style={styles.td}>Ortak Alanlar</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mesai Saatleri */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Mesai Saatleri</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Personel</th>
              <th style={styles.th}>Giriş</th>
              <th style={styles.th}>Çıkış</th>
              <th style={styles.th}>Toplam Saat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Ali Y.</td>
              <td style={styles.td}>08:00</td>
              <td style={styles.td}>16:00</td>
              <td style={styles.td}>8 Saat</td>
            </tr>
            <tr>
              <td style={styles.td}>Ayşe K.</td>
              <td style={styles.td}>09:00</td>
              <td style={styles.td}>17:00</td>
              <td style={styles.td}>8 Saat</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* İş Takibi ve Performans */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>İş Takibi ve Performans</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Personel</th>
              <th style={styles.th}>Görev Tamamlanma</th>
              <th style={styles.th}>Performans (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Ali Y.</td>
              <td style={styles.td}>%75</td>
              <td style={styles.td}>80%</td>
            </tr>
            <tr>
              <td style={styles.td}>Ayşe K.</td>
              <td style={styles.td}>%100</td>
              <td style={styles.td}>90%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PersonelYonetimi;
