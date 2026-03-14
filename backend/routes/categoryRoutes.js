const router = require("express").Router()

const {createCategory,getCategories} =
require("../controllers/categoryController")

const {protect} = require("../middleware/authMiddleware")
const adminOnly = require("../middleware/adminMiddleware")

router.post("/",protect,adminOnly,createCategory)
router.get("/",getCategories)

module.exports = router