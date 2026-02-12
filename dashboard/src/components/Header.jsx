export default function Header({ onCreate }) {
  return (
    <div style={styles.header}>
      <div>
        <h1>🛒 Store Platform</h1>
        <p style={{ opacity: 0.7 }}>
          Kubernetes-powered WooCommerce provisioning
        </p>
      </div>

      <button style={styles.button} onClick={onCreate}>
        + Create Store
      </button>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  button: {
    padding: "10px 16px",
    borderRadius: 6,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 600,
  },
};
