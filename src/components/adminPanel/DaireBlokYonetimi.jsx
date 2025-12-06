import React from "react";
import { useEffect, useState } from "react";
import supabase from "../../helper/supabaseClient";
import { useLanguage } from "../../context/LanguageContext";

function DaireBlokYonetimi() {

  const { t } = useLanguage();
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
  async function deleteVehicle() {

    if (!delVKisi || !delVPlaka) {
      alert(t("deleteRequired"));
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
      alert(t("deleteCheckError"));
      return;
    }

    if (!checkData || checkData.length === 0) {
      alert(t("deleteNotFound"));
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
      alert(t("deleteError"));
      return;
    }

    alert(t("deleteSuccess"));

    // tabloyu yenile
    fetchVehicles();

    // inputları temizle
    setDelVKisi("");
    setDelVPlaka("");
  }
  async function addVehicle() {

    // Tüm alanların doldurulması zorunlu
    if (!vKisi || !vPlaka || !vMarka || !vModel || !vRenk) {
      alert(t("addRequired"));
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
      alert(t("addError") + error.message);
      return;
    }

    alert(t("addSuccess"));

    // tabloyu yenile
    fetchVehicles();

    // formu sıfırla
    setVKisi("");
    setVPlaka("");
    setVMarka("");
    setVModel("");
    setVRenk("");
  }


  const uniqueApartmentKisiler = [...new Set(
    apartments
      .map(a => a.kisi)
      .filter(k => k && k.trim() !== "")
  )];
  const filteredApartments = apartments.filter((a) => {
    return (
      (filterBlok === "" || a.blok === filterBlok) &&
      (filterKat === "" || a.kat === Number(filterKat)) &&
      (filterDurum === "" || a.durum === filterDurum)
    );
  });

  const isActive = (d) => filterDurum === d;
  // dairelerdeki kişileri unique olarak al
  const uniqueKisiler = [...new Set(
    apartments
      .map(a => a.kisi)
      .filter(k => k && k.trim() !== "")
  )];
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






  async function addApartment() {
    if (!blok || !kat || !daireNo) {
      alert(t("apartmentrequiredFields"));
      return;
    }

    // --- Kişi Zorunluluk Kontrolü ---
    if ((durum === "Sahip" || durum === "Kiracı") && !kisi) {
      alert(t("apartmentpersonRequired"));
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
      alert(t("apartmentaddError") + error.message);
    } else {
      alert(t("apartmentaddSuccess"));
      fetchApartments(); // Listeyi yenile
    }

    setBlok("");
    setKat("");
    setDaireNo("");
    setDurum("Boş");
    setKisi("");
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
      alert(t("residentrequiredFields"));
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
      alert(t("residentaddError") + error.message);
      return;
    }

    alert(t("residentaddSuccess"));

    // Listeyi yenile
    fetchResidents();

    setSelectedKisi("");
    setRTelefon("");
    setREmail("");
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
      <h2 style={styles.title}>{t("daireler_blok_yonetimi")}</h2>

      {/* Daire Listesi */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("daire_listesi")}</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("blok")}</th>
              <th style={styles.th}>{t("kat")}</th>
              <th style={styles.th}>{t("daire_no")}</th>
              <th style={styles.th}>{t("durum")}</th>
              <th style={styles.th}>{t("kisi")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredApartments.map((d) => (
              <tr key={d.id}>
                <td style={styles.td}>{d.blok}</td>
                <td style={styles.td}>{d.kat}</td>
                <td style={styles.td}>{d.daire_no}</td>
                <td style={styles.td}>{t(d.durum)}</td>
                <td style={styles.td}>{d.kisi || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Daire Ekleme */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("yeni_daire_ekle")}</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            style={styles.select}
            placeholder={t("blok_placeholder")}
            value={blok}
            onChange={(e) => setBlok(e.target.value)}
          />

          <input
            style={styles.select}
            placeholder={t("kat")}
            value={kat}
            onChange={(e) => setKat(e.target.value)}
            type="number"
          />

          <input
            style={styles.select}
            placeholder={t("daire_no")}
            value={daireNo}
            onChange={(e) => setDaireNo(e.target.value)}
            type="number"
          />

          <select
            style={styles.select}
            value={durum}
            onChange={(e) => setDurum(e.target.value)}
          >
            <option value="Sahip">{t("sahip")}</option>
            <option value="Kiracı">{t("kiraci")}</option>
            <option value="Boş">{t("bos")}</option>
          </select>

          <input
            style={styles.select}
            placeholder={
              durum === "Boş" ? t("kisi") : t("kisi_zorunlu")
            }
            value={kisi}
            onChange={(e) => setKisi(e.target.value)}
            disabled={durum === "Boş"}
          />

          <button style={styles.btn} onClick={addApartment}>
            {t("daire_ekle")}
          </button>
        </div>
      </div>

      {/* Kat / Blok Bazlı Görüntüleme */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("kat_blok_goruntuleme")}</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {/* BLOK */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              style={styles.select}
              list="blokListesi"
              placeholder={t("blok_sec_yaz")}
              value={filterBlok}
              onChange={(e) => setFilterBlok(e.target.value.toUpperCase())}
            />

            <datalist id="blokListesi">
              {uniqueBloklar.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>

            <span>
              <strong>{t("blok")}:</strong> {filterBlok || t("yok")}
            </span>
          </div>

          {/* KAT */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
              style={styles.select}
              list="katListesi"
              placeholder={t("kat_sec_yaz")}
              type="number"
              value={filterKat}
              onChange={(e) => setFilterKat(e.target.value)}
            />

            <datalist id="katListesi">
              {uniqueKatlar.map((k) => (
                <option key={k} value={k} />
              ))}
            </datalist>

            <span>
              <strong>{t("kat")}:</strong> {filterKat || t("yok")}
            </span>
          </div>
        </div>
      </div>

      {/* Sahip / Kiracı / Boş */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("sahip_kiraci_ayrimi")}</h3>

        <div style={styles.filterRow}>
          <button
            onClick={() => toggleDurum("Sahip")}
            style={{
              ...styles.btn,
              background: filterDurum === "Sahip" ? "#6fcf97" : "#e0e0e0",
            }}
          >
            {t("sahip")}
          </button>

          <button
            onClick={() => toggleDurum("Kiracı")}
            style={{
              ...styles.btn,
              background: filterDurum === "Kiracı" ? "#6fcf97" : "#e0e0e0",
            }}
          >
            {t("kiraci")}
          </button>

          <button
            onClick={() => toggleDurum("Boş")}
            style={{
              ...styles.btn,
              background: filterDurum === "Boş" ? "#6fcf97" : "#e0e0e0",
            }}
          >
            {t("bos")}
          </button>
        </div>
      </div>

      {/* Kişi Bilgileri */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("kisi_bilgileri")}</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("kisi")}</th>
              <th style={styles.th}>{t("telefon")}</th>
              <th style={styles.th}>{t("email")}</th>
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
        <h3 style={styles.sectionTitle}>{t("yeni_kisi_ekle")}</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

          <select
            style={styles.select}
            value={selectedKisi}
            onChange={(e) => setSelectedKisi(e.target.value)}
          >
            <option value="">{t("kisi_sec")}</option>
            {uniqueKisiler.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>

          <input
            placeholder={t("telefon_zorunlu")}
            style={styles.select}
            value={rTelefon}
            onChange={(e) => setRTelefon(formatPhone(e.target.value))}
            maxLength={13}
          />

          <input
            placeholder={t("email_opsiyonel")}
            style={styles.select}
            value={rEmail}
            onChange={(e) => setREmail(e.target.value)}
          />

          <button style={styles.btn} onClick={addResident}>
            {t("kisi_ekle")}
          </button>
        </div>
      </div>

      {/* Araç Bilgileri */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("arac_bilgileri")}</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("plaka")}</th>
              <th style={styles.th}>{t("marka")}</th>
              <th style={styles.th}>{t("model")}</th>
              <th style={styles.th}>{t("renk")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>34 ABC 123</td>
              <td style={styles.td}>BMW</td>
              <td style={styles.td}>320i</td>
              <td style={styles.td}>{t("siyah")}</td>
            </tr>
          </tbody>

        </table>
      </div>
      {/* Yeni Araç Ekle Paneli */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("addNewCar")}</h3>

        {/* Form alanları yan yana değil, dikey şekilde sıralansın */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

          {/* Kişi dropdown - residents tablosundan gelen unique isimlerle doldurulur */}
          <select
            style={styles.select}
            value={vKisi}
            onChange={(e) => setVKisi(e.target.value)}
          >
            <option value="">{t("selectPersonMandatory")}</option>


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
            placeholder={t("vehicle_plate_placeholder")}
            value={vPlaka}
            onChange={(e) => setVPlaka(e.target.value.toUpperCase())} // otomatik büyük harf
          />

          {/* Marka alanı */}
          <input
            style={styles.select}
            placeholder={t("vehicle_brand_placeholder")}
            value={vMarka}
            onChange={(e) => setVMarka(e.target.value)}
          />

          {/* Model alanı */}
          <input
            style={styles.select}
            placeholder={t("vehicle_model_placeholder")}
            value={vModel}
            onChange={(e) => setVModel(e.target.value)}
          />

          {/* Renk alanı */}
          <input
            style={styles.select}
            placeholder={t("vehicle_color_placeholder")}
            value={vRenk}
            onChange={(e) => setVRenk(e.target.value)}
          />

        {/* Araç ekle butonu */}
          <button style={styles.btn} onClick={addVehicle}>
            {t("add_vehicle_button")}
          </button>
        </div>
      </div>

      {/* Araç Silme Paneli */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("delete_vehicle_title")}</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

          <input
            style={styles.select}
            placeholder={t("delete_vehicle_person_placeholder")}
            value={delVKisi}
            onChange={(e) => setDelVKisi(e.target.value)}
          />

          <input
            style={styles.select}
            placeholder={t("delete_vehicle_plate_placeholder")}
            value={delVPlaka}
            onChange={(e) => setDelVPlaka(e.target.value.toUpperCase())}
          />

          <button
            style={{ ...styles.btn, background: "#ffb3b3" }}
            onClick={deleteVehicle}
          >
            {t("delete_vehicle_button")}
          </button>

        </div>
      </div>



    </div>

  );
}

export default DaireBlokYonetimi;