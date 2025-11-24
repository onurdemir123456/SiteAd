import React from "react";

function TaleplerAriza() {
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
      <h2 style={styles.title}>Talepler – Arıza Bildirimleri</h2>

      {/* Arıza Bildirme */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Arıza Bildirme</h3>
        <input style={styles.input} type="text" placeholder="Daire / Blok" />
        <input style={styles.input} type="text" placeholder="Arıza Konusu" />
        <textarea
          style={{ ...styles.input, height: "80px" }}
          placeholder="Açıklama"
        ></textarea>
        <button style={styles.btn}>Arıza Bildir</button>
      </div>

      {/* Teknik Destek Kaydı */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Teknik Destek Kaydı</h3>
        <input style={styles.input} type="text" placeholder="Talep Konusu" />
        <textarea
          style={{ ...styles.input, height: "80px" }}
          placeholder="Detaylar"
        ></textarea>
        <button style={styles.btn}>Destek Kaydı Oluştur</button>
      </div>

      {/* Açık / Kapalı Talepler */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Açık / Kapalı Talepler</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tarih</th>
              <th style={styles.th}>Daire</th>
              <th style={styles.th}>Konu</th>
              <th style={styles.th}>Durum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>01/11/2025</td>
              <td style={styles.td}>A3-12</td>
              <td style={styles.td}>Su kaçağı</td>
              <td style={styles.td}>Açık</td>
            </tr>
            <tr>
              <td style={styles.td}>28/10/2025</td>
              <td style={styles.td}>B2-08</td>
              <td style={styles.td}>Elektrik arızası</td>
              <td style={styles.td}>Kapalı</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* İşçilik ve Tamamlanma Takibi */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>İşçilik ve Tamamlanma Takibi</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tarih</th>
              <th style={styles.th}>Daire</th>
              <th style={styles.th}>Konu</th>
              <th style={styles.th}>İşçilik</th>
              <th style={styles.th}>Tamamlanma</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>01/11/2025</td>
              <td style={styles.td}>A3-12</td>
              <td style={styles.td}>Su kaçağı</td>
              <td style={styles.td}>500₺</td>
              <td style={styles.td}>%50</td>
            </tr>
            <tr>
              <td style={styles.td}>28/10/2025</td>
              <td style={styles.td}>B2-08</td>
              <td style={styles.td}>Elektrik arızası</td>
              <td style={styles.td}>350₺</td>
              <td style={styles.td}>%100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaleplerAriza;