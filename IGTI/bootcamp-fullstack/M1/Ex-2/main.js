const usersListContainer = document.querySelector('#users-list');
const usersStatsContainer = document.querySelector('#users-stats');
const searchInput = document.querySelector('#search-field');
const searchButton = document.querySelector('#search-button');

const formatNumber = Intl.NumberFormat('pt-BR');
searchInput.value = '';

let filtered = null;
let usersList = null;
let usersStats = {};
let inputValue = null;

fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
  .then(res => {
    res.json().then(data => {
      usersList = data.results.map(({name, picture, dob, gender}) => {
        return ({
          name: name.first + ' ' + name.last,
          picture: picture.thumbnail,
          age: dob.age,
          gender
        });
      }).sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);

      console.log(usersList);
      
    });
  });

window.addEventListener('load', () => {
  setInputListener();
  setButtonListener();
  render();
});

function render() {
  if (!filtered) {
    usersListContainer.innerHTML = '<h2>Nenhum usuário Filtrado</h2>';
    usersStatsContainer.innerHTML = '<h2>Nada a ser exibido</h2>';
    return;
  }

  let usersHTML = `<h2>${filtered.length} Usuário(s) Encontrado(s) </h2>`;

  usersHTML += '<ul class="collection">';
  console.log(filtered);

  filtered.forEach( user => {
    usersHTML += `
      <li class="collection-item avatar">
        <img src="${user.picture}" alt="${user.name}" class="circle">
        <span class="title">${user.name}</span>
        <p> ${user.age} anos </p>
      </li>
    `;
  });

  usersHTML += '</ul>';
  
  usersListContainer.innerHTML = usersHTML;

  let statsHTML = '<h2>Estatísticas</h2>';

  statsHTML += '<ul class="collection">';

  statsHTML += `
    <li class="collection-item">
      Sexo masculino: 
      <strong>${usersStats.maleQuantity}</strong>
    </li>
    <li class="collection-item">
      Sexo feminino: 
      <strong>${usersStats.femaleQuantity}</strong>
    </li>
    <li class="collection-item">
      Soma das idades: 
      <strong>${formatNumber.format(usersStats.agesSum)}</strong>
    </li>
    <li class="collection-item">
      Média das idades: 
      <strong>${formatNumber.format(usersStats.ageAverage.toFixed(2))}</strong>
    </li>
  `;

  statsHTML += '</ul>';

  usersStatsContainer.innerHTML = statsHTML;
}

const setInputListener = () => {
  disableEmptyField();
  searchInput.addEventListener('keyup', (event) => {
    const disabled = disableEmptyField();
    if (disabled) {
      return;
    }

    if(event.key === 'Enter'){
      filterList();
    }

    inputValue = searchInput.value.toLowerCase();
  })
}

const disableEmptyField = () => {
  if (searchInput.value.length === 0) {
    searchButton.setAttribute('disabled', true);
    return true;
  }else {
    searchButton.removeAttribute('disabled');
    return false;
  }
}

const setButtonListener = () => {
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    filterList();
  });
}

const filterList = () => {
  const regexp = new RegExp(inputValue, 'i');
  
  filtered = usersList.filter(
    user => user.name.search(regexp) != -1
  );

  setStats();
  render();
}

const setStats = () => {
  usersStats.maleQuantity = filtered.reduce((accumulator, current) => {
    if(current.gender === 'male') {
      accumulator++;
    }

    return accumulator;
  }, 0);

  usersStats.femaleQuantity = filtered.reduce((accumulator, current) => {
    if(current.gender === 'female') {
      accumulator++;
    }

    return accumulator;
  }, 0);

  usersStats.agesSum = filtered.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);

  usersStats.ageAverage = usersStats.agesSum / filtered.length;
}