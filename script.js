"use strict";

const logo = document.querySelector(".logo");
const sizeDropdown = document.querySelector(".size-dropdown");
const searchSizeBtn = document.querySelector(".search-size-btn");
const searchName = document.querySelector(".search-name");
const searchNameBtn = document.querySelector(".search-name-btn");
const dogList = document.querySelector(".dog-list");
const dogInfo = document.querySelector(".dog-info");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const dogHeader = document.querySelector(".dog-header-modal");
const dogInfoModal = document.querySelector(".dog-info-modal");

logo.addEventListener("click", function () {
  window.location.reload();
});

//Search dogs by size

searchSizeBtn.addEventListener("click", function () {
  let html = "<h1 class = 'info'>CLICK ON DOG NAME TO DISPLAY MORE INFO!</h1>";
  fetch(`./dogs.json`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((dog) => {
        const dogList = function () {
          html += `
                  <div class = 'dog-info'>
                    <p class = 'dog-name'>${dog.name}</p>
                    <img class = 'dog-img' src = '${dog.image.url}'>
                  </div>  
                  `;
        };
        const lowerHeight = Number(dog.height.metric.split(" ")[0]);
        dog.lowerHeight = lowerHeight;
        if (sizeDropdown.value === "small" && dog.lowerHeight < 30) {
          dogList();
        } else if (
          sizeDropdown.value === "medium" &&
          dog.lowerHeight > 30 &&
          dog.lowerHeight < 50
        ) {
          dogList();
        } else if (sizeDropdown.value === "large" && dog.lowerHeight > 50) {
          dogList();
        } else if (sizeDropdown.value === "all") {
          dogList();
        }
      });
      dogList.innerHTML = html;
    });
});

//Search dogs by name or keyword

const searchByName = function () {
  let html = "<h1 class = 'info'>CLICK ON DOG NAME TO DISPLAY MORE INFO!</h1>";
  fetch(`./dogs.json`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((dog) => {
        if (searchName.value.length === 0) {
          html = "<h1 class = 'error-message'>ENTER THE NAME!</h1>";
        } else if (
          searchName.value === dog.name ||
          searchName.value === dog.name.toLowerCase()
        ) {
          html += `
          <div class = 'dog-info centered'>
            <p class = 'dog-name'>${dog.name}</p>
            <img class = 'dog-img' src = '${dog.image.url}'>
          </div>  
          `;
        } else if (
          dog.name.includes(searchName.value) ||
          dog.name.toLowerCase().includes(searchName.value)
        ) {
          html += `
        <div class = 'dog-info'>
          <p class = 'dog-name'>${dog.name}</p>
          <img class = 'dog-img' src = '${dog.image.url}'>
        </div>
        `;
        }
      });
      if (
        html ===
        "<h1 class = 'info'>CLICK ON DOG NAME TO DISPLAY MORE INFO!</h1>"
      ) {
        html = "<h1 class = 'error-message'>NOTHING FOUND!</h1>";
      }
      dogList.innerHTML = html;
    });
};

searchNameBtn.addEventListener("click", function () {
  searchByName();
});

searchName.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchByName();
  }
});

sizeDropdown.addEventListener("click", function () {
  searchName.value = "";
});

// Create modal

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  document.querySelector("body").classList.remove("hide_overflowY");
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    document.querySelector("body").classList.remove("hide_overflowY");
    closeModal();
  }
});

dogList.addEventListener("click", function (e) {
  let html1 = "";
  let html2 = "";
  fetch(`./dogs.json`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((dog) => {
        if (
          e.target.className === "dog-name" &&
          e.target.innerText === dog.name
        ) {
          openModal();
          document.querySelector("body").classList.add("hide_overflowY");
          html1 = `
          <h1>${dog.name}</h1>
          <img class = 'dog-img-modal' src =${dog.image.url}>
          `;
          if (dog.origin !== "" && dog.origin !== undefined) {
            html2 += `
              <p> <strong>Origin:</strong> ${dog.origin}</p>
            `;
          }
          if (dog.bred_for !== "" && dog.bred_for !== undefined) {
            html2 += `
            <p> <strong>Breed for:</strong> ${dog.bred_for}</p>
              `;
          }
          if (dog.life_span !== "" && dog.life_span !== undefined) {
            html2 += `
            <p> <strong>Life span:</strong> ${dog.life_span}</p>
              `;
          }
          if (dog.temperament !== "" && dog.temperament !== undefined) {
            html2 += `
            <p> <strong>Temperament:</strong> ${dog.temperament}</p>
              `;
          }
          if (dog.weight.metric !== "" && dog.weight.metric !== undefined) {
            html2 += `
            <p> <strong>Weight:</strong> ${dog.weight.metric} kg</p>
              `;
          }
          if (dog.breed_group !== "" && dog.breed_group !== undefined) {
            html2 += `
              <p> <strong>Breed group:</strong> ${dog.breed_group}</p>
              `;
          }
        }
      });
      dogHeader.innerHTML = html1;
      dogInfoModal.innerHTML = html2;
    });
});

document.querySelector(".show-images").addEventListener("click", function () {
  const searchKeyword =
    document.querySelector(".dog-header-modal").children[0].innerText;
  window.open(`https://www.google.com/search?tbm=isch&q=${searchKeyword}`);
});
