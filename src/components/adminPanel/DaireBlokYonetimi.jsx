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
  const [filterBlok, setFilterBlok] = useState("");
  const [filterKat, setFilterKat] = useState("");
  const uniqueBloklar = [...new Set(apartments.map(a => a.blok))].sort();
  const uniqueKatlar = [...new Set(apartments.map(a => a.kat))].sort((a, b) => a - b);
  const [filterDurum, setFilterDurum] = useState("");
  const [residents, setResidents] = useState([]);
  const [selectedKisi, setSelectedKisi] = useState("");
  const [rTelefon, setRTelefon] = useState("");
  const [rEmail, setREmail] = useState("");
  // Araç formunda seçilen kişi (dropdown)
  const [vKisi, setVKisi] = useState("");      

// Plaka input alanı için state
  const [vPlaka, setVPlaka] = useState("");    

// Marka input alanı için state
  const [vMarka, setVMarka] = useState("");    

// Model input alanı için state
  const [vModel, setVModel] = useState("");    

// Renk input alanı için state
  const [vRenk, setVRenk] = useState("");      

// Supabase'ten çekilecek araçlar listesi
  const [vehicles, setVehicles] = useState([]); 

  // ---------------------------
// Daire silme alanı için state'ler
// ---------------------------
  const [delBlok, setDelBlok] = useState("");
  const [delKat, setDelKat] = useState("");
  const [delDaireNo, setDelDaireNo] = useState("");

  // Kişi silme alanı için stateler
  const [delKisi, setDelKisi] = useState("");
  const [delTelefon, setDelTelefon] = useState("");
  // Araç silme alanı için stateler
  const [delVKisi, setDelVKisi] = useState("");
  const [delVPlaka, setDelVPlaka] = useState("");





  


  const filteredApartments = apartments.filter((a) => {
  return (
    (filterBlok === "" || a.blok === filterBlok) &&
    (filterKat === "" || a.kat === Number(filterKat)) &&
    (filterDurum === "" || a.durum === filterDurum)
  );
});

const isActive = (d) => filterDurum === d;

// dairelerdeki kişileri unique olarak al (Daire işlemleri için)
const uniqueApartmentKisiler = [...new Set(
  apartments
    .map(a => a.kisi)
    .filter(k => k && k.trim() !== "")
)];

// residents tablosundaki kişileri unique olarak al (Araç ve diğer kişi bazlı işlemler için)
const uniqueResidentKisiler = [...new Set(
  residents
    .map(r => r.kisi)
    .filter(k => k && k.trim() !== "")
)];


// -------------------------------------------------------------------
// Yeni kişi ekleme dropdown'u için kullanılacak liste
// Mantık:
//  - Apartmanlarda görünen kişileri al
//  - Ama eğer bu kişi zaten residents tablosunda kayıtlıysa
//    dropdown’dan çıkar → tekrar eklenmesini engelle
// -------------------------------------------------------------------
const availablePeopleForNewResident = uniqueApartmentKisiler.filter(
  (name) => !uniqueResidentKisiler.includes(name) 
);


// ---------------------------------------------------------
// vehicles tablosundaki kişileri (araç sahipleri) benzersiz al
// Amaç: Aynı kişi birden fazla kez araç sahibi olarak eklenmesin
// ---------------------------------------------------------
const uniqueVehicleKisiler = [...new Set(
  vehicles
    .map(v => v.kisi)                 // her aracın sahibini al
    .filter(k => k && k.trim() !== "") // boş olmayanları filtrele
)];


// -------------------------------------------------------------------
// Araç ekleme dropdown'u için kullanılacak liste
// Mantık:
//   - residents tablosundaki kişileri al (gerçek kişi listesi)
//   - Eğer kişi vehicles tablosunda varsa → dropdown’dan çıkar
// Böylece bir kişi ikinci kez araç sahibi olarak eklenemez
// -------------------------------------------------------------------
const availablePeopleForNewVehicle = uniqueResidentKisiler.filter(
  (name) => !uniqueVehicleKisiler.includes(name)
);










  useEffect(() => {
  fetchApartments();
}, []);


function toggleDurum(d) {
  setFilterDurum((prev) => (prev === d ? "" : d));
}




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

// ----------------------
// DAİRE SİLME FONKSİYONU (Cascade Delete: resident + vehicle)
// ----------------------
async function deleteApartment() {

  if (!delBlok || !delKat || !delDaireNo) {
    alert("Blok, Kat ve Daire No zorunludur!");
    return;
  }

  // 1) Silinecek daireyi bul
  const { data: daireData, error: daireError } = await supabase
    .from("apartments")
    .select("*")
    .match({
      blok: delBlok,
      kat: Number(delKat),
      daire_no: Number(delDaireNo),
    });

  if (daireError) {
    alert("Kontrol sırasında hata oluştu!");
    return;
  }

  if (!daireData || daireData.length === 0) {
    alert("❗ Silmek istediğiniz daire bulunamadı!");
    return;
  }

  // Silinecek kişi adı (dairede yaşayan kişi)
  const kisiAdi = daireData[0].kisi;


  // -------------------------
  // 2) residents tablosundan kişiyi sil
  // -------------------------
  if (kisiAdi && kisiAdi.trim() !== "") {
    const { error: residentDeleteError } = await supabase
      .from("residents")
      .delete()
      .match({ kisi: kisiAdi });

    if (residentDeleteError) {
      alert("Kişi bilgisi silinirken hata oluştu!");
      return;
    }
  }


  // -------------------------
  // 3) vehicles tablosundan bu kişiye ait araçları sil
  // -------------------------
  if (kisiAdi && kisiAdi.trim() !== "") {
    const { error: vehicleDeleteError } = await supabase
      .from("vehicles")
      .delete()
      .match({ kisi: kisiAdi });

    if (vehicleDeleteError) {
      alert("Araç bilgileri silinirken hata oluştu!");
      return;
    }
  }


  // -------------------------
  // 4) Daireyi sil
  // -------------------------
  const { error: daireSilError } = await supabase
    .from("apartments")
    .delete()
    .match({
      blok: delBlok,
      kat: Number(delKat),
      daire_no: Number(delDaireNo),
    });

  if (daireSilError) {
    alert("Daire silinemedi: " + daireSilError.message);
    return;
  }

  alert("✔ Daire + kişi + araç bilgileri başarıyla silindi!");

  // Tabloları yenile
  fetchApartments();
  fetchResidents();
  fetchVehicles();

  // Formu temizle
  setDelBlok("");
  setDelKat("");
  setDelDaireNo("");
}




function formatPhone(value) {
  // Sadece rakamları al
  let cleaned = value.replace(/\D/g, "");

  // Format  (XXXX XXX XX XX)
  if (cleaned.length > 10) cleaned = cleaned.slice(0, 11);

  const formatted = cleaned
    .replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4")
    .replace(/(\d{4})(\d{3})(\d{2})$/, "$1 $2 $3")
    .replace(/(\d{4})(\d{3})$/, "$1 $2")
    .replace(/(\d{4})$/, "$1");

  return formatted;
}


useEffect(() => {
  fetchResidents();
}, []);

async function fetchResidents() {
  const { data, error } = await supabase
    .from("residents")
    .select("*")
    .order("created_at", { ascending: false });

  if (!error) setResidents(data);
}



async function addResident() {
  if (!selectedKisi || !rTelefon) {
    alert("Kişi ve Telefon zorunludur!");
    return;
  }

  const { data, error } = await supabase.from("residents").insert([
    {
      kisi: selectedKisi,
      telefon: rTelefon,
      email: rEmail || null,
    },
  ]);

  if (error) {
    alert("Kişi eklenemedi: " + error.message);
    return;
  }

  alert("Kişi başarıyla eklendi!");

  // Listeyi yenile
  fetchResidents();

  setSelectedKisi("");
  setRTelefon("");
  setREmail("");
}


