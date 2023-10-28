const modal = document.querySelector("#create-modal");
const button = document.querySelector("#create-button");
const map = document.querySelector("#map");

button.addEventListener("click", () => {
  map.style.height = "50%";
  modal.style.display = "block";
});
