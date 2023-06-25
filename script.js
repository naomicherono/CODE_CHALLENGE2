
function fetchData() {
  fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(data => displayButtons(data))
    .catch(error => console.error('Error:', error));
}

function displayButtons(characters) {
  let buttonContainer = document.getElementById('buttonContainer');

  characters.forEach(character => {
    let characterContainer = document.createElement('div');
    characterContainer.classList.add('character-container');

    let button = document.createElement('button');
    button.classList.add('character-button');
    button.innerText = character.name;
    button.addEventListener('click', () => {
      showDetails(character, characterContainer);
    });

    characterContainer.appendChild(button);
    buttonContainer.appendChild(characterContainer);
  });
}

function showDetails(character, container) {
  let detailsContainer = container.querySelector('.details');
  if (detailsContainer) {
    // Details already displayed, no need to recreate
    return;
  }

  let newDetailsContainer = document.createElement('div');
  newDetailsContainer.classList.add('details');

  let nameElement = document.createElement('p');
  nameElement.innerText = `Name: ${character.name}`;
  newDetailsContainer.appendChild(nameElement);

  let imageElement = document.createElement('img');
  imageElement.src = character.image;
  newDetailsContainer.appendChild(imageElement);

  let votesElement = document.createElement('p');
  votesElement.innerText = `Votes: ${character.votes}`;
  newDetailsContainer.appendChild(votesElement);

  let voteButton = document.createElement('button');
  voteButton.innerText = 'Vote';
  voteButton.addEventListener('click', () => {
    character.votes++;
    votesElement.innerText = `Votes: ${character.votes}`;
  });
  newDetailsContainer.appendChild(voteButton);

  container.appendChild(newDetailsContainer);
}



function addAnimal(event) {
  event.preventDefault();

  let nameInput = document.getElementById('nameInput');
  let imageInput = document.getElementById('imageInput');
  let votesInput = document.getElementById('votesInput');

  let name = nameInput.value;
  let image = imageInput.value;
  let votes = parseInt(votesInput.value);

  if (name && image && !isNaN(votes)) {
    let character = { name, image, votes };
    displayButtons([character]);

    nameInput.value = '';
    imageInput.value = '';
    votesInput.value = '';
  }
}

document.getElementById('animalForm').addEventListener('submit', addAnimal);

fetchData();