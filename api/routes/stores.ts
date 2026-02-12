import express from 'express';
import { provisionStore, deleteStore } from '../services/provisioner';
import { Store } from '../models/store';

const router = express.Router();
const stores: Store[] = [];

router.get('/', (_, res) => {
  res.json(stores);
});

router.post('/', async (req, res) => {
  const { engine = 'woocommerce' } = req.body || {};


  const id = `store-${Date.now()}`;
  const namespace = id;

  const store: Store = {
    id,
    name: id,
    engine,
    namespace,
    status: 'PROVISIONING',
    createdAt: new Date()
  };

  stores.push(store);

  provisionStore(store)
    .then(() => {
      store.status = 'READY';
      store.url = `http://${store.name}.127.0.0.1.nip.io`;
    })
    .catch((err) => {
      store.status = 'FAILED';
      store.error = err?.toString();
    });

  res.status(202).json(store);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const store = stores.find(s => s.id === id);

  if (!store) {
    return res.status(404).json({ error: 'Store not found' });
  }

  await deleteStore(store);

  const index = stores.findIndex(s => s.id === id);
  stores.splice(index, 1);

  res.sendStatus(204);
});

export default router;
