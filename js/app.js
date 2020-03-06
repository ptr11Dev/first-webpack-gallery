import "../sass/style.scss";

class Doge {
  constructor() {
    this.apiUrl = "https://dog.ceo/api";
    this.imgEl = document.querySelector(".random-dog img");
    this.bgcEl = document.querySelector(".random-dog__background");
    this.tilesEl = document.querySelector(".tiles");
    this.spinnerEl = document.querySelector(".spinner");

    this.init();
  }

  toggleLoading() {
    this.spinnerEl.classList.toggle("spinner-visible");
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

  showAllBreeds() {
    this.listBreeds().then(breeds => {
      for (const breed in breeds) {
        if (breeds[breed].length === 0) {
          this.addBreed(breed);
        } else {
          for (const subBreed of breeds[breed]) {
            this.addBreed(breed, subBreed);
          }
        }
      }
    });
  }

  showImageWhenReady(image) {
    this.imgEl.setAttribute("src", image);
    this.bgcEl.style.backgroundImage = `url("${image}")`;
    this.toggleLoading();
  }

  addBreed(breed, subBreed) {
    let name;
    let type;

    if (typeof subBreed === "undefined") {
      name = breed;
      type = breed;
    } else {
      name = `${breed} ${subBreed}`;
      type = `${breed}/${subBreed}`;
    }
    const tile = document.createElement("div");
    tile.classList.add("tiles__tile");
    const tileContent = document.createElement("div");
    tileContent.classList.add("tiles__tile-content");
    tileContent.innerText = name;

    tileContent.addEventListener("click", () => {
      document.body.scrollIntoView({
        behavior: "smooth"
      });
      this.toggleLoading();
      this.getRandomImageByBreed(type).then(img =>
        this.showImageWhenReady(img)
      );
    });
    tile.appendChild(tileContent);
    this.tilesEl.appendChild(tile);
  }

  init() {
    this.toggleLoading();
    this.getRandomImage().then(img => this.showImageWhenReady(img));

    this.showAllBreeds();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Doge();
});
