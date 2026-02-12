import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

export const coreV1 = kc.makeApiClient(k8s.CoreV1Api);

export async function namespaceExists(name: string): Promise<boolean> {
  try {
    await coreV1.readNamespace(name);
    return true;
  } catch (err: any) {
    if (err?.response?.statusCode === 404) return false;
    throw err;
  }
}

export async function createNamespace(name: string) {
  await coreV1.createNamespace({
    metadata: { name }
  });
}

export async function deleteNamespace(name: string) {
  await coreV1.deleteNamespace(name);
}


