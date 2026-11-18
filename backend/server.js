const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => res.send("Travello API is running"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "travello-backend", time: new Date().toISOString() });
});

app.get("/api/destinations", (req, res) => {
  res.json([
    { id: 1, name: "Ella", description: "Misty mountains, scenic train rides and tea estates." },
    { id: 2, name: "Sigiriya", description: "Ancient history and wide views from Lion Rock." },
    { id: 3, name: "Galle", description: "Coastal charm, historic streets and golden beaches." },
  ]);
});

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.listen(PORT, () => console.log(`Travello API listening on http://localhost:${PORT}`));
