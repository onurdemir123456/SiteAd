import React from "react";

function GuvenlikZiyaretci() {
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
      <h2 style={styles.title}>Güvenlik & Ziyaretçi Girişi</h2>

      {/* Ziyaretçi Ekleme */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Ziyaretçi Ekleme</h3>
        <input style={styles.input} type="text" placeholder="Ziyaretçi Adı" />
        <input style={styles.input} type="text" placeholder="Daire / Blok" />
        <input style={styles.input} type="text" placeholder="Telefon" />
        <button style={styles.btn}>Ziyaretçi Kaydet</button>
      </div>

      {/* Plaka Kaydı */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Plaka Kaydı</h3>
        <input style={styles.input} type="text" placeholder="Plaka" />
        <input style={styles.input} type="text" placeholder="Araç Sahibi" />
        <button style={styles.btn}>Plaka Kaydet</button>
      </div>

      {/* Güvenlik Logları */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Güvenlik Logları</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tarih</th>
              <th style={styles.th}>Kullanıcı</th>
              <th style={styles.th}>Olay</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>23/11/2025</td>
              <td style={styles.td}>Güvenlik Görevlisi A</td>
              <td style={styles.td}>Kapı Girişi</td>
            </tr>
            <tr>
              <td style={styles.td}>22/11/2025</td>
              <td style={styles.td}>Güvenlik Görevlisi B</td>
              <td style={styles.td}>Ziyaretçi Girişi</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Kamera İzleme (Opsiyonel) */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Kamera İzleme</h3>
        <p>Canlı kamera bağlantıları veya iframe ekleyebilirsiniz (opsiyonel)</p>
      </div>
    </div>
  );
}

export default GuvenlikZiyaretci;