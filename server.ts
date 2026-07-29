import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({
      status: "online",
      app: "PeopleFlow HRMS",
      version: "1.0.0",
      timestamp: new Date().toISOString()
    });
  });

  app.get("/api/tenants", (req, res) => {
    res.json([
      { id: "tenant-acme", name: "Acme Corp", domain: "acme.peopleflow.app", logo: "⚡", plan: "Enterprise", seats: 250 },
      { id: "tenant-techpulse", name: "TechPulse AI", domain: "techpulse.peopleflow.app", logo: "🚀", plan: "Growth", seats: 85 },
      { id: "tenant-globallogistics", name: "Global Logistics Ltd", domain: "globallogistics.peopleflow.app", logo: "🌐", plan: "Starter", seats: 35 }
    ]);
  });

  app.get("/api/auth/me", (req, res) => {
    res.json({
      id: "user-1",
      name: "Alex Morgan",
      email: "alex.morgan@acme.com",
      role: "Company Admin",
      tenantId: "tenant-acme",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PeopleFlow HRMS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
