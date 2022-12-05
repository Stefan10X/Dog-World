"use strict";

//! Display dogs

const searchSizeBtn = document.querySelector(".search-size-btn");
const searchNameBtn = document.querySelector(".search-name-btn");
const searchName = document.querySelector(".search-name");
const sizeDropdown = document.querySelector(".size-dropdown");
const dogList = document.querySelector(".dog-list");
const dogHeader = document.querySelector(".dog-header");
const dogInfoModal = document.querySelector(".dog-info-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

sizeDropdown.addEventListener("click", function () {
  searchName.value = "";
});

const searchByName = function () {
  let html = "";
  $.getJSON(`./dogs.json`, function (data) {
    data.forEach((dog) => {
      if (searchName.value.length === 0) {
        html = "<h1 class = 'error-message'>ENTER THE NAME!</h1>";
        document.querySelector(".info").classList.add("hidden");
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
        document.querySelector(".info").classList.remove("hidden");
      }
    });
    dogList.innerHTML = html;
    if (dogList.innerHTML === "") {
      html = "<h1 class = 'error-message'>NOTHING FOUND!</h1>";
      dogList.innerHTML = html;
      document.querySelector(".info").classList.add("hidden");
    }
  });
};

searchSizeBtn.addEventListener("click", function () {
  let html = "";
  $.getJSON(`./dogs.json`, function (data) {
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
        document.querySelector(".info").classList.remove("hidden");
      } else if (
        sizeDropdown.value === "medium" &&
        dog.lowerHeight > 30 &&
        dog.lowerHeight < 50
      ) {
        dogList();
        document.querySelector(".info").classList.remove("hidden");
      } else if (sizeDropdown.value === "big" && dog.lowerHeight > 50) {
        dogList();
        document.querySelector(".info").classList.remove("hidden");
      } else if (sizeDropdown.value === "all") {
        dogList();
        document.querySelector(".info").classList.remove("hidden");
      }
    });
    dogList.innerHTML = html;
  });
});

searchNameBtn.addEventListener("click", function () {
  searchByName();
});

searchName.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchByName();
  }
});

//! Create modal

dogList.addEventListener("click", function (e) {
  let html1 = "";
  let html2 = "";
  document.querySelector("body").classList.add("hide_overflowY");
  $.getJSON("./dogs.json", function (data) {
    data.forEach((dog) => {
      if (e.target.innerText === dog.name) {
        openModal();
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

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  document.querySelector("body").classList.remove("hide_overflowY");
  document.querySelector(".all-images").innerHTML = "";
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    document.querySelector("body").classList.remove("hide_overflowY");
    closeModal();
  }
});

document.querySelector(".show-images").addEventListener("click", function () {
  const searchKeyword =
    document.querySelector(".dog-header").children[0].innerText;
  window.open(`https://www.google.com/search?tbm=isch&q=${searchKeyword}`);
});
