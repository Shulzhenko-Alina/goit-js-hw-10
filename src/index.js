import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_xkmqLtNXgSWjeu9qIYdel9WenDC1jjwXlJ7YMZbTtjuBD1Si3DGxQZJIuE5B6Wpz";

// Функція для отримання списку порід
async function fetchBreeds() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch breeds");
  }
}

// Функція для отримання інформації про кота за його породою
async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );

    if (response.data.length === 0) {
      return null;
    }

    return response.data;
  } catch (error) {
    return null;
  }
}

// Функція для заповнення select.breed-select опціями
async function populateBreedsSelect() {
  const breedSelect = document.querySelector(".breed-select");
  const loader = document.querySelector(".loader");

  try {
    const breeds = await fetchBreeds();
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    breedSelect.addEventListener("change", async (event) => {
      const selectedBreedId = event.target.value;
      if (selectedBreedId) {
        loader.style.display = "block";
        try {
          const catInfo = await fetchCatByBreed(selectedBreedId);
          displayCatInfo(catInfo[0]);
        } catch (error) {
          displayError();
        } finally {
          loader.style.display = "none";
        }
      } else {
        hideCatInfo();
      }
    });
  } catch (error) {
    displayError();
  } finally {
    loader.style.display = "none";
  }
 
}

// Функція для відображення інформації про кота
function displayCatInfo(cat) {
  const catInfoDiv = document.querySelector(".cat-info");
  catInfoDiv.innerHTML = `
    <h2>${cat.breeds[0].name}</h2>
    <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
    <img src="${cat.url}" alt="${cat.breeds[0].name}" />
  `;
  catInfoDiv.style.display = "block";
}

// Функція для приховання інформації про кота
function hideCatInfo() {
  const catInfoDiv = document.querySelector(".cat-info");
  catInfoDiv.innerHTML = "";
  catInfoDiv.style.display = "none";
}

 // Приховати зображення кота також
 const catImage = document.querySelector(".cat-info img");
 if (catImage) {
   catImage.style.display = "none";
 }


// Функція для відображення помилки
function displayError() {
  const errorDiv = document.querySelector(".error");
  errorDiv.style.display = "block";
  setTimeout(() => {
    errorDiv.style.display = "none";
  }, 3000); // Приховати помилку після 3 секунд
}

// Виклик функції для заповнення select.breed-select опціями
populateBreedsSelect();