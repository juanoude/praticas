import { promises as fs } from 'fs';
import rl from 'readline';

async function getObjects() {
  const estadosString = await fs.readFile('./Estados.json', 'utf8');
    
    const cidadesString = await fs.readFile('./Cidades.json', 'utf8');
    
    const estados = JSON.parse(estadosString);
    const cidades = JSON.parse(cidadesString);

    return [estados, cidades];
}

//1
async function createStateFiles() {
  try {
    const [estados, cidades] = await getObjects();
    
    estados.forEach(async (estado) => {

      const cidadesDoEstado = cidades.filter(cidade => cidade.Estado === estado.ID);
    
      await fs.writeFile(`./Ex1/${estado.Sigla}.json`, JSON.stringify(cidadesDoEstado));
    });
  } catch (err) {
    throw err;
  }
}
// createStateFiles().then(() => {
//   console.log('terminado');
// });


//2
async function getUfLength(uf) {
  const ufCitiesString = await fs.readFile(`./Ex1/${uf}.json`, 'utf8');
  const ufCities = JSON.parse(ufCitiesString);
  
  const response = ufCities.length;
  return response;
}
// getUfLength('GO').then(response =>{
//   console.log(response);  
// });


//3

async function getQuantities() {
  const [estados, _] = await getObjects();

  const ranking = await Promise.all(estados.map(
    async (estado) => {
      const quantidade = await getUfLength(`${estado.Sigla}`);
  
      return ({
        uf: estado.Sigla,
        quantidade
      });
    })
  );

  return ranking;
}

async function mostPopulate() {
  
  const ranking = await getQuantities();

  const top = ranking.sort((a, b) => {
    return (a.quantidade > b.quantidade) ? -1 : ((a.quantidade < b.quantidade) ? 1 : 0)
  });

  const top5 = [];

  for (let i = 0; i < 5; i++) {
    top5.push(`${top[i].uf} - ${top[i].quantidade}`);
  }

  return top5;
}

mostPopulate().then( response => console.log(response));

//4
async function leastPopulate() {
  
  const ranking = await getQuantities();

  const top = ranking.sort((a, b) => {
    return (a.quantidade > b.quantidade) ? 1 : ((a.quantidade < b.quantidade) ? -1 : 0)
  });

  const top5 = [];

  for (let i = 0; i < 5; i++) {
    top5.push(`${top[i].uf} - ${top[i].quantidade}`);
  }

  return top5.reverse();
}

leastPopulate().then( response => console.log(response));


//5
async function getBiggestNames() {
  const biggestCities = [];

  const dir = await fs.opendir('./Ex1');
  for await (const dirent of dir) {
    const [uf, _] = dirent.name.split('.');

    const cities = JSON.parse(await fs.readFile(`./Ex1/${dirent.name}`, 'utf8'));
    
    let biggestCity = '';

    cities.forEach(city => {
      if(city.Nome.length > biggestCity.length) {
        biggestCity = city.Nome
      }
    });

    biggestCities.push(`${biggestCity} - ${uf}`);
  }

  return biggestCities
}

// getBiggestNames().then(res => console.log(res));


//6
async function getSmallestNames() {
  const smallestNames = [];

  const dir = await fs.opendir('./Ex1');
  for await(const dirent of dir) {
    const [uf, _] = dirent.name.split('.');

    const cities = JSON.parse(await fs.readFile(`./Ex1/${dirent.name}`, 'utf8'));


    let smallest;
    // let temp;

    cities.forEach(city => {
      if(!smallest) {
        smallest = city.Nome;
      }

      if(city.Nome.length < smallest.length) {
        smallest = city.Nome;
      }

      // temp = city.Nome;
    });

    smallestNames.push(`${smallest} - ${uf}`);
  }

  return smallestNames;
}

// getSmallestNames().then(res => console.log(res));


//7
async function getBiggestOfAllNames() {
  const biggestNames = await getBiggestNames();
  
  let response;

  biggestNames.forEach(name => {
    if(!response) {
      response = name;
    }

    if(name.length > response.length) {
      response = name;
    }
  });

  console.log(response);
}

// getBiggestOfAllNames();


//8
async function getSmallestOfAllNames() {
  const smallestNames = await getSmallestNames();

  let response;
  smallestNames.forEach(name => {
    if(!response) response = name;

    if(name.length < response.length) {
      response = name;
    }
  });

  console.log(response);
}

// getSmallestOfAllNames();

