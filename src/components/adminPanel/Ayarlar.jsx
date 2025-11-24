import React, { useState } from "react";

function Ayarlar() {
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
    select: {
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "100%",
      marginBottom: "10px",
      fontSize: "14px",
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

  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("tr");

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ayarlar</h2>

      {/* Site Ayarları */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Site Ayarları</h3>
        <input style={styles.input} type="text" placeholder="Site Adı" />
        <input style={styles.input} type="text" placeholder="Site Adresi" />
        <button style={styles.btn}>Kaydet</button>
      </div>

      {/* Kullanıcı Rolleri */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Kullanıcı Rolleri</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Kullanıcı</th>
              <th style={styles.th}>Rol</th>
              <th style={styles.th}>Güncelle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Ahmet Y.</td>
              <td style={styles.td}>
                <select style={styles.select} defaultValue="Yönetici">
                  <option>Yönetici</option>
                  <option>Sakin</option>
                  <option>Güvenlik</option>
                </select>
              </td>
              <td style={styles.td}>
                <button style={styles.btn}>Güncelle</button>
              </td>
            </tr>
            <tr>
              <td style={styles.td}>Ayşe K.</td>
              <td style={styles.td}>
                <select style={styles.select} defaultValue="Sakin">
                  <option>Yönetici</option>
                  <option>Sakin</option>
                  <option>Güvenlik</option>
                </select>
              </td>
              <td style={styles.td}>
                <button style={styles.btn}>Güncelle</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bildirim Ayarları */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Bildirim Ayarları</h3>
        <label>
          <input type="checkbox" /> E-posta Bildirimleri
        </label>
        <br />
        <label>
          <input type="checkbox" /> SMS Bildirimleri
        </label>
        <br />
        <label>
          <input type="checkbox" /> Push Bildirimleri
        </label>
        <br />
        <button style={styles.btn}>Kaydet</button>
      </div>

      {/* Tema / Dil Değişimi */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Tema / Dil Değişimi</h3>
        <label>Tema:</label>
        <select
          style={styles.select}
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Açık</option>
          <option value="dark">Koyu</option>
        </select>
        <label>Dil:</label>
        <select
          style={styles.select}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="tr">Türkçe</option>
          <option value="en">İngilizce</option>
        </select>
        <button style={styles.btn}>Kaydet</button>
      </div>
    </div>
  );
}

export default Ayarlar;
