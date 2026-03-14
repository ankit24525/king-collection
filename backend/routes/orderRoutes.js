const router = require("express").Router()

const {createOrder} = require("../controllers/orderController")
const {protect} = require("../middleware/authMiddleware")
const orderRoutes = require("./routes/orderRoutes")

app.use("/api/orders",orderRoutes)
router.post("/",protect,createOrder)

module.exports = router