// ----------------------
// KİŞİ SİLME (Cascade Delete: Araçları da siler)
// ----------------------
async function deleteResident() {

  if (!delKisi || !delTelefon) {
    alert("Kişi ismi ve telefon zorunludur!");
    return;
  }

  // 1) Bu kişi + telefon var mı kontrol et
  const { data: checkData, error: checkError } = await supabase
    .from("residents")
    .select("*")
    .match({
      kisi: delKisi,
      telefon: delTelefon
    });

  if (checkError) {
    alert("Kontrol sırasında hata oluştu!");
    return;
  }

  if (!checkData || checkData.length === 0) {
    alert("❗ Aradığınız kişi bilgisi bulunamadı!");
    return;
  }

  // -------------------------------
  // 2) Bu kişiye ait araçları sil
  // -------------------------------
  const { error: vehicleDeleteError } = await supabase
    .from("vehicles")
    .delete()
    .match({ kisi: delKisi });

  if (vehicleDeleteError) {
    alert("Araç bilgileri silinirken hata oluştu!");
    return;
  }

  // -------------------------------
  // 3) Kişiyi residents tablosundan sil
  // -------------------------------
  const { error: deleteError } = await supabase
    .from("residents")
    .delete()
    .match({
      kisi: delKisi,
      telefon: delTelefon
    });

  if (deleteError) {
    alert("Kişi silinirken hata oluştu!");
    return;
  }

  alert("✔ Kişi ve araç bilgileri başarıyla silindi!");

  // Tabloları yenile
  fetchResidents();
  fetchVehicles();

  // Formu temizle
  setDelKisi("");
  setDelTelefon("");
}


// Yeni araç ekleme fonksiyonu
async function addVehicle() {

  // Tüm alanların doldurulması zorunlu
  if (!vKisi || !vPlaka || !vMarka || !vModel || !vRenk) {
    alert("Tüm alanlar zorunludur!");
    return;
  }

  const { data, error } = await supabase.from("vehicles").insert([
    {
      kisi: vKisi,
      plaka: vPlaka,
      marka: vMarka,
      model: vModel,
      renk: vRenk,
    },
  ]);

  if (error) {
    alert("Araç eklenemedi: " + error.message);
    return;
  }

  alert("Araç başarıyla eklendi!");

  // tabloyu yenile
  fetchVehicles();

  // formu sıfırla
  setVKisi("");
  setVPlaka("");
  setVMarka("");
  setVModel("");
  setVRenk("");
}

// ----------------------
// ARAÇ SİLME FONKSİYONU (Kişi + Plaka doğrulamalı)
// ----------------------
async function deleteVehicle() {

  if (!delVKisi || !delVPlaka) {
    alert("Kişi ve Plaka alanları zorunludur!");
    return;
  }

  // 1) Bu kişi + plaka var mı kontrol et
  const { data: checkData, error: checkError } = await supabase
    .from("vehicles")
    .select("*")
    .match({
      kisi: delVKisi,
      plaka: delVPlaka,
    });

  if (checkError) {
    alert("Kontrol sırasında hata oluştu!");
    return;
  }

  if (!checkData || checkData.length === 0) {
    alert("❗ Bu kişiye ait böyle bir araç bulunamadı!");
    return;
  }

  // 2) Araç kaydını sil
  const { error: deleteError } = await supabase
    .from("vehicles")
    .delete()
    .match({
      kisi: delVKisi,
      plaka: delVPlaka,
    });

  if (deleteError) {
    alert("Araç silinirken hata oluştu!");
    return;
  }

  alert("✔ Araç başarıyla silindi!");

  // tabloyu yenile
  fetchVehicles();

  // inputları temizle
  setDelVKisi("");
  setDelVPlaka("");
}




// Supabase vehicles tablosundan tüm araçları çeker
async function fetchVehicles() {
  const { data, error } = await supabase
    .from("vehicles")                  // vehicles tablosu
    .select("*")                       // tüm kolonları al
    .order("created_at", { ascending: false });  // son eklenenler en üstte

  if (!error) setVehicles(data);       // hata yoksa state'e ata
}

