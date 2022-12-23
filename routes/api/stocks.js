const router = require("express").Router();
const stockController = require("../../controllers/stockController");

router.route("/").get(stockController.findAll).post(stockController.create);

module.exports = router;
