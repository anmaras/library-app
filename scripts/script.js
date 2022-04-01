"use strict";
const headerAddBookBtn = document.querySelector(".header-button");
const backDrop = document.querySelector(".backdrop");
const libraryForm = document.querySelector(".book-form");
const bookSubmitBtn = document.querySelector(".button-submit");
const booksList = document.querySelector(".books-list__items");
const HOT_MAGENTA = "#ff16cdff";
const MELLOW_APROCOT = "#fdbb68ff";

const mainFragment = new DocumentFragment();

let myLibrary = [];

// Utilities Functions

const formAndBackDropHandler = function () {
  libraryForm.classList.toggle("visible");
  backDrop.classList.toggle("visible");
  formInputsValuesClear();
};

const formInputsValuesClear = function () {
  const formUserInputs = document.querySelectorAll("input");
  for (let input of formUserInputs) {
    if (input.type === "text") {
      input.value = "";
    }
  }
};
const checkMyLibraryLength = () => {
  if (myLibrary.length !== 0) {
    booksList.classList.add("visible");
  } else return;
};

//Constructor Function

function Books(title, author, readStatus) {
  this.title = title;
  this.author = author;
  this.readStatus = readStatus;
}

//Library DOM create book items function

Books.prototype.renderBookList = function (title, author, status) {
  const list = document.createElement("li");
  const listItemContainer = document.createElement("div");
  const bookListTitle = document.createElement("div");
  const starContainer = document.createElement("div");
  const bookListAuthor = document.createElement("div");
  const readStatusBtn = document.createElement("button");
  const deleteIcon = document.createElement("img");
  const starIcon = document.createElement("img");
  const bookmarkCheckIcon = document.createElement("img");
  const bookmarkMinusIcon = document.createElement("img");

  deleteIcon.src = "/icons/trash-can-outline.svg";
  starIcon.src = "/icons/star-outline.svg";
  bookmarkCheckIcon.src = "/icons/bookmark-check.svg";
  bookmarkMinusIcon.src = "/icons/bookmark-minus.svg";

  list.className = "books-list__item";
  listItemContainer.className = "book-list__item-container";
  starContainer.className = "stars-container";
  bookListTitle.className = "book-list__item-title";
  bookListAuthor.className = "book-list__item-author";
  readStatusBtn.className = "read-status";
  deleteIcon.className = "book-list__item-delete";
  starIcon.className = "rating-stars";
  bookmarkCheckIcon.className = "bookmark-check";
  bookmarkMinusIcon.className = "bookmark-minus";

  bookListTitle.textContent = title;
  bookListAuthor.textContent = `by ${author}`;

  if (status) {
    readStatusBtn.style.background = HOT_MAGENTA;
    readStatusBtn.append(bookmarkCheckIcon);
  } else {
    readStatusBtn.style.background = MELLOW_APROCOT;
    readStatusBtn.append(bookmarkMinusIcon);
  }

  for (let i = 0; i < 5; i++) {
    starContainer.append(starIcon.cloneNode(true));
  }

  readStatusBtn.addEventListener("click", () => {
    if (status) {
      status = false;
      readStatusBtn.style.background = MELLOW_APROCOT;
      bookmarkCheckIcon.replaceWith(bookmarkMinusIcon);
    } else {
      status = true;
      readStatusBtn.style.background = HOT_MAGENTA;
      bookmarkMinusIcon.replaceWith(bookmarkCheckIcon);
    }
  });

  deleteIcon.addEventListener("click", function () {
    booksList.removeChild(this.parentElement.parentElement);
    myLibrary.splice(this, 1);
  });

  listItemContainer.append(
    bookListTitle,
    bookListAuthor,
    readStatusBtn,
    starContainer,
    deleteIcon
  );
  list.append(listItemContainer);
  mainFragment.append(list);
};

Books.prototype.append = function () {
  booksList.append(mainFragment);
};

window.addEventListener("click", (e) => {
  console.log(e.target);
});

function addBookToLibraryHandler() {
  const bookTitle = document.getElementById("book-title").value;
  const bookAuthor = document.getElementById("book-author").value;
  const checkbox = document.getElementById("book-read").checked;

  if (bookTitle.trim() === "" || bookAuthor.trim() === "") return;

  const book = new Books(bookTitle, bookAuthor, checkbox);

  myLibrary.splice(0, 0, book);
  checkMyLibraryLength();
  book.renderBookList(book.title, book.author, checkbox);
  book.append();
  formAndBackDropHandler();
}

headerAddBookBtn.addEventListener("click", formAndBackDropHandler);

backDrop.addEventListener("click", formAndBackDropHandler);

bookSubmitBtn.addEventListener("click", addBookToLibraryHandler);