// Component yüklenir yüklenmez araç verilerini çeker
useEffect(() => {
  fetchVehicles();                     // sayfa açıldığında çalışır
}, []);












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
            {filteredApartments.map((d) => (
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



{/* Daire Silme Formu */}
<div style={styles.section}>
  <h3 style={styles.sectionTitle}>Daire Sil</h3>

  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    
    {/* Blok */}
    <input
      style={styles.select}
      placeholder="Blok (A, B, C...)"
      value={delBlok}
      onChange={(e) => setDelBlok(e.target.value)}
    />

    {/* Kat */}
    <input
      style={styles.select}
      placeholder="Kat"
      type="number"
      value={delKat}
      onChange={(e) => setDelKat(e.target.value)}
    />

    {/* Daire No */}
    <input
      style={styles.select}
      placeholder="Daire No"
      type="number"
      value={delDaireNo}
      onChange={(e) => setDelDaireNo(e.target.value)}
    />

    <button style={{ ...styles.btn, background: "#ffb3b3" }} onClick={deleteApartment}>
       Daireyi Sil
    </button>
  </div>
</div>










      {/* Kat / Blok Bazlı Görüntüleme */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Kat / Blok Bazlı Görüntüleme</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {/* BLOK ALANI */}
        
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

            <input
              style={styles.select}
              list="blokListesi"
              placeholder="Blok seç veya yaz (A-Z)"
              value={filterBlok}
              onChange={(e) => setFilterBlok(e.target.value.toUpperCase())}
            />

            <datalist id="blokListesi">
              {uniqueBloklar.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>
            <span><strong>Blok:</strong> {filterBlok || "Yok"}</span>
          </div>

          {/* KAT ALANI */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              style={styles.select}
              list="katListesi"
              placeholder="Kat seç veya yaz"
              type="number"
              value={filterKat}
              onChange={(e) => setFilterKat(e.target.value)}
            />

            <datalist id="katListesi">
              {uniqueKatlar.map((k) => (
                <option key={k} value={k} />
            ))}
            </datalist>

            <span><strong>Kat:</strong> {filterKat || "Yok"}</span>
          </div>

        </div>
      </div>
        

      {/* Sahip / Kiracı / Boş */}
<div style={styles.section}>
  <h3 style={styles.sectionTitle}>Daire Sahibi / Kiracı Ayrımı</h3>
  <div style={styles.filterRow}>

    {/* SAHİP */}
    <button
      onClick={() => toggleDurum("Sahip")}
      style={{
        ...styles.btn,
        background: filterDurum === "Sahip" ? "#6fcf97" : "#e0e0e0",
      }}
    >
      Sahip
    </button>

    {/* KİRACI */}
    <button
      onClick={() => toggleDurum("Kiracı")}
      style={{
        ...styles.btn,
        background: filterDurum === "Kiracı" ? "#6fcf97" : "#e0e0e0",
      }}
    >
      Kiracı
    </button>

    {/* BOŞ */}
    <button
      onClick={() => toggleDurum("Boş")}
      style={{
        ...styles.btn,
        background: filterDurum === "Boş" ? "#6fcf97" : "#e0e0e0",
      }}
    >
      Boş
    </button>

  </div>
</div>


{/* Kişi Bilgileri */}
<div style={styles.section}>
  <h3 style={styles.sectionTitle}>Kişi Bilgileri</h3>

  <table style={styles.table}>
    <thead>
      <tr>
        <th style={styles.th}>Kişi</th>
        <th style={styles.th}>Telefon</th>
        <th style={styles.th}>Email</th>
      </tr>
    </thead>
    <tbody>
      {residents.map((k) => (
        <tr key={k.id}>
          <td style={styles.td}>{k.kisi}</td>
          <td style={styles.td}>{k.telefon}</td>
          <td style={styles.td}>{k.email || "-"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


{/* Yeni Kişi Ekle */}
<div style={styles.section}>
  <h3 style={styles.sectionTitle}>Yeni Kişi Ekle</h3>

  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    
    {/* KİŞİ DROPDOWN */}
    <select
  style={styles.select}
  value={selectedKisi}
  onChange={(e) => setSelectedKisi(e.target.value)}
>
  <option value="">Kişi seç (zorunlu)</option>
  {/* ---------------------------------------------------------
      availablePeopleForNewResident → sadece eklenmemiş kişiler
      Yani:
      ✔ Daha önce residents tablosunda yoksa burada görünür
      ✔ Eğer kişi daha önce eklendiyse dropdown’dan kaybolur
     --------------------------------------------------------- */}
  {availablePeopleForNewResident.map((name, index) => (
    <option key={index} value={name}>
      {name}
    </option>
  ))}

</select>

    <input
      placeholder="Telefon (zorunlu)"
      style={styles.select}
      value={rTelefon}
      onChange={(e) => setRTelefon(formatPhone(e.target.value))}
      maxLength={13}
    />

    <input
      placeholder="Email (opsiyonel)"
      style={styles.select}
      value={rEmail}
      onChange={(e) => setREmail(e.target.value)}
    />

    <button style={styles.btn} onClick={addResident}>
      Kişi Ekle
    </button>
  </div>
</div>


{/* Kişi Sil Paneli */}
<div style={styles.section}>
  <h3 style={styles.sectionTitle}>Kişi Sil</h3>

  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

    <input
      style={styles.select}
      placeholder="Kişi İsmi"
      value={delKisi}
      onChange={(e) => setDelKisi(e.target.value)}
    />

    <input
      style={styles.select}
      placeholder="Telefon"
      value={delTelefon}
      onChange={(e) => setDelTelefon(e.target.value)}
    />

    <button
      style={{ ...styles.btn, background: "#ffcccc" }}
      onClick={deleteResident}
    >
      Kişiyi Sil
    </button>

  </div>
</div>




      {/* Araç Bilgileri */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Araç Bilgileri</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Kişi</th>   {/* Araç sahibi */}
              <th style={styles.th}>Plaka</th>
              <th style={styles.th}>Marka</th>
              <th style={styles.th}>Model</th>
              <th style={styles.th}>Renk</th>
            </tr>
          </thead>
          <tbody>
            {/* vehicles state'inden gelen her araç için tablo satırı oluşturulur */}
            {vehicles.map((v) => (
              <tr key={v.id}>  {/* her satırın benzersiz id'si */}
                <td style={styles.td}>{v.kisi}</td>      {/* Araç sahibi */}
                <td style={styles.td}>{v.plaka}</td>   {/* Plaka sütunu */}
                <td style={styles.td}>{v.marka}</td>   {/* Marka sütunu */}
                <td style={styles.td}>{v.model}</td>   {/* Model sütunu */}
                <td style={styles.td}>{v.renk}</td>    {/* Renk sütunu */}
               </tr>
            ))}
          </tbody>

        </table>
      </div>
      {/* Yeni Araç Ekle Paneli */}
<div style={styles.section}>
  <h3 style={styles.sectionTitle}>Yeni Araç Ekle</h3>

  {/* Form alanları yan yana değil, dikey şekilde sıralansın */}
  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

    {/* Kişi dropdown - residents tablosundan gelen unique isimlerle doldurulur */}
    <select
      style={styles.select}
      value={vKisi}
      onChange={(e) => setVKisi(e.target.value)}
    >
      <option value="">Kişi seç (zorunlu)</option>

      
{/* ------------------------------------------------------------------
    availablePeopleForNewVehicle → sadece araç sahibi olarak
    daha önce eklenmemiş kişileri gösterir.
    Böylece aynı kişi ikinci kez araç ekleme formunda görünmez.
   ------------------------------------------------------------------ */}
{availablePeopleForNewVehicle.map((name, index) => (
  <option key={index} value={name}>
    {name}
  </option>
))}


    </select>

    {/* Plaka alanı */}
    <input
      style={styles.select}
      placeholder="Plaka (zorunlu)"
      value={vPlaka}
      onChange={(e) => setVPlaka(e.target.value.toUpperCase())} // otomatik büyük harf
    />

    {/* Marka alanı */}
    <input
      style={styles.select}
      placeholder="Marka (zorunlu)"
      value={vMarka}
      onChange={(e) => setVMarka(e.target.value)}
    />

    {/* Model alanı */}
    <input
      style={styles.select}
      placeholder="Model (zorunlu)"
      value={vModel}
      onChange={(e) => setVModel(e.target.value)}
    />

    {/* Renk alanı */}
    <input
      style={styles.select}
      placeholder="Renk (zorunlu)"
      value={vRenk}
      onChange={(e) => setVRenk(e.target.value)}
    />

    {/* Araç ekle butonu */}
    <button style={styles.btn} onClick={addVehicle}>
      Araç Ekle
    </button>
  </div>
</div>
{/* Araç Silme Paneli */}
<div style={styles.section}>
  <h3 style={styles.sectionTitle}>Araç Sil</h3>

  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

    <input
      style={styles.select}
      placeholder="Kişi İsmi"
      value={delVKisi}
      onChange={(e) => setDelVKisi(e.target.value)}
    />

    <input
      style={styles.select}
      placeholder="Plaka"
      value={delVPlaka}
      onChange={(e) => setDelVPlaka(e.target.value.toUpperCase())}
    />

    <button
      style={{ ...styles.btn, background: "#ffb3b3" }}
      onClick={deleteVehicle}
    >
      Aracı Sil
    </button>

  </div>
</div>



    </div>
  );
}

export default DaireBlokYonetimi;
