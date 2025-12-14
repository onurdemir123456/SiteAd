import React, { useState, useEffect } from "react";
import supabase from "../../helper/supabaseClient";
import { useLanguage } from "../../context/LanguageContext";

function Ayarlar() {
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
    table: { width: "100%", marginTop: "10px", borderCollapse: "collapse" },
    th: {
      padding: "10px 12px",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#f5f5f5",
    },
    td: { padding: "10px 12px", borderBottom: "1px solid #ddd" },
    input: {
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "100%",
      marginBottom: "10px",
    },
    select: {
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "100%",
    },
    btn: {
      padding: "8px 12px",
      background: "#4caf50",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      color: "#fff",
      marginTop: "5px",
    },
  };

  const [settings, setSettings] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const { changeLanguage, t } = useLanguage();

  // ----------------------------------------------------
  //  GİRİŞ YAPAN KULLANICI VE SETTINGS YÜKLEME
  // ----------------------------------------------------
  useEffect(() => {
    const load = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData?.user;
      setUser(currentUser);

      if (!currentUser) {
        setLoading(false);
        return;
      }

      const { data: settingsData } = await supabase
        .from("settings")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      setSettings(settingsData);

      const { data: usersData } = await supabase.from("profiles").select("*");

      setUsers(usersData.map((u) => ({ ...u, role: u.role || "user" })));

      setLoading(false);
    };

    load();
  }, []);

  if (loading || !settings) return <p>{t("loading")}</p>;

  // ----------------------------------------------------
  //  ROL GÜNCELLE
  // ----------------------------------------------------
  const updateUserRole = async (userId, role) => {
    await supabase.from("profiles").update({ role }).eq("id", userId);
    alert(t("roleUpdated"));
  };

  // ----------------------------------------------------
  //  AYAR KAYDETME FONKSİYONLARI
  // ----------------------------------------------------
  const saveSiteSettings = async () => {
    await supabase
      .from("settings")
      .update({
        site_name: settings.site_name,
        site_url: settings.site_url,
      })
      .eq("id", settings.id);

    alert(t("siteUpdated"));
  };

  const saveNotificationSettings = async () => {
    await supabase
      .from("settings")
      .update({
        allow_email: settings.allow_email,
        allow_sms: settings.allow_sms,
        allow_push: settings.allow_push,
      })
      .eq("id", settings.id);

    alert(t("notificationsUpdated"));
  };

  const saveThemeLanguage = async () => {
    await supabase
      .from("settings")
      .update({
        theme: settings.theme,
        language: settings.language,
      })
      .eq("id", settings.id);

    changeLanguage(settings.language);

    alert(t("themeLanguageUpdated"));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{t("settings")}</h2>

      {/* SITE AYARLARI */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("siteSettings")}</h3>

        <input
          style={styles.input}
          value={settings.site_name || ""}
          onChange={(e) =>
            setSettings({ ...settings, site_name: e.target.value })
          }
          placeholder={t("siteName")}
        />

        <input
          style={styles.input}
          value={settings.site_url || ""}
          onChange={(e) =>
            setSettings({ ...settings, site_url: e.target.value })
          }
          placeholder={t("siteUrl")}
        />

        <button style={styles.btn} onClick={saveSiteSettings}>
          {t("save")}
        </button>
      </div>

      {/* BİLDİRİMLER */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("notificationSettings")}</h3>

        <label>
          <input
            type="checkbox"
            checked={!!settings.allow_email}
            onChange={(e) =>
              setSettings({ ...settings, allow_email: e.target.checked })
            }
          />{" "}
          {t("emailNotifications")}
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={!!settings.allow_sms}
            onChange={(e) =>
              setSettings({ ...settings, allow_sms: e.target.checked })
            }
          />{" "}
          {t("smsNotifications")}
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={!!settings.allow_push}
            onChange={(e) =>
              setSettings({ ...settings, allow_push: e.target.checked })
            }
          />{" "}
          {t("pushNotifications")}
        </label>

        <br />

        <button style={styles.btn} onClick={saveNotificationSettings}>
          {t("save")}
        </button>
      </div>

      {/* TEMA / DİL */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t("themeLanguage")}</h3>

        <label>{t("theme")}:</label>
        <select
          style={styles.select}
          value={settings.theme || "light"}

          onChange={(e) =>
            setSettings({ ...settings, theme: e.target.value })
          }
        >
          <option value="light">{t("themeLight")}</option>
          <option value="dark">{t("themeDark")}</option>
        </select>

        <label>{t("language")}:</label>
        <select
          style={styles.select}
          value={settings.language || "tr"}

          onChange={(e) =>
            setSettings({ ...settings, language: e.target.value })
          }
        >
          <option value="tr">{t("languageTr")}</option>
          <option value="en">{t("languageEn")}</option>
        </select>

        <button style={styles.btn} onClick={saveThemeLanguage}>
          {t("save")}
        </button>
      </div>
    </div>
  );
}

export default Ayarlar;
