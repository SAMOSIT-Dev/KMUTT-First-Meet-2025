const express = require("express");
const CardController = require("../controllers/card.controller");

const router = express.Router();

router.get("/clients", CardController.getClients);
router.post("/clients/reset", CardController.resetClients);
router.post("/send/card", CardController.sendCard);

module.exports = router;
