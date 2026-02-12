export default function MetricCard({ label, value }) {
  return (
    <div style={styles.card}>
      <div style={{ opacity: 0.7 }}>{label}</div>
      <h2>{value}</h2>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    minWidth: 160,
  },
};
