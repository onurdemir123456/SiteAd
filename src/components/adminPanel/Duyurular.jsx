import React, { useState, useEffect } from "react";
import { Bell, Mail, MessageCircle, Settings } from "lucide-react";
import { motion } from "framer-motion";
import supabase from "../../helper/supabaseClient";
import { useLanguage } from "../../context/LanguageContext";
<<<<<<< HEAD
export default function Duyurular() {
  const [activeTab, setActiveTab] = useState("yonetici");
  const [query, setQuery] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImportant, setNewImportant] = useState(false);
  const { t } = useLanguage();
  // Tarih formatlama fonksiyonu
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
=======


export default function Duyurular() {
    const { t, language } = useLanguage(); // language değişkeni de eklendi

    const [activeTab, setActiveTab] = useState("yonetici");
    const [query, setQuery] = useState("");
    const [announcements, setAnnouncements] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newImportant, setNewImportant] = useState(false);
>>>>>>> restore-old

    // Tarih formatlama fonksiyonu, dil desteği için güncellendi
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        // language değişkenini kullanarak dinamik dil kodu belirleme
        const localeCode = language === "tr" ? "tr-TR" : "en-US";
        
        return d.toLocaleDateString(localeCode, {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // --------------------------------------------------
    // 1) Duyuruları Supabase'den çek
    // --------------------------------------------------
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

    // --------------------------------------------------
    // 2) Realtime (yeni duyuru düştüğünde otomatik güncelle)
    // --------------------------------------------------
    useEffect(() => {
        const channel = supabase
            .channel("announcements-realtime")
            .on(
                "postgres_changes",
                { event: "INSERT", table: "announcements", schema: "public" },
                (payload) => {
                    setAnnouncements((prev) => [payload.new, ...prev]);
                }
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    // --------------------------------------------------
    // 3) Yeni duyuru ekleme
    // --------------------------------------------------
    const addAnnouncement = async () => {
        // Boş kontrolü (Hata mesajı çevrildi)
        if (!newTitle.trim() || !newDescription.trim()) {
            // "Announcement title and content cannot be empty!" yerine daha doğru bir anahtar kullanıldı.
            alert(t("requestsemptyFields")); 
            return;
        }

        const { error } = await supabase.from("announcements").insert([
            {
                title: newTitle,
                description: newDescription,
                is_important: newImportant,
            },
        ]);

        if (!error) {
            setShowAddModal(false);
            setNewTitle("");
            setNewDescription("");
            setNewImportant(false);
        } else {
            // Hata mesajı çevrildi
            alert(t("requestsfaultFail")); 
        }
    };

<<<<<<< HEAD
    const { error } = await supabase.from("announcements").insert([
      {
        title: newTitle,
        description: newDescription,
        is_important: newImportant,
      },
    ]);

    if (!error) {
      setShowAddModal(false);
      setNewTitle("");
      setNewDescription("");
      setNewImportant(false);
    } else {
      alert("Duyuru eklenirken bir hata oluştu!");
    }
  };

  // --------------------------------------------------
  // 4) Arama filtreleme
  // --------------------------------------------------
  const filteredAnnouncements = announcements.filter((a) =>
    (a.title + " " + a.description).toLowerCase().includes(query.toLowerCase())
  );



  const importantAnnouncements = filteredAnnouncements.filter((a) => a.is_important === true);

  // --------------------------------------------------
  // Stil
  // --------------------------------------------------
  const styles = {
    container: { padding: 16, maxWidth: 900, margin: "0 auto", fontFamily: "Arial" },
    headerRow: { display: "flex", justifyContent: "space-between", marginBottom: 16 },
    headerBtns: { display: "flex", gap: 8 },
    btn: { padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc", background: "white", cursor: "pointer" },
    primaryBtn: {
      padding: "8px 12px",
      borderRadius: 8,
      background: "#2563eb",
      color: "white",
      cursor: "pointer",
      border: "none",
    },
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
    },
    activeTab: { background: "#e8f1ff", border: "1px solid #b5d0ff" },
    searchRow: { display: "flex", gap: 8, marginBottom: 16 },
    input: { flex: 1, padding: 8, borderRadius: 8, border: "1px solid #ccc" },
    smallBtn: { padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc", cursor: "pointer", background: "white" },
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
    { key: "iletisim", label: t("iletisim"), icon: <Mail size={16} /> },
  ];

  return (
    <div style={styles.container}>

      {/* ÜST BAŞLIK */}
      <div style={styles.headerRow}>
        <h1 style={{ fontSize: 22, fontWeight: 600 }}>{t("title")}</h1>

        <div style={styles.headerBtns}>
          <button style={styles.btn} onClick={() => setShowAddModal(true)}>
            {t("new")}
          </button>

          <button style={styles.primaryBtn}>
            {t("bulkSend")}
          </button>
        </div>
      </div>

      {/* ANA KART */}
      <div style={styles.card}>

        {/* Sekme Butonları */}
        <nav style={styles.tabsRow}>
          {tabs.map((tb) => (
            <button
              key={tb.key}
              onClick={() => setActiveTab(tb.key)}
              style={{
                ...styles.tab,
                ...(activeTab === tb.key ? styles.activeTab : {}),
              }}
            >
              {tb.icon}
              <span style={{ fontSize: 14 }}>{t(tb.label)}</span>
            </button>
          ))}
        </nav>

        {/* Arama */}
        <div style={styles.searchRow}>
          <input
            style={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
          />
          <button style={styles.smallBtn}>{t("filter")}</button>
          <button style={styles.smallBtn}>{t("schedule")}</button>
        </div>

        {/* LISTE */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
        >
          {activeTab === "iletisim" ? (
            <div style={{ textAlign: "center", padding: 32 }}>
              {t("smsSoon")}
            </div>
          ) : (
            <div>
              {activeTab === "onemli" ? (
                importantAnnouncements.length === 0 ? (
                  <div style={{ textAlign: "center", padding: 32, color: "#666" }}>
                    {t("noImportant")}
                  </div>
                ) : (
                  importantAnnouncements.map((d) => (
                    <div key={d.id} style={styles.listItem}>
                      <div>
                        <h4 style={{ margin: 0, fontWeight: 600 }}>
                          {d.title}
                        </h4>
                        <p style={{ margin: "6px 0 0", fontSize: 14, color: "#555" }}>
                          {d.description}
                        </p>
                        <p style={styles.dateText}>
                          {formatDate(d.created_at)}
                        </p>
                      </div>
                      <span style={{ fontSize: 12, color: "#999" }}>
                        #{d.id.slice(0, 4)}
                      </span>
                    </div>
                  ))
                )
              ) : filteredAnnouncements.length === 0 ? (
                <div style={{ textAlign: "center", padding: 32, color: "#666" }}>
                  {t("noAnnouncements")}
                </div>
              ) : (
                filteredAnnouncements.map((d) => (
                  <div key={d.id} style={styles.listItem}>
                    <div>
                      <h4 style={{ margin: 0, fontWeight: 600 }}>
                        {d.title}
                      </h4>
                      <p style={{ margin: "6px 0 0", fontSize: 14, color: "#555" }}>
                        {d.description}
                      </p>
                      <p style={styles.dateText}>
                        {formatDate(d.created_at)}
                      </p>
                    </div>
                    <span style={{ fontSize: 12, color: "#999" }}>
                      #{d.id.slice(0, 4)}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* YENİ DUYURU MODAL */}
      {showAddModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ background: "white", padding: 20, borderRadius: 10, width: 400 }}>
            <h2>{t("newAnnouncementTitle")}</h2>

            <input
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
              placeholder={t("titlePlaceholder")}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <textarea
              style={{ width: "100%", padding: 8, height: 100 }}
              placeholder={t("descriptionPlaceholder")}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />

            <label style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
              <input
                type="checkbox"
                checked={newImportant}
                onChange={() => setNewImportant(!newImportant)}
              />
              {t("markImportant")}
            </label>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button style={styles.primaryBtn} onClick={addAnnouncement}>
                {t("publish")}
              </button>

              <button style={styles.btn} onClick={() => setShowAddModal(false)}>
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/*import React, { useState } from "react";
import { Bell, Mail, MessageCircle, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function Duyurular() {
  const [activeTab, setActiveTab] = useState("yonetici");
  const [query, setQuery] = useState("");

  const sample = {
    yonetici: [
      { id: 1, title: "Site Bakımı - Planlı Kesinti", excerpt: "23 Kasım 2025 02:00 - 05:00 arası bakım yapılacaktır." },
      { id: 2, title: "Yeni Yönetim Paneli Yayında", excerpt: "Yönetici panelinin yeni sürümü aktif hale getirilmiştir." },
    ],
    onemli: [
      { id: 3, title: "Aidat Hatırlatması", excerpt: "Aidat ödemeleri 30 Kasım 2025'e kadar yapılmalıdır." },
    ],
    etkinlik: [
      { id: 4, title: "Site Pikniği", excerpt: "1 Aralık 2025, Park alanında buluşuyoruz." },
    ],
  };

  const tabs = [
    { key: "yonetici", label: "Yönetici duyuruları", icon: <Bell size={16} /> },
    { key: "onemli", label: "Önemli bilgilendirmeler", icon: <Settings size={16} /> },
    { key: "etkinlik", label: "Etkinlik duyuruları", icon: <MessageCircle size={16} /> },
    { key: "iletisim", label: "SMS / Mail Gönderim", icon: <Mail size={16} /> },
  ];

  const styles = {
    container: { padding: 16, maxWidth: 900, margin: "0 auto", fontFamily: "Arial" },
    headerRow: { display: "flex", justifyContent: "space-between", marginBottom: 16 },
    headerBtns: { display: "flex", gap: 8 },
    btn: { padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc", background: "white", cursor: "pointer" },
    primaryBtn: { padding: "8px 12px", borderRadius: 8, background: "#2563eb", color: "white", cursor: "pointer", border: "none" },
    card: { background: "white", borderRadius: 16, padding: 16, boxShadow: "0 2px 4px rgba(0,0,0,0.08)" },
    tabsRow: { display: "flex", gap: 8, marginBottom: 16, overflowX: "auto" },
    tab: { padding: "8px 12px", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, border: "1px solid transparent" },
    activeTab: { background: "#e8f1ff", border: "1px solid #b5d0ff" },
    searchRow: { display: "flex", gap: 8, marginBottom: 16 },
    input: { flex: 1, padding: 8, borderRadius: 8, border: "1px solid #ccc" },
    smallBtn: { padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc", cursor: "pointer", background: "white" },
    listItem: { padding: 16, border: "1px solid #ddd", borderRadius: 10, display: "flex", justifyContent: "space-between", marginBottom: 8 }
  };

  const filtered = (key) => {
    return (sample[key] || []).filter((s) =>
      (s.title + " " + s.excerpt).toLowerCase().includes(query.toLowerCase())
=======
    // --------------------------------------------------
    // 4) Arama filtreleme
    // --------------------------------------------------
    const filteredAnnouncements = announcements.filter((a) =>
        (a.title + " " + a.description).toLowerCase().includes(query.toLowerCase())
>>>>>>> restore-old
    );



    const importantAnnouncements = filteredAnnouncements.filter((a) => a.is_important === true);

    // --------------------------------------------------
    // Stil
    // --------------------------------------------------
    const styles = {
        container: { padding: 16, maxWidth: 900, margin: "0 auto", fontFamily: "Arial" },
        headerRow: { display: "flex", justifyContent: "space-between", marginBottom: 16 },
        headerBtns: { display: "flex", gap: 8 },
        btn: { padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc", background: "white", cursor: "pointer" },
        primaryBtn: {
            padding: "8px 12px",
            borderRadius: 8,
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
            border: "none",
        },
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
        },
        activeTab: { background: "#e8f1ff", border: "1px solid #b5d0ff" },
        searchRow: { display: "flex", gap: 8, marginBottom: 16 },
        input: { flex: 1, padding: 8, borderRadius: 8, border: "1px solid #ccc" },
        smallBtn: { padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc", cursor: "pointer", background: "white" },
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

    // Çeviriye uygun hale getirildi
    const tabs = [
        { key: "yonetici", label: t("announcementsmanager"), icon: <Bell size={16} /> },
        { key: "onemli", label: t("announcementsimportant"), icon: <Settings size={16} /> },
        { key: "etkinlik", label: t("announcementsevents"), icon: <MessageCircle size={16} /> },
        { key: "iletisim", label: t("announcementssmsMailComing"), icon: <Mail size={16} /> }, // Bu anahtar SMS/Mail bölümünde kullanılabilir
    ];

    return (
        <div style={styles.container}>
            {/* ÜST BAŞLIK */}
            <div style={styles.headerRow}>
                <h1 style={{ fontSize: 22, fontWeight: 600 }}>{t("announcementstitle")}</h1>
                <div style={styles.headerBtns}>
                    <button style={styles.btn} onClick={() => setShowAddModal(true)}>
                        {t("new")} 
                    </button>
                    <button style={styles.primaryBtn}>{t("bulkSend")}</button>
                </div>
            </div>

            {/* ANA KART */}
            <div style={styles.card}>
                {/* Sekme Butonları */}
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

                {/* Arama */}
                <div style={styles.searchRow}>
                    <input
                        style={styles.input}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t("announcementssearch")}
                    />
                    <button style={styles.smallBtn}>{t("filter")}</button>
                    <button style={styles.smallBtn}>{t("schedule")}</button> 
                </div>

                {/* LISTE */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                >
                    {activeTab === "iletisim" ? (
                        <div style={{ textAlign: "center", padding: 32 }}>
                            {t("announcementssmsMailComing")} 
                        </div>
                    ) : (
                        <div>
                            {activeTab === "onemli" ? (
                                importantAnnouncements.length === 0 ? (
                                    <div
                                        style={{
                                            textAlign: "center",
                                            padding: 32,
                                            color: "#666",
                                        }}
                                    >
                                        {t("announcementsnoImportant")}
                                    </div>
                                ) : (
                                    importantAnnouncements.map((d) => (
                                        <div key={d.id} style={styles.listItem}>
                                            <div>
                                                <h4 style={{ margin: 0, fontWeight: 600 }}>
                                                    {d.title}
                                                </h4>
                                                <p
                                                    style={{
                                                        margin: "6px 0 0",
                                                        fontSize: 14,
                                                        color: "#555",
                                                    }}
                                                >
                                                    {d.description}
                                                </p>
                                                <p style={styles.dateText}>
                                                    {formatDate(d.created_at)}
                                                </p>
                                            </div>
                                            <span style={{ fontSize: 12, color: "#999" }}>
                                                #{d.id.slice(0, 4)}
                                            </span>
                                        </div>
                                    ))
                                )
                            ) : filteredAnnouncements.length === 0 ? (
                                <div
                                    style={{
                                        textAlign: "center",
                                        padding: 32,
                                        color: "#666",
                                    }}
                                >
                                    {t("announcementsnoAnnouncement")}
                                </div>
                            ) : (
                                filteredAnnouncements.map((d) => (
                                    <div key={d.id} style={styles.listItem}>
                                        <div>
                                            <h4 style={{ margin: 0, fontWeight: 600 }}>
                                                {d.title}
                                            </h4>
                                            <p
                                                style={{
                                                    margin: "6px 0 0",
                                                    fontSize: 14,
                                                    color: "#555",
                                                }}
                                            >
                                                {d.description}
                                            </p>
                                            <p style={styles.dateText}>
                                                {formatDate(d.created_at)}
                                            </p>
                                        </div>
                                        <span style={{ fontSize: 12, color: "#999" }}>
                                            #{d.id.slice(0, 4)}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </motion.div>
            </div>


            {/* YENİ DUYURU MODALI */}
            {showAddModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div style={{ background: "white", padding: 20, borderRadius: 10, width: 400 }}>
                        <h2>{t("newAnnouncementTitle")}</h2> 

                        <input
                            style={{ width: "100%", padding: 8, marginBottom: 10 }}
                            placeholder={t("titlePlaceholder")} 
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />

                        <textarea
                            style={{ width: "100%", padding: 8, height: 100 }}
                            placeholder={t("descriptionPlaceholder")} 
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                        />

                        <label style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
                            <input type="checkbox" checked={newImportant} onChange={() => setNewImportant(!newImportant)} />
                            {t("markImportant")} 
                        </label>

                        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                            <button style={styles.primaryBtn} onClick={addAnnouncement}>
                                {t("publish")} 
                            </button>
                            <button style={styles.btn} onClick={() => setShowAddModal(false)}>
                                {t("cancel")} 
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}