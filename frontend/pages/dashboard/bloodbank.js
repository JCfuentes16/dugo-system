import { useEffect } from "react";
import { useRouter } from "next/router";

export default function BloodBankDashboard() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "bloodbank") {
      router.push("/");
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Blood Bank Admin Dashboard</h1>
      <p>Welcome, {localStorage.getItem("email")}!</p>
      <p>Manage blood inventory, donors, and hospitals from this panel.</p>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  title: { color: "#2E7D32", fontSize: "24px", marginBottom: "10px" },
};
