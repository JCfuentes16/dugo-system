import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // ✅ Save token & role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", email);

        setMessage("Login successful!");

        // ✅ Redirect to role-based dashboard
        if (data.role === "donor") router.push("/dashboard/donor");
        if (data.role === "hospital") router.push("/dashboard/hospital");
        if (data.role === "bloodbank") router.push("/dashboard/bloodbank");
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>DUGO System</h1>
        <h2 style={styles.subtitle}>Login</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          >
            <option value="donor">Donor</option>
            <option value="hospital">Hospital</option>
            <option value="bloodbank">Blood Bank (Admin)</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "10px", color: "#D50000" }}>{message}</p>
        )}

        <p style={styles.linkText}>
          Don’t have an account?{" "}
          <Link href="/register/choose" style={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  card: {
    background: "#fff",
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    color: "#B71C1C",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  subtitle: { color: "#333", fontSize: "20px", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#D50000",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  linkText: { marginTop: "16px", fontSize: "14px", color: "#333" },
  link: { color: "#D50000", fontWeight: "bold", textDecoration: "none" },
};
