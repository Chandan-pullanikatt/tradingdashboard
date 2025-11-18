import { useState } from "react";
import { Card, PrimaryButton, SecondaryButton } from "../components/StyledCard";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await fetch("http://13.53.126.197:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Invalid credentials");
        return;
      }
      localStorage.setItem("token", data.token);
      alert("Login successful");
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      alert("Network error. Check backend connection.");
    }
  };

  // DEMO LOGIN
  const handleDemoLogin = async () => {
    try {
      const res = await fetch("http://13.53.126.197:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password: "password123" }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Demo login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      alert("Logged in as Demo User!");
      window.location.href = "/";
    } catch (err) {
      console.error("Demo login error:", err);
      alert("Network error. Check backend connection.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto" }}>
      <Card>
        <h2 style={{
          color: "#24292F",
          fontWeight: 700,
          fontSize: "2rem",
          marginBottom: "2rem"
        }}>
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#24292F" }}>Username</label>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "10px",
                border: "1px solid #E1E4E8",
                marginTop: "0.5rem",
                background: "#F6F8FA",
                color: "#24292F"
              }}
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#24292F" }}>Password</label>
            <input
              type="password"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "10px",
                border: "1px solid #E1E4E8",
                marginTop: "0.5rem",
                background: "#F6F8FA",
                color: "#24292F"
              }}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <PrimaryButton type="submit" style={{ width: "100%", marginBottom: "1rem" }}>
            Login
          </PrimaryButton>
        </form>
        <PrimaryButton style={{ width: "100%" }} onClick={handleDemoLogin}>
          Login with Demo User
        </PrimaryButton>
      </Card>
    </div>
  );
}
