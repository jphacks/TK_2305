const map = document.querySelector("#map");
const modal = document.querySelector("#create-modal");
const openButton = document.querySelector("#create-button");
const form = document.querySelector("#create-form");

openButton.addEventListener("click", () => {
  map.style.height = "50%";
  modal.style.display = "block";
});
form.addEventListener("submit", (event) => {
  event.preventDefault();

  map.style.height = "100%";
    modal.style.display = "none";
});