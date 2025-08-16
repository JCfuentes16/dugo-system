import { useState } from "react";
import Link from "next/link";   // ✅ importante ni

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {/* ✅ kini ang clickable link */}
        <p style={styles.linkText}>
          Don’t have an account?{" "}
          <Link href="register/[type].js" style={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" },
  card: { background: "#fff", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px", textAlign: "center" },
  title: { color: "#B71C1C", fontSize: "22px", fontWeight: "bold", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "16px" },
  button: { backgroundColor: "#D50000", color: "white", padding: "12px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" },
  linkText: { marginTop: "16px", fontSize: "14px", color: "#333" },
  link: { color: "#D50000", fontWeight: "bold", textDecoration: "none", cursor: "pointer" }, // ✅ add cursor pointer
};
