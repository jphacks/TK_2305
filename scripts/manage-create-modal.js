const map = document.getElementById("map");
const modal = document.getElementById("create-modal");
const openButton = document.getElementById("create-button");
const form = document.getElementById("create-form");

openButton.addEventListener("click", () => {
  map.style.height = "50%";
  modal.style.display = "block";
});
form.addEventListener("submit", (event) => {
  event.preventDefault();

  map.style.height = "100%";
  modal.style.display = "none";
});
