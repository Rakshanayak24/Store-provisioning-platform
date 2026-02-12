export default function StoreCard({ store, onDelete }) {
  const portForwardCmd = `kubectl port-forward -n ${store.id} svc/wordpress 8080:80`;

  function copyCmd() {
    navigator.clipboard.writeText(portForwardCmd);
    alert("Port-forward command copied");
  }

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <strong>{store.id}</strong>
          <div style={styles.status}>{store.status}</div>
        </div>
        <button onClick={() => onDelete(store.id)} style={styles.delete}>
          Delete
        </button>
      </div>

      {/* LOCAL MODE */}
      {!store.url && (
        <div style={styles.localBox}>
          <div style={styles.cmd}>{portForwardCmd}</div>
          <button onClick={copyCmd} style={styles.copy}>Copy</button>

          <ol style={styles.steps}>
            <li>Run command in terminal</li>
            <li>Keep terminal running</li>
            <li>
              Open{" "}
              <a href="http://localhost:8080" target="_blank">
                http://localhost:8080
              </a>
            </li>
          </ol>
        </div>
      )}


      {/* INGRESS MODE */}
      {store.url && (
        <a href={store.url} target="_blank" style={styles.open}>
          🌐 Open Store
        </a>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  status: {
    fontSize: "12px",
    color: "#10b981",
  },
  delete: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
  },
  localBox: {
    background: "#f9fafb",
    padding: "12px",
    borderRadius: "10px",
    marginTop: "10px",
  },
  cmd: {
    fontFamily: "monospace",
    fontSize: "13px",
    background: "#111827",
    color: "#e5e7eb",
    padding: "8px",
    borderRadius: "6px",
  },
  copy: {
    marginTop: "6px",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    cursor: "pointer",
  },
  steps: {
    marginTop: "8px",
    fontSize: "13px",
    color: "#374151",
  },
  open: {
    display: "inline-block",
    marginTop: "10px",
    textDecoration: "none",
    fontWeight: "600",
  },
};


