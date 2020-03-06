import "../sass/style.scss";

const apiUrl = "https://dog.ceo/api";

const listBreeds = () => {
  return fetch(`${apiUrl}/breeds/list/all`)
    .then(res => res.json())
    .then(data => data.message);
};

const getRandomImage = () => {
  return fetch(`${apiUrl}/breeds/image/random`)
    .then(res => res.json())
    .then(data => data.message);
};
const getRandomImageByBreed = breed => {
  return fetch(`${apiUrl}/breed/${breed}/images/random`)
    .then(res => res.json())
    .then(img => img.message);
};
