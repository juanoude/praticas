import express from 'express';
import { getGrades, setGrades } from './utils.js';
const { Router } = express;

const gradeRouter = Router();

gradeRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { grades } = await getGrades();

    const grade = grades.find(grade => grade.id == id);

    if(!grade) {
      throw new Error('Grade not found');
    }

    res.json({ grade });
  }catch(err) {
    next(err);
  }
  
});

gradeRouter.post('/', async (req, res) => {
  const {student, subject, type, value} = req.body;

  const grades = await getGrades();

  const grade = {
    id: grades.nextId++,
    student,
    subject,
    type,
    value,
    timestamp: `${new Date().toISOString()}`
  }

  grades.grades.push(grade);

  await setGrades(grades);

  res.json(grade);
});

gradeRouter.put('/:id', async (req, res, next) => {
  try {
    const { student, subject, type, value } = req.body;
    const { id } = req.params;

    if(!student || !subject || !type || value === null) {
      throw new Error('Missing key values');
    }

    const { nextId, grades } = await getGrades();

    const grade = grades.find(grade => parseInt(id) === grade.id);

    if(!grade) {
      throw new Error('Grade not found');
    }

    Object.assign(grade, {student, subject, type, value});

    setGrades({nextId, grades});

    res.json(grade);
  }catch(err) {
    next(err);
  }
  
});


gradeRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const { nextId, grades } = await getGrades();
    
    const index = grades.findIndex(grade => grade.id == id);

    grades.splice(index, 1);

    setGrades({ nextId, grades });

    res.send();
  }catch(err) {
    next(err);
  }
});

export default gradeRouter;