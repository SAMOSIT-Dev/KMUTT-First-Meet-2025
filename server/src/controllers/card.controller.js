const CardService = require("../services/card.service");

class CardController {
  static async getClients(req, res) {
    const clients = await CardService.getClients();
    res.json({ clients });
  }

  static async resetClients(req, res) {
    const result = await CardService.resetClients();
    res.json(result);
  }

  static async sendCard(req, res) {
    try {
      const result = await CardService.sendCards();
      res.json(result);
    } catch (error) {
      console.error("sendCard error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = CardController;
