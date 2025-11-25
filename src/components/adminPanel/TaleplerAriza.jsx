import React, { useEffect, useState } from "react";
import supabase from "../../helper/supabaseClient";

export default function AdminSikayetler() {
  const [sikayetler, setSikayetler] = useState([]);
  const [arizalar, setArizalar] = useState([]);
  const [talepler, setTalepler] = useState([]);

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "25px",
    },
    section: {
      marginBottom: "35px",
      padding: "15px",
      background: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "15px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      padding: "10px 12px",
      borderBottom: "1px solid #ddd",
      background: "#f0f0f0",
      textAlign: "left",
      fontWeight: "600",
    },
    td: {
      padding: "10px 12px",
      borderBottom: "1px solid #ddd",
    },
    btn: {
      padding: "6px 10px",
      background: "#2196F3",
      border: "none",
      color: "#fff",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      marginRight: "8px",
    },
    btnGreen: {
      padding: "6px 10px",
      background: "#4CAF50",
      border: "none",
      color: "#fff",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    },
    statusOpen: { color: "red", fontWeight: "bold" },
    statusClosed: { color: "green", fontWeight: "bold" },
  };

  // ----------------------------
  // Supabase Data Fetch
  // ----------------------------

  const fetchSikayetler = async () => {
    const { data } = await supabase.from("sikayetler").select("*").order("tarih", { ascending: false });
    setSikayetler(data || []);
  };

  const fetchArizalar = async () => {
    const { data } = await supabase.from("arizalar").select("*").order("tarih", { ascending: false });
    setArizalar(data || []);
  };

  const fetchTalepler = async () => {
    const { data } = await supabase.from("talepler").select("*").order("tarih", { ascending: false });
    setTalepler(data || []);
  };

  useEffect(() => {
    fetchSikayetler();
    fetchArizalar();
    fetchTalepler();
  }, []);

  // ----------------------------
  // Durum Güncellemeler
  // ----------------------------

  const closeSikayet = async (id) => {
    await supabase.from("sikayetler").update({ durum: "Kapalı" }).eq("id", id);
    fetchSikayetler();
  };

  const closeAriza = async (id) => {
    await supabase.from("arizalar").update({ durum: "Kapalı" }).eq("id", id);
    fetchArizalar();
  };

  const closeTalep = async (id) => {
    await supabase.from("talepler").update({ durum: "Kapalı" }).eq("id", id);
    fetchTalepler();
  };

  // İşçilik ve tamamlanma güncelleme
  const updateArizaDetails = async (id) => {
    const iscilik = prompt("İşçilik Tutarı (örn: 500₺):");
    const tamamlanma = prompt("Tamamlanma Yüzdesi (örn: %50):");

    await supabase
      .from("arizalar")
      .update({ iscilik: iscilik, tamamlanma: tamamlanma })
      .eq("id", id);

    fetchArizalar();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Paneli – Talepler & Arıza & Şikayet Yönetimi</h2>

      {/* ------------------------------------------------------------------ */}
      {/* ŞİKAYETLER */}
      {/* ------------------------------------------------------------------ */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Şikayetler</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tarih</th>
              <th style={styles.th}>Daire</th>
              <th style={styles.th}>Konu</th>
              <th style={styles.th}>Açıklama</th>
              <th style={styles.th}>Durum</th>
              <th style={styles.th}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {sikayetler.map((s) => (
              <tr key={s.id}>
                <td style={styles.td}>{new Date(s.tarih).toLocaleDateString()}</td>
                <td style={styles.td}>{s.daire}</td>
                <td style={styles.td}>{s.konu}</td>
                <td style={styles.td}>{s.aciklama}</td>
                <td style={styles.td}>
                  {s.durum === "Açık" ? (
                    <span style={styles.statusOpen}>Açık</span>
                  ) : (
                    <span style={styles.statusClosed}>Kapalı</span>
                  )}
                </td>
                <td style={styles.td}>
                  {s.durum === "Açık" && (
                    <button style={styles.btn} onClick={() => closeSikayet(s.id)}>
                      Kapat
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ARIZA BİLDİRİMLERİ */}
      {/* ------------------------------------------------------------------ */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Arıza Bildirimleri</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tarih</th>
              <th style={styles.th}>Daire</th>
              <th style={styles.th}>Konu</th>
              <th style={styles.th}>Açıklama</th>
              <th style={styles.th}>İşçilik</th>
              <th style={styles.th}>Tamamlanma</th>
              <th style={styles.th}>Durum</th>
              <th style={styles.th}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {arizalar.map((a) => (
              <tr key={a.id}>
                <td style={styles.td}>{new Date(a.tarih).toLocaleDateString()}</td>
                <td style={styles.td}>{a.daire}</td>
                <td style={styles.td}>{a.konu}</td>
                <td style={styles.td}>{a.aciklama}</td>
                <td style={styles.td}>{a.iscilik || "-"}</td>
                <td style={styles.td}>{a.tamamlanma || "-"}</td>
                <td style={styles.td}>
                  {a.durum === "Açık" ? (
                    <span style={styles.statusOpen}>Açık</span>
                  ) : (
                    <span style={styles.statusClosed}>Kapalı</span>
                  )}
                </td>
                <td style={styles.td}>
                  {a.durum === "Açık" && (
                    <>
                      <button style={styles.btn} onClick={() => updateArizaDetails(a.id)}>
                        İşçilik / Tamamlanma
                      </button>
                      <button style={styles.btnGreen} onClick={() => closeAriza(a.id)}>
                        Kapat
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TEKNİK DESTEK TALEPLERİ */}
      {/* ------------------------------------------------------------------ */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Teknik Destek Talepleri</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tarih</th>
              <th style={styles.th}>Konu</th>
              <th style={styles.th}>Detay</th>
              <th style={styles.th}>Durum</th>
              <th style={styles.th}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {talepler.map((t) => (
              <tr key={t.id}>
                <td style={styles.td}>{new Date(t.tarih).toLocaleDateString()}</td>
                <td style={styles.td}>{t.konu}</td>
                <td style={styles.td}>{t.detay}</td>
                <td style={styles.td}>
                  {t.durum === "Açık" ? (
                    <span style={styles.statusOpen}>Açık</span>
                  ) : (
                    <span style={styles.statusClosed}>Kapalı</span>
                  )}
                </td>
                <td style={styles.td}>
                  {t.durum === "Açık" && (
                    <button style={styles.btnGreen} onClick={() => closeTalep(t.id)}>
                      Kapat
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

