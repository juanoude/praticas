const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

class TransactionService {
  static async index(period) {
    const transactions = await TransactionModel.find({
      yearMonth: period
    });

    return transactions;
  }

  static async create(data) {
    const transaction = new TransactionModel(data);
    await transaction.save();

    return transaction;
  }

  static async update(data) {
    const transaction = await TransactionModel.findByIdAndUpdate(data.id, data, {
      new: true
    });

    return transaction;
  }

  static async destroy(id) {
    const result = await TransactionModel.findByIdAndDelete(id);

    return result;
  }
}

module.exports = TransactionService;