const router = require("express").Router();
const dashboard = require("../controllers/dashboardControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware ,dashboard);

module.exports = router;