import React from "react";

function BelgelerArsiv() {
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
      <h2 style={styles.title}>Belgeler & Arşiv</h2>

      {/* Yönetim Kurulu Kararları */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Yönetim Kurulu Kararları</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tarih</th>
              <th style={styles.th}>Dosya</th>
              <th style={styles.th}>İndir</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>01/10/2025</td>
              <td style={styles.td}>Toplantı Kararı 01</td>
              <td style={styles.td}>
                <button style={styles.btn}>PDF İndir</button>
              </td>
            </tr>
            <tr>
              <td style={styles.td}>15/09/2025</td>
              <td style={styles.td}>Toplantı Kararı 02</td>
              <td style={styles.td}>
                <button style={styles.btn}>PDF İndir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sözleşmeler */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Sözleşmeler</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Ad</th>
              <th style={styles.th}>Tarih</th>
              <th style={styles.th}>İndir</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Aidat Sözleşmesi 2025</td>
              <td style={styles.td}>01/01/2025</td>
              <td style={styles.td}>
                <button style={styles.btn}>PDF İndir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bütçe Dosyaları */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Bütçe Dosyaları</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Yıl</th>
              <th style={styles.th}>Dosya</th>
              <th style={styles.th}>İndir</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>2025</td>
              <td style={styles.td}>Bütçe 2025</td>
              <td style={styles.td}>
                <button style={styles.btn}>PDF İndir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PDF Arşivi */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>PDF Arşivi</h3>
        <p>Tüm PDF dosyalarını arşivleyebilir ve indirebilirsiniz.</p>
        <button style={styles.btn}>Tümünü İndir</button>
      </div>
    </div>
  );
}

export default BelgelerArsiv;
