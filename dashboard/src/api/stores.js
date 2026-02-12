let stores = [];

export async function fetchStores() {
  return new Promise((res) =>
    setTimeout(() => res([...stores]), 500)
  );
}

export async function createStore() {
  const id = Date.now();
  const store = {
    id,
    name: `store-${id}`,
    status: "CREATING",
    logs: ["Provisioning started..."],
  };
  stores.push(store);

  // simulate Kubernetes lifecycle
  setTimeout(() => {
    store.status = "READY";
    store.logs.push("WordPress service ready");
  }, 3000);

  return store;
}

export async function deleteStore(id) {
  stores = stores.filter((s) => s.id !== id);
}
