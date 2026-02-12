export default function CommandBox({ command }) {
  const copy = () => {
    navigator.clipboard.writeText(command);
    alert("Command copied");
  };

  return (
    <div style={styles.box}>
      <code style={styles.code}>{command}</code>
      <button style={styles.copyBtn} onClick={copy}>
        Copy
      </button>
    </div>
  );
}

const styles = {
  box: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#020617",
    border: "1px solid #1e293b",
    padding: "0.75rem",
    borderRadius: "8px",
    marginTop: "0.5rem",
  },
  code: {
    color: "#93c5fd",
    fontSize: "0.85rem",
    overflowX: "auto",
  },
  copyBtn: {
    background: "#334155",
    color: "white",
    padding: "0.4rem 0.6rem",
    borderRadius: "6px",
    fontSize: "0.8rem",
  },
};
