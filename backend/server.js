const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Use env var (safer than hardcoding)
const mongoUri = process.env.MONGO_URI || "mongodb+srv://shashuladdu5_db_user:Masul@cluster0.eiwqro6.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", ItemSchema);

app.post("/add", async (req, res) => {
  try {
    const item = new Item({ name: req.body.name });
    await item.save();
    res.json({ message: "Item saved!", item });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(5050, () => console.log("Backend running on port 5050"));
