import { useEffect } from "react";
import { useRouter } from "next/router";

export default function DonorDashboard() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "donor") {
      router.push("/"); // balik sa login kung dili donor
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Donor Dashboard</h1>
      <p>Welcome, {localStorage.getItem("email")}!</p>
      <p>This is your dashboard for managing blood donations.</p>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  title: { color: "#B71C1C", fontSize: "24px", marginBottom: "10px" },
};
