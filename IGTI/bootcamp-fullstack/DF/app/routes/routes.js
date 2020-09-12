const express = require('express');
const transactionRouter = express.Router();
const TransactionService = require('../services/transactionService');

transactionRouter.get('', async (req, res) => {
  const { period } = req.query;

  const transactions = await TransactionService.index(period);

  return res.json(transactions);
});

transactionRouter.post('', async (req, res) => {
  const transaction = await TransactionService.create(req.body);

  return res.json(transaction);
});

transactionRouter.put('/:id', async (req, res) => {
  const {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type
  } = req.body;

  const { id } = req.params;

  const transaction = await TransactionService.update({
    id,
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type
  });

  return res.json(transaction);
});

transactionRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const response = TransactionService.destroy(id);

  return res.status(200).json(response);
})

module.exports = transactionRouter;
