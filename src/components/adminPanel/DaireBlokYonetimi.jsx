import React from "react";
import { useEffect, useState } from "react";
import supabase from "../../helper/supabaseClient";









function DaireBlokYonetimi() {


  const [apartments, setApartments] = useState([]);
  const [blok, setBlok] = useState("");
  const [kat, setKat] = useState("");
  const [daireNo, setDaireNo] = useState("");
  const [durum, setDurum] = useState("Boş");
  const [kisi, setKisi] = useState("");

  useEffect(() => {
  fetchApartments();
}, []);

async function fetchApartments() {
  const { data, error } = await supabase.from("apartments").select("*");
  if (!error) setApartments(data);
}





async function addApartment() {
  if (!blok || !kat || !daireNo) {
    alert("Blok, Kat ve Daire No zorunludur.");
    return;
  }

  // --- Kişi Zorunluluk Kontrolü ---
  if ((durum === "Sahip" || durum === "Kiracı") && !kisi) {
    alert("Sahip veya Kiracı seçildiğinde kişi adı zorunludur!");
    return;
  }

  const { data, error } = await supabase.from("apartments").insert([
    {
      blok: blok,
      kat: Number(kat),
      daire_no: Number(daireNo),
      durum: durum,
      kisi: kisi,
    },
  ]);

  if (error) {
    alert("Kayıt eklenemedi: " + error.message);
  } else {
    alert("Daire başarıyla eklendi!");
    fetchApartments(); // Listeyi yenile
  }

  setBlok("");
  setKat("");
  setDaireNo("");
  setDurum("Boş");
  setKisi("");
}



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
    filterRow: {
      display: "flex",
      gap: "10px",
      marginTop: "10px",
    },
    select: {
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      minWidth: "120px",
    },
    btn: {
      padding: "8px 12px",
      background: "#e0e0e0",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    },
    infoBox: {
      background: "#f2f2f2",
      padding: "12px",
      borderRadius: "6px",
      lineHeight: "1.6",
      fontSize: "15px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Daireler / Blok Yönetimi</h2>

      {/* Daire Listesi */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Daire Listesi</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Blok</th>
              <th style={styles.th}>Kat</th>
              <th style={styles.th}>Daire No</th>
              <th style={styles.th}>Durum</th>
              <th style={styles.th}>Kişi</th>
            </tr>
          </thead>
          <tbody>
            {apartments.map((d) => (
              <tr key={d.id}>
                <td style={styles.td}>{d.blok}</td>
                <td style={styles.td}>{d.kat}</td>
                <td style={styles.td}>{d.daire_no}</td>
                <td style={styles.td}>{d.durum}</td>
                <td style={styles.td}>{d.kisi || "-"}</td>
              </tr>
  ))}
          </tbody>
        </table>
      </div>


      {/* Daire Ekleme Formu */}
<div style={styles.section}>
  <h3 style={styles.sectionTitle}>Yeni Daire Ekle</h3>

  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    
    <input
      style={styles.select}
      placeholder="Blok (A, B, C...)"
      value={blok}
      onChange={(e) => setBlok(e.target.value)}
    />

    <input
      style={styles.select}
      placeholder="Kat"
      value={kat}
      onChange={(e) => setKat(e.target.value)}
      type="number"
    />

    <input
      style={styles.select}
      placeholder="Daire No"
      value={daireNo}
      onChange={(e) => setDaireNo(e.target.value)}
      type="number"
    />

    <select
      style={styles.select}
      value={durum}
      onChange={(e) => setDurum(e.target.value)}
    >
      <option value="Sahip">Sahip</option>
      <option value="Kiracı">Kiracı</option>
      <option value="Boş">Boş</option>
    </select>

    <input
      style={styles.select}
      placeholder={
      durum === "Boş" ? "Kişi" : "Kişi (Zorunlu)"
      }
      value={kisi}
      onChange={(e) => setKisi(e.target.value)}
      disabled={durum === "Boş"}
    />


    <button style={styles.btn} onClick={addApartment}>
      Daire Ekle
    </button>
  </div>
</div>







      {/* Kat / Blok Bazlı Görüntüleme */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Kat / Blok Bazlı Görüntüleme</h3>
        <div style={styles.filterRow}>
          <select style={styles.select}>
            <option>Blok A</option>
            <option>Blok B</option>
            <option>Blok C</option>
          </select>

          <select style={styles.select}>
            <option>Kat 1</option>
            <option>Kat 2</option>
            <option>Kat 3</option>
          </select>
        </div>
      </div>

      {/* Sahip / Kiracı */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Daire Sahibi / Kiracı Ayrımı</h3>
        <div style={styles.filterRow}>
          <button style={styles.btn}>Sahip</button>
          <button style={styles.btn}>Kiracı</button>
          <button style={styles.btn}>Hepsi</button>
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
