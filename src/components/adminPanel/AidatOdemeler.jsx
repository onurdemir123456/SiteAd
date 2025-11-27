import React from "react";

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

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Aidat & Ödemeler</h2>

      {/* Aidat Borçları */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Aidat Borçları</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Daire</th>
              <th style={styles.th}>Borç Miktarı</th>
              <th style={styles.th}>Son Ödeme Tarihi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>A3-12</td>
              <td style={styles.td}>1.200₺</td>
              <td style={styles.td}>01/11/2025</td>
            </tr>
            <tr>
              <td style={styles.td}>B2-08</td>
              <td style={styles.td}>1.000₺</td>
              <td style={styles.td}>15/10/2025</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Ödeme Geçmişi */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Ödeme Geçmişi</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Daire</th>
              <th style={styles.th}>Tarih</th>
              <th style={styles.th}>Tutar</th>
              <th style={styles.th}>Ödeme Tipi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>A3-12</td>
              <td style={styles.td}>01/10/2025</td>
              <td style={styles.td}>1.200₺</td>
              <td style={styles.td}>Online (iyzico)</td>
            </tr>
            <tr>
              <td style={styles.td}>B2-08</td>
              <td style={styles.td}>01/09/2025</td>
              <td style={styles.td}>1.000₺</td>
              <td style={styles.td}>Online (Stripe)</td>
            </tr>
          </tbody>
        </table>
      </div>

      

      {/* Ek Borç Ekleme */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Ek Borç Ekleme</h3>
        <button style={styles.btn}>Yeni Borç Ekle</button>
      </div>

      {/* Tahsilat Raporu */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Tahsilat Raporu</h3>
        <button style={styles.btn}>Raporu Görüntüle</button>
      </div>
    </div>
  );
}

export default AidatOdemeler;