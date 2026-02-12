export type StoreStatus = 'PROVISIONING' | 'READY' | 'FAILED';

export type StoreEngine = 'woocommerce' | 'medusa';

export interface Store {
  id: string;
  name: string;
  engine: StoreEngine;
  namespace: string;
  status: StoreStatus;
  url?: string;
  createdAt: Date;
  error?: string;
}

