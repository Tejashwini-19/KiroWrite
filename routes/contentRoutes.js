const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const contentController = require("../controllers/contentController");

router.post("/create", authMiddleware, contentController.createContent);
router.get("/my", authMiddleware, contentController.getMyContent);
router.put("/update/:id", authMiddleware, contentController.updateContent);
router.delete("/delete/:id", authMiddleware, contentController.deleteContent);

// ✅ AI route
router.post("/generate", authMiddleware, contentController.generateContent);

module.exports = router;
