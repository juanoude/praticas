import { Account } from './app.model.js';

export default class AppController {
  async media(agencia) {
    const contas = await Account.find({ agencia }).exec();

    const total = contas.reduce((acc, conta) => {
      return acc + conta.balance;
    }, 0);

    return total / contas.length;
  }

  async menores(number) {
    const contas = await Account.find().exec();

    contas.sort((a, b) => a.balance - b.balance)

    return contas.slice(0, number);
  }

  async maiores(number) {
    const contas = await Account.find()
      .sort({ balance: -1, name: 1 })
      .limit(parseInt(number));

    return contas;
  }

  async personalitte() {
    const agencias = await Account.distinct("agencia");

    let personalitte = [];
    Promise.all(agencias.map(async agencia => {
      return await Account.find({ agencia })
        .sort({ balance: -1 })
        .limit(1)
        .exec();
    })).then(data => {
      personalitte = data;
    })

    return personalitte;
  }

  async encontrar(data) {
    const { agencia, conta } = data;

    const contaRespectiva = await Account.findOne({ agencia, conta }).exec();

    if (!contaRespectiva) {
      throw new Error('conta não encontrada');
    }

    return contaRespectiva;
  }

  async deposito(data) {
    const { agencia, valor, conta } = data;

    const contaParaDeposito = await Account.findOneAndUpdate(
      { agencia, conta },
      { $inc: { balance: valor } },
      { new: true }
    ).exec();

    if (!contaParaDeposito) {
      throw new Error('conta não encontrada');
    }

    return contaParaDeposito;
  }

  async saque(data) {
    const { agencia, valor, conta } = data;

    const contaParaDeposito = await Account.findOne({ agencia, conta }).exec();

    if (!contaParaDeposito) {
      throw new Error('conta não encontrada');
    }

    const novoSaldo = contaParaDeposito.balance - (valor + 1);
    console.log(novoSaldo);

    if ((novoSaldo) < 0) {
      throw new Error('sua conta não pode estar negativa');
    }

    const novaConta = await Account.findOneAndUpdate(
      { agencia, conta },
      { $set: { balance: novoSaldo } },
      { new: true }
    ).exec();


    return novaConta;
  }

  async transferencia(data) {
    const { contaOrigem, contaDestino, valor } = data;

    const contaOrigemDB = await Account.findOne({ conta: contaOrigem });

    const contaDestinoDB = await Account.findOne({ conta: contaDestino });

    let valorOrigem;
    if (contaDestinoDB.agencia !== contaOrigemDB.agencia) {
      valorOrigem = valor + 8;
    } else {
      valorOrigem = valor;
    }

    if (!contaDestinoDB || !contaOrigemDB) {
      throw new Error('conta não encontrada');
    }

    if (valorOrigem > contaOrigemDB.balance) {
      throw new Error('sem saldo suficiente');
    }

    const newCODB = await Account.findOneAndUpdate(
      { conta: contaOrigem },
      { $inc: { balance: -valorOrigem } },
      { new: true }
    )

    await Account.findOneAndUpdate(
      { conta: contaDestino },
      { $inc: { balance: valor } }
    )

    return newCODB;
  }

  async excluir(data) {
    const { conta, agencia } = data;

    await Account.findOneAndDelete({ conta, agencia });

    const contasAtivas = await Account.countDocuments({ agencia });

    return contasAtivas;
  }
}

