import { promises as fs } from 'fs';

export async function getGrades() {
  const grades = await fs.readFile('grades.json');

  return JSON.parse(grades);
}

export async function setGrades(grades) {
  await fs.writeFile('grades.json', JSON.stringify(grades));
}