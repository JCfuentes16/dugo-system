import Link from "next/link";

export default function RegisterChoose() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", padding: "24px", borderRadius: "8px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h2 style={{ color: "#B71C1C", marginBottom: "20px" }}>Select Account Type</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link href="/register/registration?type=donor"><button style={btnStyle}>Donor</button></Link>
          <Link href="/register/registration?type=hospital"><button style={btnStyle}>Hospital</button></Link>
          <Link href="/register/registration?type=bloodbank"><button style={btnStyle}>Blood Bank</button></Link>
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  backgroundColor: "#D50000",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};
