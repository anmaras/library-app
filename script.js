const addBookBtn = document.querySelector(".header-button");
const backDrop = document.querySelector(".backdrop");
const libraryForm = document.querySelector(".book-form");

const addBookHandler = function () {
  backDrop.classList.add("visible");
  libraryForm.classList.add("visible");
};

const addBackDropHandler = () => {
  backDrop.classList.remove("visible");
  libraryForm.classList.remove("visible");
};

addBookBtn.addEventListener("click", addBookHandler);
backDrop.addEventListener("click", addBackDropHandler);
