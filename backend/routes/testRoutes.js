const router = require("express").Router();
const {test1, test2} = require("../controllers/testsControllers");
router.get("/", test2);
router.get("/test-db", test1);

module.exports = router;