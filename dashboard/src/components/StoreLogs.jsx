export default function StoreLogs({ logs }) {
  return (
    <div className="mt-3 bg-black p-3 rounded text-xs text-green-400">
      {logs.map((log, i) => (
        <div key={i}>• {log}</div>
      ))}
    </div>
  );
}
