import express from 'express';
import { getGrades } from './utils.js';

const resultsRouter = express.Router();


resultsRouter.get('/total', async (req, res) => {
  const { student, subject } = req.body;
  
  const { grades } = await getGrades();

  const total = grades.filter(grade =>
    grade.student === student && grade.subject === subject)
    .reduce((accumulator, grade) => {
      return accumulator + grade.value;
    }, 0);
  
  if(!total) throw new Error('Student or Subject not found');

  return res.json({ total });
});

resultsRouter.get('/average', async (req, res) => {
  const { subject, type } = req.body;
  const { grades } = await getGrades();

  const filteredGrades = grades.filter(grade =>
    grade.subject === subject && grade.type === type
  );

  const total = filteredGrades.reduce((accumulator, grade) => {
    return accumulator + grade.value;
  }, 0);

  if(!total) throw new Error('Subject/Type not found');

  return res.json({ average: total / filteredGrades.length });
});

resultsRouter.get('/top', async (req, res) => {
  const { subject, type } = req.body;
  const { grades } = await getGrades();

  const filteredGrades = grades.filter(grade =>
    grade.subject === subject && grade.type === type
  );

  if(!filteredGrades) throw new Error('Subject/Type not found');

  filteredGrades.sort((a, b) => b.value - a.value);

  const top = [];

  for(let i = 0; i < 3; i++) {
    top.push(filteredGrades[i]);
  }

  return res.json(top);
});

export default resultsRouter;