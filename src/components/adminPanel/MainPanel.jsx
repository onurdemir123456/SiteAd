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
import { useLanguage } from "../../context/LanguageContext";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function MainPanel() {
    // 'language' değişkeni, formatDate fonksiyonu için LanguageContext'ten alındı.
    const { t, language } = useLanguage(); 
    const [activeCount, setActiveCount] = useState(0);
    const [announcements, setAnnouncements] = useState([]);

    // Modal sistemleri
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
        const { data: req } = await supabase.from("talepler").select("*");

        // Not: Durum kontrolü için DB'deki Türkçe değeri kullanın.
        // Bu "Açık" durumu, veritabanı yapınıza göre çevrilmemelidir.
        const openStatus = "Açık"; 

        const total =
            s.filter((x) => x.durum === openStatus).length +
            a.filter((x) => x.durum === openStatus).length +
            req.filter((x) => x.durum === openStatus).length;

        setActiveCount(total);
    };

    useEffect(() => {
        fetchAnnouncements();
        fetchCounts();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        // Dil bağlamına göre yerel kodu belirleme
        const localeCode = language === "tr" ? "tr-TR" : "en-US"; 
        
        const day = date.getDate();
        // Ay adını dil bağlamına uygun almak için toLocaleString kullanıldı
        const month = date.toLocaleString(localeCode, { month: "long" }); 
        const year = date.getFullYear();
        
        return `${day} ${month} ${year}`;
    };

    // Grafikler - Labels çevrildi
    const gelirGiderData = {
        // Anahtar: mainincomeExpense (Başlık), mainincome, mainexpense (Veri Etiketleri)
        labels: [t("mainincome"), t("mainexpense")],
        datasets: [
            {
                data: [75000, 50000],
                backgroundColor: ["#4caf50", "#f44336"],
                hoverOffset: 10,
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
            // Title metni aşağıda her grafikte ayrı ayrı ayarlanmıştır.
            title: { display: true, text: "", font: { size: 8 } },
        },
    };

    const aidatData = {
        // Anahtar: mainpaid, mainunpaid
        labels: [t("mainpaid"), t("mainunpaid")],
        datasets: [
            {
                data: [90, 30],
                backgroundColor: ["#2196f3", "#ff9800"],
                hoverOffset: 10,
            },
        ],
    };

    const enerjiData = {
        // Anahtar: mainelectricity, mainwater, maingas
        labels: [t("mainelectricity"), t("mainwater"), t("maingas")],
        datasets: [
            {
                data: [4000, 1500, 2000],
                backgroundColor: ["#ffc107", "#00bcd4", "#8bc34a"],
                hoverOffset: 10,
            },
        ],
    };

    const styles = {
        dashboardContainer: {
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

        // Modal stilleri değişmedi...
        modalOverlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
        },
    };

    return (
        <div style={styles.dashboardContainer}>
            {/* Genel Başlık */}
            <h1>{t("SiteYönetimPaneli")}</h1> 

            <div style={styles.cardsContainer}>
                {/* Daire Sayısı */}
                <div style={styles.card}>
                    <h2>{t("mainapartmentCount")}</h2>
                    <p>120</p>
                </div>

                {/* Borç / Tahsilat Özeti */}
                <div style={styles.card}>
                    <h2>{t("maindebtSummary")}</h2>
                    <p>{t("maindebt")}: 50.000₺</p>
                    <p>{t("maincollection")}: 40.000₺</p>
                </div>

                {/* Son Duyurular */}
                <div style={styles.card}>
                    <h2>{t("mainlatestAnnouncements")}</h2>
                    <div
                        style={{
                            maxHeight: "150px",
                            overflowY: "auto",
                            paddingRight: "5px",
                        }}
                    >
                        {announcements.length === 0 && <p>{t("mainnoAnnouncements")}</p>}

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

                {/* Aktif Talepler */}
                <div style={styles.card}>
                    <h2>{t("mainactiveRequests")}</h2>
                    <p>{t("maintotal")}: {activeCount}</p>
                </div>
            </div>

            {/* ---- MODAL ---- */}
            {showModal && selectedAnnouncement && (
                <div
                    style={styles.modalOverlay}
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
                                t("mainnoContent")} 
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
                            {t("mainclose")} 
                        </button>
                    </div>
                </div>
            )}

            <div style={styles.chartsContainer}>
                {/* Gelir-Gider Grafiği */}
                <div style={styles.chartCard}>
                    <h2>{t("mainincomeExpense")}</h2>
                    <Pie
                        data={gelirGiderData}
                        options={{
                            ...pieOptions,
                            plugins: {
                                legend: { position: "bottom" },
                                title: { display: true, text: t("mainincomeExpense") },
                            },
                        }}
                    />
                </div>

                {/* Aidat Kullanımı Grafiği */}
                <div style={styles.chartCard}>
                    <h2>{t("mainaidatUsage")}</h2>
                    <Pie
                        data={aidatData}
                        options={{
                            ...pieOptions,
                            plugins: {
                                legend: { position: "bottom" },
                                title: {
                                    display: true,
                                    text: t("mainaidatUsage"),
                                },
                            },
                        }}
                    />
                </div>

                {/* Enerji Tüketimi Grafiği */}
                <div style={styles.chartCard}>
                    <h2>{t("mainenergyUsage")}</h2>
                    <Pie
                        data={enerjiData}
                        options={{
                            ...pieOptions,
                            plugins: {
                                legend: { position: "bottom" },
                                title: {
                                    display: true,
                                    text: t("mainenergyUsage"),
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default MainPanel;