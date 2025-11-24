import React, { useState } from "react";

function MesajlasmaChat() {
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
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    message: {
      padding: "6px 10px",
      borderRadius: "8px",
      maxWidth: "70%",
      wordBreak: "break-word",
    },
    botMessage: {
      backgroundColor: "#ffd966",
      color: "#000",
      alignSelf: "flex-start",
    },
    userMessage: {
      backgroundColor: "#e0e0e0",
      color: "#000",
      alignSelf: "flex-end",
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
    { text: "Merhaba! Site ile ilgili sorularınızı buradan sorabilirsiniz.", sender: "bot" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { text: newMessage, sender: "user" }]);
    setNewMessage("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Mesajlaşma / Chat</h2>

      {/* Sohbet Kutusu */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Sohbet</h3>
        <div style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                ...(msg.sender === "user" ? styles.userMessage : styles.botMessage),
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
            placeholder="Mesaj yaz..."
          />
          <button style={styles.btn} onClick={handleSend}>
            Gönder
          </button>
        </div>
      </div>

      {/* Duyurular */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Duyurular</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Duyuru</th>
              <th style={styles.th}>Gönderim Tarihi</th>
              <th style={styles.th}>Okundu / Toplam</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Aidat Ödemesi Hatırlatma</td>
              <td style={styles.td}>01/11/2025</td>
              <td style={styles.td}>12 / 15</td>
            </tr>
            <tr>
              <td style={styles.td}>Site Kuralları Güncelleme</td>
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
