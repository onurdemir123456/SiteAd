import { useNavigate } from "react-router-dom";
import supabase from "../helper/supabaseClient";
import React, { useState } from "react";
import loginBackgroundImage from "../assets/loginBackground.jpg";
import { useLanguage } from "../context/LanguageContext";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { changeLanguage  } = useLanguage();

  const fetchLanguage = async (userId) => {
    const { data, error } = await supabase
      .from("settings")
      .select("language")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Dil çekilirken hata:", error.message);
    } else if (data) {
      changeLanguage (data.language); // global context güncelleniyor
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setEmail("");
      setPassword("");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Kullanıcı rolünü çek
    const { data: profileData } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    // Kullanıcıya özel dili çek
    await fetchLanguage(user.id);

    // Yönlendirme
    if (profileData.role === "admin") {
      navigate("/adminPanel");
    } else {
      navigate("/dashboard");
    }
  };

  const style = { backgroundImage: `url(${loginBackgroundImage})` };

  return (
    <div id="body" style={style}>
      <div className="login-container">
        <h2>Giriş</h2>
        {message && <span>{message}</span>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="e-postanız"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="şifreniz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Giriş</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

