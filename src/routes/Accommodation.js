const Accommodation = require("../models/Accommodation");

const router = require("express").Router();

// Create a new accommodation
router.post("/", async (req, res) => {
  try {
    const Accommodation = await Accommodation.create(req.body);
    res.status(201).json(Accommodation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all accommodations
router.get("/", async (req, res) => {
  try {
    const Accommodations = await Accommodation.findAll();
    res.json(Accommodations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single accommodation by ID
router.get("/:id", async (req, res) => {
  try {
    const Accommodation = await Accommodation.findByPk(req.params.id);
    if (Accommodation) {
      res.json(Accommodation);
    } else {
      res.status(404).json({ message: "Accommodation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an accommodation
router.put("/:id", async (req, res) => {
  try {
    const Accommodation = await Accommodation.findByPk(req.params.id);
    if (Accommodation) {
      await Accommodation.update(req.body);
      res.json(Accommodation);
    } else {
      res.status(404).json({ message: "Accommodation not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an accommodation
router.delete("/:id", async (req, res) => {
  try {
    const Accommodation = await Accommodation.findByPk(req.params.id);
    if (Accommodation) {
      await Accommodation.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Accommodation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
