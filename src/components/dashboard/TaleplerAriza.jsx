import React, { useState } from "react";
import supabase from "../../helper/supabaseClient";
import { useLanguage } from "../../context/LanguageContext";

function TaleplerAriza() {
  const { t } = useLanguage();

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
<<<<<<< HEAD
  // SUBMIT FUNCTIONS
  // -------------------------------
  const submitComplaint = async () => {
    if (!complaintTitle || !complaintMsg) return alert(t("requests.emptyFields"));
=======
  // COMMON VALIDATION
  // -------------------------------
  const validateFields = (title, message) => {
    if (!title || !message) {
      alert(t("requestsemptyFields"));
      return false;
    }
    return true;
  };

  // -------------------------------
  // COMPLAINT
  // -------------------------------
  const submitComplaint = async () => {
    if (!validateFields(complaintTitle, complaintMsg)) return;
>>>>>>> restore-old

    const { error } = await supabase.from("sikayetler").insert([
      {
        konu: complaintTitle,
        aciklama: complaintMsg,
        tarih: new Date().toISOString(),
        durum: "Açık",
      },
    ]);

    if (error) {
<<<<<<< HEAD
      console.error(error);
      alert(t("requests.complaintFail"));
    } else {
      alert(t("requests.complaintSuccess"));
=======
      alert(t("requestscomplaintFail"));
    } else {
      alert(t("requestscomplaintSuccess"));
>>>>>>> restore-old
      setComplaintTitle("");
      setComplaintMsg("");
    }
  };

<<<<<<< HEAD
  const submitFault = async () => {
    if (!faultTitle || !faultMsg) return alert(t("requests.emptyFields"));
=======
  // -------------------------------
  // FAULT
  // -------------------------------
  const submitFault = async () => {
    if (!validateFields(faultTitle, faultMsg)) return;
>>>>>>> restore-old

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
<<<<<<< HEAD
      console.error(error);
      alert(t("requests.faultFail"));
    } else {
      alert(t("requests.faultSuccess"));
=======
      alert(t("requestsfaultFail"));
    } else {
      alert(t("requestsfaultSuccess"));
>>>>>>> restore-old
      setFaultTitle("");
      setFaultMsg("");
    }
  };

<<<<<<< HEAD
  const submitSupport = async () => {
    if (!supportTitle || !supportMsg) return alert(t("requests.emptyFields"));
=======
  // -------------------------------
  // SUPPORT
  // -------------------------------
  const submitSupport = async () => {
    if (!validateFields(supportTitle, supportMsg)) return;
>>>>>>> restore-old

    const { error } = await supabase.from("talepler").insert([
      {
        konu: supportTitle,
        detay: supportMsg,
        tarih: new Date().toISOString(),
        durum: "Açık",
      },
    ]);

    if (error) {
<<<<<<< HEAD
      console.error(error);
      alert(t("requests.supportFail"));
    } else {
      alert(t("requests.supportSuccess"));
=======
      alert(t("requestssupportFail"));
    } else {
      alert(t("requestssupportSuccess"));
>>>>>>> restore-old
      setSupportTitle("");
      setSupportMsg("");
    }
  };

  // -------------------------------
  // STYLES
  // -------------------------------
  const styles = {
    container: { padding: "20px", fontFamily: "Arial, sans-serif" },
    title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
    section: {
      marginBottom: "30px",
      padding: "15px",
      background: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    sectionTitle: { fontSize: "18px", fontWeight: "600", marginBottom: "10px" },
    btn: {
      padding: "8px 12px",
      background: "#4caf50",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      color: "#fff",
      fontSize: "14px",
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
      <h2 style={styles.title}>{t("requeststitle")}</h2>

<<<<<<< HEAD
      {/* ARIZA */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("requestsfault")}</h3>
        <input
          style={styles.input}
          type="text"
=======
      {/* -------- FAULT -------- */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("requestsfault")}</h3>

        <input
          style={styles.input}
>>>>>>> restore-old
          placeholder={t("requestsfaultTitle")}
          value={faultTitle}
          onChange={(e) => setFaultTitle(e.target.value)}
        />
        <textarea
<<<<<<< HEAD
          style={{ ...styles.input, height: "80px" }}
          placeholder={t("requestsfaultDesc")}
          value={faultMsg}
          onChange={(e) => setFaultMsg(e.target.value)}
        ></textarea>
=======
          style={{ ...styles.input, height: 80 }}
          placeholder={t("requestsfaultDesc")}
          value={faultMsg}
          onChange={(e) => setFaultMsg(e.target.value)}
        />

>>>>>>> restore-old
        <button style={styles.btn} onClick={submitFault}>
          {t("requestsfaultSubmit")}
        </button>
      </div>

<<<<<<< HEAD
      {/* TEKNİK DESTEK */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("requestssupport")}</h3>
        <input
          style={styles.input}
          type="text"
=======
      {/* -------- SUPPORT -------- */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("requestssupport")}</h3>

        <input
          style={styles.input}
>>>>>>> restore-old
          placeholder={t("requestssupportTitle")}
          value={supportTitle}
          onChange={(e) => setSupportTitle(e.target.value)}
        />
        <textarea
<<<<<<< HEAD
          style={{ ...styles.input, height: "80px" }}
          placeholder={t("requestssupportDesc")}
          value={supportMsg}
          onChange={(e) => setSupportMsg(e.target.value)}
        ></textarea>
=======
          style={{ ...styles.input, height: 80 }}
          placeholder={t("requestssupportDesc")}
          value={supportMsg}
          onChange={(e) => setSupportMsg(e.target.value)}
        />

>>>>>>> restore-old
        <button style={styles.btn} onClick={submitSupport}>
          {t("requestssupportSubmit")}
        </button>
      </div>

<<<<<<< HEAD
      {/* ŞİKAYET */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("requestscomplaint")}</h3>
        <input
          style={styles.input}
          type="text"
=======
      {/* -------- COMPLAINT -------- */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("requestscomplaint")}</h3>

        <input
          style={styles.input}
>>>>>>> restore-old
          placeholder={t("requestscomplaintTitle")}
          value={complaintTitle}
          onChange={(e) => setComplaintTitle(e.target.value)}
        />
        <textarea
<<<<<<< HEAD
          style={{ ...styles.input, height: "80px" }}
          placeholder={t("requestscomplaintDesc")}
          value={complaintMsg}
          onChange={(e) => setComplaintMsg(e.target.value)}
        ></textarea>
=======
          style={{ ...styles.input, height: 80 }}
          placeholder={t("requestscomplaintDesc")}
          value={complaintMsg}
          onChange={(e) => setComplaintMsg(e.target.value)}
        />

>>>>>>> restore-old
        <button style={styles.btn} onClick={submitComplaint}>
          {t("requestscomplaintSubmit")}
        </button>
      </div>
    </div>
  );
}

export default TaleplerAriza;
