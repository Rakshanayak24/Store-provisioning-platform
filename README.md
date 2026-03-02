#Store Provisioning Platform

This project implements a Kubernetes-native multi-tenant store provisioning platform.

The system runs locally on Kubernetes (Minikube) and is designed so the exact same Helm charts can be deployed to a production-like VPS (e.g., k3s) using configuration changes only.

The platform allows users to create and delete isolated ecommerce stores on demand.

---

# 1. System Overview

## High-Level Architecture

The system consists of four primary components:

1. **React Dashboard**
   - UI for managing stores
   - Displays store status, URLs, and timestamps
   - Allows store creation and deletion

2. **Node.js API**
   - Handles store lifecycle requests
   - Triggers Helm-based provisioning
   - Tracks provisioning state
   - Ensures idempotent operations

3. **Helm-Based Provisioning Layer**
   - Deploys per-store Kubernetes resources
   - Uses namespace-per-store isolation
   - Supports local and production via values files

4. **Kubernetes Cluster**
   - Source of truth
   - Runs store workloads
   - Provides isolation, persistence, and networking

---

# 2. Store Architecture (Per Store)

Each provisioned store includes:

- Dedicated Kubernetes namespace
- WordPress + WooCommerce (Deployment)
- MySQL (StatefulSet + PersistentVolumeClaim)
- Service (ClusterIP)
- Ingress (for production-like setup)
- Secrets (database credentials)
- ResourceQuota and LimitRange (guardrails)

Namespace-per-store ensures strong isolation and clean teardown.

---

# 3. Local Development Setup (Minikube)

## Prerequisites

- Docker Desktop (running)
- Node.js v18+
- kubectl
- Helm
- Minikube
- Git

---
##  Deployment Commands
### 1️ Start Kubernetes (Minikube)
```bash
minikube start
kubectl config use-context minikube
kubectl get nodes
```

### 2 Install WooCommerce Store using Helm
```bash
cd charts/woocommerce-store
helm install woo-store . -n woo-store --create-namespace
```
Verify installation:
```bash
helm list -A
kubectl get pods -n woo-store
```

### 3 Check Services & Storage
```bash
kubectl get svc -n woo-store
kubectl get pvc -n woo-store
```
### 4️ Apply Resource Governance (Important for Multi-Tenancy)
Create LimitRange
```bash
kubectl apply -f limitrange.yaml
```
Verify:
```bash
kubectl get limitrange -n woo-store
```
Create ResourceQuota
```bash
kubectl apply -f resourcequota.yaml
```
Verify:
```bash
kubectl get resourcequota -n woo-store
```
### 5️ Access the Store
Port forward WordPress service:
```bash
kubectl port-forward -n woo-store svc/wordpress 8080:80
```
Open in browser:
```makefile
http://localhost:8080
or
http://localhost:8080/wp-admin
```

### 6️ Upgrade Store (Idempotent Reconciliation)
```bash
helm upgrade woo-store . -n woo-store
```
### Uninstall Store (Clean Teardown)
```bash
helm uninstall woo-store -n woo-store
kubectl delete namespace woo-store
````
## 🛠 Run Provisioning API
```bash
cd api
npm install
npm run dev
```
API runs on:
```makefile
http://localhost:3000
```
## 💻 Run Admin Dashboard
```bash
cd dashboard
npm install
npm run dev
```
Dashboard runs on:
```makefile
http://localhost:5173
```

## 7. Definition of Done – Placing an Order (WooCommerce)
To validate provisioning:
 1. Complete WordPress setup
 2. Activate WooCommerce
 3. Add a product
 4. Add product to cart
 5. Checkout using Cash on Delivery
 6. Confirm order appears in WooCommerce admin

This confirms:
 - Database persistence works
 - Application stack is functional
 - Store is fully operational

## 8.  Deleting a Store
From Dashboard:
  - Click Delete
Or via API:
```arduino
curl -X DELETE http://localhost:3000/stores/store-1700000000000
```
Deletion removes:
- Namespace
- Deployments
- StatefulSets
- PVCs
- Services
- Secrets
- Ingress resources
- Namespace deletion guarantees full cleanup.

## 9. Production / VPS Deployment (k3s)
The same Helm charts are used.

# What Changes Between Local and Production?
Handled via values-prod.yaml:
- Ingress class
- Domain name
- Storage class
- Secrets source
- Resource sizing
- Deploy to k3s:
```bash
helm upgrade --install platform ./charts/platform \
  --values values-prod.yaml
```
No application code changes are required.

## 10. Kubernetes & Helm Requirements (Satisfied)
✔ Local Kubernetes (Minikube)
✔ Production-like deployment (k3s)
✔ Helm mandatory
✔ Namespace-per-store isolation
✔ Persistent database storage
✔ Ingress support
✔ Readiness and liveness probes
✔ Clean teardown
✔ No hardcoded secrets

## 11. Idempotency & Failure Handling
- Store ID = Namespace name
- Helm install/upgrade is retry-safe
- If provisioning restarts mid-process, Helm reconciles
- Namespace deletion ensures no orphaned resources
- API prevents duplicate store IDs

## 12. Security & Isolation
- Secrets stored in Kubernetes Secrets
- Namespace isolation
- ResourceQuota limits per store
- LimitRange enforces default resource requests
- Internal services not publicly exposed
- Only WordPress exposed via Service/Ingress

## 13. Scaling Strategy
- Horizontally scalable:
- Dashboard (stateless)
- API (stateless)
- Provisioning logic
- Each store is independent and isolated.
- Provisioning concurrency is supported by namespace separation.

## 14. Tradeoffs
- In-memory metadata (acceptable for Round 1)
- WooCommerce fully implemented
- Medusa architecture-ready but stubbed
- No external database for platform metadata (future enhancement)

## 15. Observability & Debugging
Useful commands:
```bash
kubectl get namespaces
kubectl get pods -n store-xxxx
kubectl logs -n store-xxxx deploy/wordpress
kubectl describe pod -n store-xxxx
```

## 16. Demo Flow (For Submission Video)
- Start Minikube
- Run API + Dashboard
- Create a store
- Show namespace created
- Wait for READY
- Access store
- Place test order
- Delete store
- Show namespace removed

## 17. Repository Contents
```js
/dashboard → React frontend
/api → Node.js backend
/charts → Helm charts
values-local.yaml
values-prod.yaml
README.md
```
## 18. Production Evolution (Future Improvements)
- TLS via cert-manager
- Per-user store quotas
- Audit logging
- Provisioning metrics
- NetworkPolicies per namespace
- Upgrade/rollback demonstration
- External secret manager integration
