import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, Title);
function MainPanel() {
    const gelirGiderData = {
        labels: ["Gelir", "Gider"],
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
            title: { display: true, text: "", font: { size: 8 } },
        },
    };

    // Aidat Pie chart verisi
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

    // Enerji Pie chart verisi
    const enerjiData = {
        labels: ["Elektrik", "Su", "Doğalgaz"],
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
        chartPlaceholder: {
            height: "200px",
            background: "#e0e0e0",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#555",
        },
    };

    return (
        <div style={styles.dashboardContainer}>
            <h1>Site Yönetimi</h1>

            <div style={styles.cardsContainer}>
                <div style={styles.card}>
                    <h2>Daire Sayısı</h2>
                    <p>120</p>
                </div>

                <div style={styles.card}>
                    <h2>Borç / Tahsilat Özetleri</h2>
                    <p>Borç: 50.000₺</p>
                    <p>Tahsilat: 40.000₺</p>
                </div>

                <div style={styles.card}>
                    <h2>Son Duyurular</h2>
                    <ul>
                        <li>Yangın tatbikatı 25 Kasım’da yapılacak</li>
                        <li>Su kesintisi 28 Kasım’da</li>
                    </ul>
                </div>

                <div style={styles.card}>
                    <h2>Aktif Talepler</h2>
                    <p>Toplam: 8</p>
                </div>
            </div>

            <div style={styles.chartsContainer}>
                <div style={styles.chartCard}>
                    <h2>Gelir – Gider</h2>
                    <Pie data={gelirGiderData} options={{...pieOptions, plugins: {title: {display: true, text: "Gelir – Gider"}}}} />
                </div>

                <div style={styles.chartCard}>
                    <h2>Aidat Kullanımı</h2>
                    <Pie data={aidatData} options={{...pieOptions, plugins: {title: {display: true, text: "Aidat Kullanımı"}}}} />
                </div>

                <div style={styles.chartCard}>
                    <h2>Enerji Kullanımı</h2>
                    <Pie data={enerjiData} options={{ ...pieOptions, plugins: { title: { display: true, text: "Enerji Kullanımı" } } }} />
                </div>
            </div>
        </div>
    );
}

export default MainPanel;