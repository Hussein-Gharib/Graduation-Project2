import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    if (!email || !password) {
      setMsg("Please fill in the email and password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:10000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        setMsg(text || "Login failed.");
        return;
      }

      const data = await res.json();
      if (!data.token) {
        setMsg("The server did not send a token.");
        return;
      }

    
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user || {}));

    
      navigate("/home", { replace: true });
    } catch (err) {
      console.error(err);
      setMsg("Error connecting to the server.");
    }
  }

  return (
    <div className="container5">
      <h2>Sign in</h2>

      {msg && <div className="MSG5">{msg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="Email5">
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8 }}
            placeholder="you@example.com"
          />
        </div>

        <div className="password5">
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8 }}
            placeholder="password"
          />
        </div>

        <button type="submit" className="submit5">
          Login
        </button>
      </form>

      <p>Don’t have an account?</p>
      <Link to="/register">Create account</Link>
    </div>
  );
}
