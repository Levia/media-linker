# Media Linker

A PWA (Progressive Web App) that converts `.txt` files into HTML with clickable links to your media files. All processing happens client-side — no uploads, no server required for the core feature.

## Tech Stack

| Layer    | Technology               |
|----------|--------------------------|
| Backend  | Node.js 20 + Express 5   |
| Frontend | Vanilla JS PWA (static)  |
| Serving  | Express static middleware |
| Container | Docker (node:20-alpine) |

## Local Development

```bash
cd server
npm install
npm run dev     # starts nodemon on http://localhost:3000
```

The Express server serves the `client/` directory as static files and exposes a health-check at `/api/ping`.

---

## Deployment on Render.com

This repository ships with a [`render.yaml`](./render.yaml) (Render Blueprint) and a [`Dockerfile`](./Dockerfile) so it can be deployed as a **Web Service** on [Render.com](https://render.com) with a single click.

### Prerequisites

- A [Render.com](https://render.com) account.
- The repository forked or connected to Render via GitHub.

### Step-by-step: deploy from the Blueprint

1. **Connect the repository**
   - Go to **Dashboard → New → Blueprint**.
   - Authorize Render to access `Levia/media-linker` (or your fork).
   - Render detects `render.yaml` automatically and previews the service named **`media-linker`**.

2. **Review & apply**
   - Confirm the service configuration (Docker build, health check `/api/ping`).
   - Click **Apply**.  Render will build the Docker image and start the container.

3. **Manual deploy (alternative)**
   - Go to **Dashboard → New → Web Service**.
   - Choose **"Deploy from a Git repository"** and select this repo.
   - Set **Runtime** to `Docker`.
   - Set **Dockerfile path** to `./Dockerfile`.
   - Set **Docker context** to `.` (repository root).
   - Add the environment variable `NODE_ENV=production`.
   - Click **Create Web Service**.

### Auto-deploys from `main`

`autoDeploy: true` is set in `render.yaml`. Every push to `main` triggers a new build and rolling deployment automatically. You can disable this in the Render dashboard under **Settings → Auto-Deploy**.

### Environment variables

| Variable   | Required | Default      | Purpose                                   |
|------------|----------|--------------|-------------------------------------------|
| `PORT`     | No       | `3000`       | Injected automatically by Render at runtime. The server reads it via `process.env.PORT`. |
| `NODE_ENV` | No       | `production` | Set to `production` by the Blueprint.     |

> **No secrets are required** for the current feature set. If you add external services (database, object storage, payment provider, etc.) add their credentials here as environment variables and **never** commit them to source code.

### Health check

Render pings `GET /api/ping` after each deploy to confirm the service is healthy before routing traffic to the new instance.

Expected response:

```json
{ "message": "pong", "status": "server is running" }
```

### Verifying the deployment

Once the deploy succeeds, Render provides a public URL such as:

```
https://media-linker.onrender.com
```

You can verify the service is running with:

```bash
curl https://media-linker.onrender.com/api/ping
# → {"message":"pong","status":"server is running"}
```

Or simply open the URL in a browser to use the app.

### Inspecting logs on failure

- Open the Render dashboard.
- Click the **`media-linker`** service.
- Go to the **Logs** tab to stream build and runtime logs in real time.
- For historical logs, use the **Events** tab to find the failed deploy and click **View logs**.

---

## Local vs Render differences

| Concern        | Local dev                          | Render                                   |
|----------------|------------------------------------|------------------------------------------|
| Port           | `3000` (default)                   | Injected via `PORT` env var (~`10000`)   |
| Static files   | Served by Express from `../client` | Same — baked into the Docker image       |
| User uploads   | N/A — all processing is in-browser | N/A — no server-side uploads             |
| Database       | None required                      | None required                            |
| Hot-reload     | `nodemon` (`npm run dev`)          | Not applicable (production image)        |
