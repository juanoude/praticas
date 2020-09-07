import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const create = async (req, res) => {
  try {
    const { name, subject, type, value, lastModified } = req.body;
    const grade = new db.grades({
      name, subject, type, value, lastModified
    })

    await grade.save();
    res.send({ message: 'Grade inserido com sucesso', grade });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    logger.info(`GET /grade`);
    const grades = await db.grades.find(condition);
    res.send(grades);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    logger.info(`GET /grade - ${id}`);
    const grade = await db.grades.findOne({id});
    res.send({ grade });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    const grade = await db.grades.findOneAndUpdate(id, { $set: { ...req.body }},
      { 
        new: true
      }
    );
    res.send({ grade });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    logger.info(`DELETE /grade - ${id}`);
    await db.grades.findByIdAndRemove(id);
    res.send({ message: `Deleted user with id ${id}`})
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
