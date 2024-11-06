// Fetching pet categories
function petCategories() {
  fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => displayingPetCategories(data.categories))
}

// Displaying fetched categories in a button using innerHTML
function displayingPetCategories(categories) {
  const categoriesContainer = document.getElementById('Bestfriend-container');

  categories.forEach(item => {
    // Creating a container for each button
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = `
      <button id="btn-${item.id}" onclick="loadCategoriesPet('${item.category}') " class="btn space-x-2 w-[212px] h-[104px] rounded-xl flex items-center justify-center">
    <img class="h-[50px] w-[50px]" src="${item.category_icon}">
    <span class="text-[24px] font-bold">${item.category}</span>
  </button>
    `;
    // Appending the button container to the main container
    categoriesContainer.append(buttonContainer);
  });
}

// Function to fetch all pets
function petList() {
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => {
      console.log("Response from pets fetch:", data);
      if (data && data.pets) {
        petCardList(data.pets); // Pass the pets array directly
      } else {
        console.error("Pets data is undefined or does not contain 'pets'", data);
      }
    })
    .catch(error => console.error("Error fetching pet list:", error));
}

// Function to fetch categories based on category link
// Load categories based on selected category
function loadCategoriesPet(link) {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${link}`)
    .then(res => res.json())
    .then(data => {
      // Check if 'data' exists and contains an array
      if (data && Array.isArray(data.data)) {
        petCardList(data.data); // Pass the array directly
      } else {
        console.error("Category data is undefined or does not contain expected array structure", data);
      }
    })
    .catch(error => console.error("Error fetching category data:", error));
}


// Function to display pets as cards
function petCardList(items) {
  const cardContainer = document.getElementById('petsContainer');
  cardContainer.classList.remove('grid');
  cardContainer.innerHTML = ''; // Clear previous cards

  // Check if there are items to display
  if (!items || items.length === 0) {
    cardContainer.innerHTML = `
    <p class="text-center text-xl text-gray-600 font-semibold">OPPS! SORRY THERE IS NO BIRD HERE.</p>
`;

    return;
  }
  else {
    cardContainer.classList.add('grid');
  }

  // Loop through each item and create a card
  items.forEach(item => {
    const newCardDiv = document.createElement('div');
    newCardDiv.innerHTML = `
      <div class="card card-compact border-[1px] border-solid border-gray-400 p-4">
        <figure>
          <img class="w-[270px] h-[150px] rounded-xl" src="${item.image}" alt="pet-image" />
        </figure>
        <div class="card-body">
          <div class="flex flex-col gap-2">
            <h1 class="font-bold text-[20px] text-[#131313]">${item.pet_name}</h1>
            <p class="text-gray-500">Breed: ${item.breed || 'N/A'}</p>
            <p class="text-gray-500">Birth: ${item.date_of_birth || 'Unknown'}</p>
            <p class="text-gray-500">Gender: ${item.gender || 'Unknown'}</p>
            <p class="text-gray-500">Price: ${item.price ? `$${item.price}` : 'N/A'}</p>
          </div>
          <hr class="border-t-2">
          <div class="flex flex-row justify-between mt-1">
            <button class="btn"><i class="fa-solid fa-thumbs-up"></i></button>
            <button class="btn text-[#0E7A81] font-semibold">Adopt</button>
            <button class="btn text-[#0E7A81] font-semibold">Details</button>
          </div>
        </div>
      </div>
    `;
    cardContainer.append(newCardDiv);
  });
}

function move(){
  window.location.href = "./sort-by-price.html";
}
function backButton() {
  window.location.href = "./index.html";
}

function login(){
  window.location.href = "./login-section.html";
}


// Call the function to fetch and display categories
petCategories();
petList();
