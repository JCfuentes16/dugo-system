import { useEffect } from "react";
import { useRouter } from "next/router";

export default function HospitalDashboard() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "hospital") {
      router.push("/");
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hospital Dashboard</h1>
      <p>Welcome, {localStorage.getItem("email")}!</p>
      <p>Here you can request and manage blood donations for your hospital.</p>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  title: { color: "#1565C0", fontSize: "24px", marginBottom: "10px" },
};
