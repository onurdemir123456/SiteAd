import { useNavigate } from 'react-router-dom';
import supabase from '../helper/supabaseClient'
import React, { useState } from 'react'
import loginBackgroundImage from "../assets/loginBackground.jpg"
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            setMessage(error.message);
            setEmail("");
            setPassword("");
            return;
        }
        if (data) {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return
            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single()
            if (data.role === 'admin') {
                navigate("/adminPanel");
            }
            else {
                navigate("/dashboard");
            }
            return null;
        }
    };
    const style = { backgroundImage: `url(${loginBackgroundImage})`}
    return (<div id='body' style={style}>
    <div className='login-container'>
      <h2>Giriş</h2>
      <br></br>
      {message && <span>{message}</span>}
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <input onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder='e-postanız'
            required />
        </div>
        <div className='input-group'>
          <input onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder='şifreniz'
            required />
        </div>
        <button type="submit">Giriş</button>
      </form>
    </div>
  </div>);
}
export default Login
