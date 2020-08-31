'use strict';

import express from 'express';
import { router } from './app.routes.js';
import mongoose from 'mongoose';

mongoose.connect(
  'mongodb+srv://IGTI:modulo4@anntech.wgou8.mongodb.net/igti?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log('Banco conectado');
});

const app = express();

app.use(express.json());
app.use('/', router);

app.listen(3000, () => {
  console.log(' 👁️ Foco, Disciplina e Atenção 👁️ ')
})