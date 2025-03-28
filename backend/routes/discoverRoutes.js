const router = require("express").Router();
const discover = require("../controllers/discoverControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware ,discover);

module.exports = router;