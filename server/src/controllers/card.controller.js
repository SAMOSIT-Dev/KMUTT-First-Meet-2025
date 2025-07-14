const CardService = require("../services/card.service");

class CardController {
  static getClients(req, res) {
    const clients = CardService.getClients();
    res.json({ clients });
  }

  static resetClients(req, res) {
    const result = CardService.resetClients();
    res.json(result);
  }

  static sendCard(req, res) {
    try {
      const result = CardService.sendCards();
      res.json(result);
    } catch (error) {
      console.error("sendCard error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = CardController;
