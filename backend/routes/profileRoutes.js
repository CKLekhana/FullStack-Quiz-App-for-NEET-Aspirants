const router = require("express").Router();
const {getUser, changeName, changeEmail, changePassword, deleteAccount} = require("../controllers/profileControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/user-data", authMiddleware,getUser );
router.post("/change-username", authMiddleware ,changeName);
router.post("/change-password", authMiddleware ,changePassword);
router.post("/change-email", authMiddleware, changeEmail);
router.delete("/delete-account", authMiddleware, deleteAccount);

module.exports = router;