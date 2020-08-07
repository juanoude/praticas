import express from 'express';
import gradeRouter from './GradeRouter.js';
import resultRouter from './ResultsRouter.js';

const app = express();

app.listen(3000, () => {
  console.log("Servidor rodando... \nFoco, Atenção, Disciplina!");
});

app.use(express.json());
app.use('/grade', gradeRouter);
app.use('/result', resultRouter);

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(400).json({ error: err.message });
});