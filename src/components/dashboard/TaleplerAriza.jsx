import React, { useState } from "react";
import supabase from "../../helper/supabaseClient";

function TaleplerAriza() {
  // --------------------------
  // STATE
  // --------------------------
  const [complaintTitle, setComplaintTitle] = useState("");
  const [complaintMsg, setComplaintMsg] = useState("");

  const [faultTitle, setFaultTitle] = useState("");
  const [faultMsg, setFaultMsg] = useState("");

  const [supportTitle, setSupportTitle] = useState("");
  const [supportMsg, setSupportMsg] = useState("");

  // -------------------------------
  // ŞİKAYET SUBMIT
  // -------------------------------
  const submitComplaint = async () => {
    if (!complaintTitle || !complaintMsg) return alert("Alanlar boş olamaz");

    const { error } = await supabase.from("sikayetler").insert([
      {
        konu: complaintTitle,
        aciklama: complaintMsg,
        tarih: new Date().toISOString(),
        durum: "Açık",
      },
    ]);

    if (error) {
      console.error(error);
      alert("Şikayet oluşturulamadı!");
    } else {
      alert("Şikayet gönderildi!");
      setComplaintTitle("");
      setComplaintMsg("");
    }
  };

  // -------------------------------
  // ARIZA SUBMIT
  // -------------------------------
  const submitFault = async () => {
    if (!faultTitle || !faultMsg) return alert("Alanlar boş olamaz");

    const { error } = await supabase.from("arizalar").insert([
      {
        konu: faultTitle,
        aciklama: faultMsg,
        tarih: new Date().toISOString(),
        durum: "Açık",
        iscilik: "",
        tamamlanma: "0%",
      },
    ]);

    if (error) {
      console.error(error);
      alert("Arıza bildirilemedi!");
    } else {
      alert("Arıza kaydı oluşturuldu!");
      setFaultTitle("");
      setFaultMsg("");
    }
  };

  // -------------------------------
  // TEKNİK DESTEK SUBMIT
  // -------------------------------
  const submitSupport = async () => {
    if (!supportTitle || !supportMsg) return alert("Alanlar boş olamaz");

    const { error } = await supabase.from("talepler").insert([
      {
        konu: supportTitle,
        detay: supportMsg,
        tarih: new Date().toISOString(),
        durum: "Açık",
      },
    ]);

    if (error) {
      console.error(error);
      alert("Destek kaydı oluşturulamadı!");
    } else {
      alert("Teknik destek talebi oluşturuldu!");
      setSupportTitle("");
      setSupportMsg("");
    }
  };

  // -------------------------------
  // STYLES
  // -------------------------------
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
      <h2 style={styles.title}>Talepler – Arıza / Destek / Şikayet</h2>

      {/* ----------------- ARIZA BİLDİRME ----------------- */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Arıza Bildirme</h3>

        <input
          style={styles.input}
          type="text"
          placeholder="Arıza Konusu"
          value={faultTitle}
          onChange={(e) => setFaultTitle(e.target.value)}
        />

        <textarea
          style={{ ...styles.input, height: "80px" }}
          placeholder="Açıklama"
          value={faultMsg}
          onChange={(e) => setFaultMsg(e.target.value)}
        ></textarea>

        <button style={styles.btn} onClick={submitFault}>
          Arıza Bildir
        </button>
      </div>

      {/* ----------------- TEKNİK DESTEK ----------------- */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Teknik Destek Kaydı</h3>

        <input
          style={styles.input}
          type="text"
          placeholder="Talep Konusu"
          value={supportTitle}
          onChange={(e) => setSupportTitle(e.target.value)}
        />

        <textarea
          style={{ ...styles.input, height: "80px" }}
          placeholder="Detaylar"
          value={supportMsg}
          onChange={(e) => setSupportMsg(e.target.value)}
        ></textarea>

        <button style={styles.btn} onClick={submitSupport}>
          Destek Kaydı Oluştur
        </button>
      </div>

      {/* ----------------- ŞİKAYET ----------------- */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Şikayet Oluştur</h3>

        <input
          style={styles.input}
          type="text"
          placeholder="Şikayet Konusu"
          value={complaintTitle}
          onChange={(e) => setComplaintTitle(e.target.value)}
        />

        <textarea
          style={{ ...styles.input, height: "80px" }}
          placeholder="Şikayet Açıklaması"
          value={complaintMsg}
          onChange={(e) => setComplaintMsg(e.target.value)}
        ></textarea>

        <button style={styles.btn} onClick={submitComplaint}>
          Şikayet Gönder
        </button>
      </div>
    </div>
  );
}

export default TaleplerAriza;

