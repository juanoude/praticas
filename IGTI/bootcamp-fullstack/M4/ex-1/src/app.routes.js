import express from 'express';
import AppController from './app.controller.js';

const appController = new AppController();
export const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { conta, agencia } = req.query;

    const response = await appController.encontrar({ conta, agencia });

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/media', async (req, res) => {
  try {
    const { agencia } = req.query;

    const response = await appController.media(agencia);

    return res.json({ media: response });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/bottom', async (req, res) => {
  try {
    const { number } = req.query;

    const response = await appController.menores(number);

    return res.json({ menores: response });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/top', async (req, res) => {
  try {
    const { number } = req.query;

    const response = await appController.maiores(number);

    return res.json({ maiores: response });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post('/personalitte', async (req, res) => {
  try {
    const response = await appController.personalitte();

    return res.json({ clientes: response });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post('/deposito', async (req, res) => {
  try {
    const { conta, agencia, valor } = req.body;

    const response = await appController.deposito({
      conta,
      agencia,
      valor
    });

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post('/saque', async (req, res) => {
  try {
    const { conta, agencia, valor } = req.body;

    const response = await appController.saque({
      conta,
      agencia,
      valor
    });

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/', async (req, res) => {
  const { contaOrigem, contaDestino, valor } = req.body;

  const conta = await appController.transferencia({ contaOrigem, contaDestino, valor });

  return res.json(conta);
});

router.delete('/', async (req, res) => {
  const { conta, agencia } = req.body;

  const contasNum = await appController.excluir({ conta, agencia });

  return res.json({ contasNum });
});
