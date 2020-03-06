import "../sass/style.scss";

class Doge {
  constructor() {
    this.apiUrl = "https://dog.ceo/api";
    this.imgEl = document.querySelector(".featured-dog img");

    this.init();
  }

  listBreeds() {
    return fetch(`${this.apiUrl}/breeds/list/all`)
      .then(res => res.json())
      .then(data => data.message);
  }

  getRandomImage() {
    return fetch(`${this.apiUrl}/breeds/image/random`)
      .then(res => res.json())
      .then(data => data.message);
  }

  getRandomImageByBreed(breed) {
    return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
      .then(res => res.json())
      .then(img => img.message);
  }

  init() {
    this.getRandomImage().then(img => this.imgEl.setAttribute("src", img));

    this.listBreeds().then(breeds => console.log(breeds));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Doge();
});
