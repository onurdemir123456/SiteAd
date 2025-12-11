import React, { useState, useEffect } from "react";
import { Bell, Settings, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import supabase from "../../helper/supabaseClient";
import { useLanguage } from "../../context/LanguageContext";

export default function Duyurular() {
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState("yonetici");
  const [query, setQuery] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setAnnouncements(data);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Filters
  const filteredAnnouncements = announcements.filter((a) =>
    (a.title + " " + a.description)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const importantAnnouncements = announcements.filter(
    (a) => a.is_important === true
  );

  // Date format
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Styles
  const styles = {
    container: { padding: 16, maxWidth: 900, margin: "0 auto", fontFamily: "Arial" },
    headerRow: { display: "flex", justifyContent: "space-between", marginBottom: 16 },
    card: { background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 4px rgba(0,0,0,0.08)" },
    tabsRow: { display: "flex", gap: 8, marginBottom: 16, overflowX: "auto" },
    tab: {
      padding: "8px 12px",
      borderRadius: 10,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 6,
      border: "1px solid transparent",
      background: "transparent",
    },
    activeTab: { background: "#e8f1ff", border: "1px solid #b5d0ff" },
    searchRow: { display: "flex", gap: 8, marginBottom: 16 },
    input: { flex: 1, padding: 8, borderRadius: 8, border: "1px solid #ccc" },
    listItem: {
      padding: 16,
      border: "1px solid #ddd",
      borderRadius: 10,
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    dateText: { fontSize: 12, color: "#999", marginTop: 4 },
  };

  const tabs = [
    { key: "yonetici", label: t("yonetici"), icon: <Bell size={16} /> },
    { key: "onemli", label: t("onemli"), icon: <Settings size={16} /> },
    { key: "etkinlik", label: t("etkinlik"), icon: <MessageCircle size={16} /> },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h1 style={{ fontSize: 22, fontWeight: 600 }}>
          {t("announcementstitle")}
        </h1>
      </div>

      <div style={styles.card}>
        {/* Tabs */}
        <nav style={styles.tabsRow}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                ...styles.tab,
                ...(activeTab === tab.key ? styles.activeTab : {}),
              }}
            >
              {tab.icon}
              <span style={{ fontSize: 14 }}>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Search */}
        <div style={styles.searchRow}>
          <input
            style={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("announcementssearch")}
          />
        </div>

        {/* List */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
        >
          {activeTab === "onemli" ? (
            importantAnnouncements.length === 0 ? (
              <div style={{ textAlign: "center", padding: 32, color: "#666" }}>
                {t("announcementsnoImportant")}
              </div>
            ) : (
              importantAnnouncements.map((d) => (
                <div key={d.id} style={styles.listItem}>
                  <div>
                    <h4 style={{ margin: 0, fontWeight: 600 }}>{d.title}</h4>
                    <p style={{ margin: "6px 0 0", fontSize: 14, color: "#555" }}>
                      {d.description}
                    </p>
                    <p style={styles.dateText}>{formatDate(d.created_at)}</p>
                  </div>
                  <span style={{ fontSize: 12, color: "#999" }}>
                    #{d.id.slice(0, 4)}
                  </span>
                </div>
              ))
            )
          ) : filteredAnnouncements.length === 0 ? (
            <div style={{ textAlign: "center", padding: 32, color: "#666" }}>
              {t("announcementsnoAnnouncement")}
            </div>
          ) : (
            filteredAnnouncements.map((d) => (
              <div key={d.id} style={styles.listItem}>
                <div>
                  <h4 style={{ margin: 0, fontWeight: 600 }}>{d.title}</h4>
                  <p style={{ margin: "6px 0 0", fontSize: 14, color: "#555" }}>
                    {d.description}
                  </p>
                  <p style={styles.dateText}>{formatDate(d.created_at)}</p>
                </div>
                <span style={{ fontSize: 12, color: "#999" }}>
                  #{d.id.slice(0, 4)}
                </span>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
