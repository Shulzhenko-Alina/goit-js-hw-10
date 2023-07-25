const url = 'https://api.thecatapi.com/v1';
const api_key = "live_xkmqLtNXgSWjeu9qIYdel9WenDC1jjwXlJ7YMZbTtjuBD1Si3DGxQZJIuE5B6Wpz";

export function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });       
};

export function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });  
};