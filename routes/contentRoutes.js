const router = require("express").Router();
const contentController = require("../controllers/contentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, contentController.createContent);
router.get("/my", authMiddleware, contentController.getMyContent);


module.exports = router;
