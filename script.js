function fetchData() {
    // Make an HTTP  Get request to fetch character data,the url is from the resources to access data in the db.json
    fetch('http://localhost:3000/characters')
    // Convert the first (data)response to JSON format
      .then(response => response.json())  
    // Calls displayButtons function with the fetched data  (reading the data inside the url),stores the data in displayButtons
      .then(data => displayButtons(data)) 

  }
  
  function displayButtons(characters) {
    // call the button container
    let buttonContainer = document.getElementById('buttonContainer'); 
  
    characters.forEach(character => {
      // Create a div element for a character   
      let characterContainer = document.createElement('div'); 
    //   this is used to create the class name  for the character container in html  for styling Css
      characterContainer.classList.add('character-container');
   // Create a button element
      let button = document.createElement('button');
      // Add CSS class 'character-button' to the button
      button.classList.add('character-button');
    //   displays the name inside the button
      button.innerText = character.name;
      // Add a click event listener to show character details on button click 
      button.addEventListener('click', () => {
        showDetails(character, characterContainer); 
      });
  // Append the button to the character div
      characterContainer.appendChild(button); 
      // Append the character div to the button container
      buttonContainer.appendChild(characterContainer); 
    });
  }
  
  function showDetails(character, container) {
    // Check if the character details container already exists
    let detailsContainer = container.querySelector('.details'); 
    if (detailsContainer) {
      return; // If it exists, return without doing anything
    }
  // Create a new div element for the character details
    let newDetailsContainer = document.createElement('div');
    // Add CSS class 'details' to the details div 
    newDetailsContainer.classList.add('details');
     // Create a paragraph element for the character name
    let nameElement = document.createElement('p');
    // Set the name text to the character's name
    nameElement.innerText = `Name: ${character.name}`; 
    // Append the name element to the details div
    newDetailsContainer.appendChild(nameElement); 
  // Create an image element for the character image
    let imageElement = document.createElement('img'); 
    // Set the image source to the character's image URL
    imageElement.src = character.image; 
    // Append the image element to the details div
    newDetailsContainer.appendChild(imageElement); 
    // Create a paragraph element for the character votes
    let votesElement = document.createElement('p'); 
    // Set the votes text to the character's votes count
    votesElement.innerText = `Votes: ${character.votes}`; 
     // Append the votes element to the details div
    newDetailsContainer.appendChild(votesElement);
   // Create a button element for voting
    let voteButton = document.createElement('button');
    voteButton.innerText = 'Vote'; 
    voteButton.addEventListener('click', () => {
      character.votes++; // Increment the character's votes count on button click
      votesElement.innerText = `Votes: ${character.votes}`; // Update the displayed votes count
    });
    // Append the vote button to the details div
    newDetailsContainer.appendChild(voteButton); 
  
     // Append the details div to the character container
    container.appendChild(newDetailsContainer);
  }
  
  function addAnimal(event) {
    // Prevent the default form submission behavior
    event.preventDefault(); 
  
    let nameInput = document.getElementById('nameInput'); // Get the input element for the character name
    let imageInput = document.getElementById('imageInput'); // Get the input element for the character image
    let votesInput = document.getElementById('votesInput'); // Get the input element for the character votes
  
    let name = nameInput.value; // Get the value of the name input
    let image = imageInput.value; // Get the value of the image input
    // Get the value of the votes input and convert it to an integer
    let votes = parseInt(votesInput.value); 
  
     // Check if all input values are present and the votes value is a valid number
    if (name && image && !isNaN(votes)) {
     
      let character = { name, image, votes }; // Create a character object with the input values
      displayButtons([character]); // Call displayButtons function with the new character as an array
  
      nameInput.value = ''; // Reset the name input value
      imageInput.value = ''; // Reset the image input value
      votesInput.value = ''; // Reset the votes input value
    }
  }
   // Add a submit event listener to the form element to handle adding a new character
  document.getElementById('animalForm').addEventListener('submit', addAnimal);
  
  fetchData(); // Call the fetchData function to initiate fetching and displaying character data
  