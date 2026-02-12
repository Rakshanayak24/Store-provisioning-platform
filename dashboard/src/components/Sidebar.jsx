export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <h2 style={styles.logo}>Platform</h2>
      {["Dashboard", "Stores", "Metrics", "Settings"].map((item) => (
        <div key={item} style={styles.item}>{item}</div>
      ))}
    </aside>
  );
}

const styles = {
  sidebar: {
    width: 220,
    background: "#0f172a",
    color: "#fff",
    padding: 20,
    height: "100vh",
  },
  logo: {
    marginBottom: 30,
  },
  item: {
    padding: "10px 0",
    opacity: 0.85,
  },
};

