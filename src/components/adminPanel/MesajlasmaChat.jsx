import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { q } from "framer-motion/client";

function MesajlasmaChat() {
  const { t } = useLanguage();

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
    chatBox: {
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "10px",
      height: "300px",
      overflowY: "auto",
      marginBottom: "10px",
      backgroundColor: "#f9f9f9",
    },
    message: {
      padding: "6px 10px",
      margin: "4px 0",
      borderRadius: "8px",
      maxWidth: "70%",
      wordBreak: "break-word",
    },
    adminMessage: {
      backgroundColor: "#4caf50",
      color: "#fff",
      alignSelf: "flex-end",
    },
    userMessage: {
      backgroundColor: "#e0e0e0",
      color: "#000",
      alignSelf: "flex-start",
    },
    inputContainer: {
      display: "flex",
      marginTop: "10px",
    },
    input: {
      flex: 1,
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "14px",
      marginRight: "10px",
    },
    btn: {
      padding: "8px 12px",
      background: "#4caf50",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      color: "#fff",
      fontSize: "14px",
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
  };

  const [messages, setMessages] = useState([
    { text: t("chatwelcomeMessage"), sender: "bot" },
    { text: t("chatsampleQuestion"), sender: "user" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { text: newMessage, sender: "admin" }]);
    setNewMessage("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{t("chattitle")}</h2>

      {/* Sohbet Kutusu */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("chatchatSection")}</h3>
        <div style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                ...(msg.sender === "admin"
                  ? styles.adminMessage
                  : msg.sender === "user"
                  ? styles.userMessage
                  : { backgroundColor: "#ffd966", color: "#000" }),
                display: "flex",
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t("chatplaceholder")}
          />
          <button style={styles.btn} onClick={handleSend}>
            {t("chatsend")}
          </button>
        </div>
      </div>

      {/* Duyuruların Okunma Durumu */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("chatannouncementReadStatus")}</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{t("chatannouncement")}</th>
              <th style={styles.th}>{t("chatsendDate")}</th>
              <th style={styles.th}>{t("chatreadCount")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>{t("chatann1Title")}</td>
              <td style={styles.td}>01/11/2025</td>
              <td style={styles.td}>12 / 15</td>
            </tr>
            <tr>
              <td style={styles.td}>{t("chatann2Title")}</td>
              <td style={styles.td}>15/10/2025</td>
              <td style={styles.td}>15 / 15</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MesajlasmaChat;