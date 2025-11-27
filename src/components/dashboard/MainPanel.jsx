// UserDashboard.jsx
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from "chart.js";
import supabase from "../../helper/supabaseClient";


ChartJS.register(ArcElement, Tooltip, Legend, Title);


function UserDashboard() {
    const [activeCount, setActiveCount] = useState(0);

    const fetchCounts = async () => {
        const { data: s } = await supabase.from("sikayetler").select("*");
        const { data: a } = await supabase.from("arizalar").select("*");
        const { data: t } = await supabase.from("talepler").select("*");

        const total =
            s.filter(x => x.durum === "Açık").length +
            a.filter(x => x.durum === "Açık").length +
            t.filter(x => x.durum === "Açık").length;

        setActiveCount(total);
    };
    useEffect(() => {
        fetchCounts();
    }, []);


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

                <div style={styles.card}>
                    <h2>Son Duyurular</h2>
                    <ul>
                        <li>Su kesintisi 28 Kasım’da</li>
                        <li>Yangın tatbikatı 25 Kasım’da</li>
                    </ul>
                </div>
            </div>

            <div style={styles.chartsContainer}>
                <div style={styles.chartCard}>
                    <h2>Aidat Kullanımı</h2>
                    <Pie
                        data={aidatData}
                        options={{ ...pieOptions, plugins: { title: { display: true, text: "Aidat Kullanımı" } } }}
                    />
                </div>

                <div style={styles.chartCard}>
                    <h2>Enerji Kullanımı</h2>
                    <Pie
                        data={enerjiData}
                        options={{ ...pieOptions, plugins: { title: { display: true, text: "Enerji Kullanımı" } } }}
                    />
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
