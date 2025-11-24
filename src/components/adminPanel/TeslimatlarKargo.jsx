import React from "react";

function TeslimatlarKargo() {
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
      <h2 style={styles.title}>Teslimatlar & Kargo</h2>

      {/* Kargo Kayıt Defteri */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Kargo Kayıt Defteri</h3>
        <input style={styles.input} type="text" placeholder="Kargo Firması" />
        <input style={styles.input} type="text" placeholder="Takip No" />
        <input style={styles.input} type="text" placeholder="Daire / Blok" />
        <button style={styles.btn}>Kargo Kaydet</button>
      </div>

      {/* Teslim Edilen Paketler */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Teslim Edilen Paketler</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tarih</th>
              <th style={styles.th}>Kargo Firması</th>
              <th style={styles.th}>Takip No</th>
              <th style={styles.th}>Daire</th>
              <th style={styles.th}>Durum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>23/11/2025</td>
              <td style={styles.td}>Yurtiçi Kargo</td>
              <td style={styles.td}>YT123456789</td>
              <td style={styles.td}>A3-12</td>
              <td style={styles.td}>Teslim Edildi</td>
            </tr>
            <tr>
              <td style={styles.td}>22/11/2025</td>
              <td style={styles.td}>MNG Kargo</td>
              <td style={styles.td}>MN987654321</td>
              <td style={styles.td}>B2-08</td>
              <td style={styles.td}>Teslim Edildi</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bildirim Gönderme */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Bildirim Gönderme</h3>
        <input style={styles.input} type="text" placeholder="Daire / Blok" />
        <input style={styles.input} type="text" placeholder="Mesaj" />
        <button style={styles.btn}>Bildirim Gönder</button>
      </div>
    </div>
  );
}

export default TeslimatlarKargo;
