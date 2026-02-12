import { exec } from 'child_process';
import { Store } from '../models/store';

export async function provisionStore(store: Store) {
  const chart =
    store.engine === 'woocommerce'
      ? './charts/woocommerce-store'
      : './charts/medusa-store';

  return new Promise<void>((resolve, reject) => {
    const cmd = `
      helm upgrade --install ${store.name} ${chart} \
        --namespace ${store.namespace} \
        --create-namespace \
        --values values-local.yaml
    `;

    exec(cmd, { timeout: 10 * 60 * 1000 }, (err, stdout, stderr) => {
      if (err) {
        reject(stderr || err.message);
      } else {
        resolve();
      }
    });
  });
}

export async function deleteStore(store: Store) {
  return new Promise<void>((resolve) => {
    exec(
      `helm uninstall ${store.name} -n ${store.namespace}`,
      () => resolve()
    );
  });
}

