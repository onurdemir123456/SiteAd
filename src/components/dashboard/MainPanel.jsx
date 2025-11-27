import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import supabase from "../../helper/supabaseClient";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function UserDashboard({ setActiveTab }) {
  const [activeCount, setActiveCount] = useState(0);

  // ---------------- DUYURULAR STATE ----------------
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setAnnouncements(data);
  };

  const fetchCounts = async () => {
    const { data: s } = await supabase.from("sikayetler").select("*");
    const { data: a } = await supabase.from("arizalar").select("*");
    const { data: t } = await supabase.from("talepler").select("*");

    const total =
      s.filter((x) => x.durum === "Açık").length +
      a.filter((x) => x.durum === "Açık").length +
      t.filter((x) => x.durum === "Açık").length;

    setActiveCount(total);
  };

  useEffect(() => {
    fetchCounts();
    fetchAnnouncements();
  }, []);

  // ---------------- CHART DATA ----------------
  const aidatData = {
    labels: ["Ödenen", "Ödenmeyen"],
    datasets: [
      {
        data: [90, 30],
        backgroundColor: ["#2196f3", "#ff9800"],
        hoverOffset: 10,
      },
    ],
  };

  const enerjiData = {
    labels: ["Elektrik", "Su", "Doğalgaz"],
    datasets: [
      {
        data: [400, 150, 200],
        backgroundColor: ["#ffc107", "#00bcd4", "#8bc34a"],
        hoverOffset: 10,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, font: { size: 12 } },
    },
  };

  // ---------------- HELPERS ----------------
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("tr-TR", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // ---------------- STYLES ----------------
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    cardsContainer: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      marginBottom: "30px",
    },
    card: {
      background: "#f5f5f5",
      padding: "20px",
      borderRadius: "12px",
      flex: "1 1 200px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    chartsContainer: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
    },
    chartCard: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      flex: "1 1 300px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
  };

  return (
    <div style={styles.container}>
      <h1>Kullanıcı Dashboard</h1>

      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <h2>Daireniz</h2>
          <p>A3-12</p>
        </div>

        <div style={styles.card}>
          <h2>Aidat Durumu</h2>
          <p>Ödenen: 1.200₺</p>
          <p>Toplam Borç: 1.500₺</p>
        </div>

        <div style={styles.card}>
          <h2>Açık Talepler</h2>
          <p>Toplam: {activeCount}</p>
        </div>

        {/* ------------ SCROLLABLE DUYURULAR ------------ */}
        <div style={styles.card}>
          <h2>Son Duyurular</h2>
          <div
            style={{
              maxHeight: "150px",
              overflowY: "auto",
              paddingRight: "5px",
            }}
          >
            {announcements.length === 0 && <p>Henüz duyuru bulunmuyor.</p>}

            {announcements.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedAnnouncement(item);
                  setShowModal(true);
                }}
                style={{
                  marginBottom: "8px",
                  padding: "6px 8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  background: "#f7f7f7",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#e4e4e4")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#f7f7f7")
                }
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>• {item.title}</span>
                  <span style={{ fontSize: "12px", color: "#666" }}>
                    {formatDate(item.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.chartsContainer}>
        <div style={styles.chartCard}>
          <h2>Aidat Kullanımı</h2>
          <Pie
            data={aidatData}
            options={{
              ...pieOptions,
              plugins: { title: { display: true, text: "Aidat Kullanımı" } },
            }}
          />
        </div>

        <div style={styles.chartCard}>
          <h2>Enerji Kullanımı</h2>
          <Pie
            data={enerjiData}
            options={{
              ...pieOptions,
              plugins: { title: { display: true, text: "Enerji Kullanımı" } },
            }}
          />
        </div>
      </div>

      {/* ---------------- MODAL ---------------- */}
      {showModal && selectedAnnouncement && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              width: "400px",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: "5px" }}>
              {selectedAnnouncement.title}
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "10px",
              }}
            >
              {formatDate(selectedAnnouncement.created_at)}
            </p>
            <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.4" }}>
              {selectedAnnouncement.description ||
                selectedAnnouncement.content ||
                "İçerik bulunamadı."}
            </p>
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                border: "none",
                background: "#2196f3",
                color: "white",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;