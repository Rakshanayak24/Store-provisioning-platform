import { useEffect, useState } from "react";
import { fetchStores, createStore, deleteStore } from "../api/stores";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MetricCard from "../components/MetricCard";
import StoreCard from "../components/StoreCard";

export default function Dashboard() {
  const [stores, setStores] = useState([]);

  async function load() {
    setStores(await fetchStores());
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <main style={{ padding: 30, width: "100%" }}>
        <Header onCreate={async () => {
          await createStore();
          load();
        }} />

        <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
          <MetricCard label="Total Stores" value={stores.length} />
          <MetricCard label="Ready" value={stores.filter(s => s.status === "READY").length} />
          <MetricCard label="Provisioning" value={stores.filter(s => s.status !== "READY").length} />
        </div>

        {stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            onDelete={async (id) => {
              await deleteStore(id);
              load();
            }}
          />
        ))}
      </main>
    </div>
  );
}
