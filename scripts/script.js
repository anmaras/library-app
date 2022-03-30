const addBookBtn = document.querySelector(".header-button");
const backDrop = document.querySelector(".backdrop");
const libraryForm = document.querySelector(".book-form");
const bookSubmitBtn = document.querySelector(".button-submit");
const booksList = document.querySelector(".books-list__items");
const HOT_MAGENTA = "#ff16cdff";
const MELLOW_APROCOT = "#fdbb68ff";

let myLibrary = [];

// Utilities Functions

const showBookFormHandler = function () {
  backDrop.classList.add("visible");
  libraryForm.classList.add("visible");
  formInputsClear();
};

const formInputsClear = function () {
  document.getElementById("book-title").value = "";
  document.getElementById("book-author").value = "";
  document.getElementById("book-pages").value = "";
};

const removeBackDropAndFormHandler = function () {
  backDrop.classList.remove("visible");
  libraryForm.classList.remove("visible");
};

const checkMyLibraryLength = () => {
  if (myLibrary.length !== 0) {
    booksList.classList.add("visible");
    booksList.replaceChildren();
  } else return;
};

//Constructor Function

function Books(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibraryHandler() {
  const bookTitle = document.getElementById("book-title").value;
  const bookAuthor = document.getElementById("book-author").value;
  const bookPages = document.getElementById("book-pages").value;
  const checkbox = document.getElementById("book-read").checked;

  // if (bookTitle === "" || bookAuthor === "" || bookPages === "") return;

  const book = new Books(bookTitle, bookAuthor, bookPages, checkbox);

  myLibrary.push(book);

  renderBookList();
  removeBackDropAndFormHandler();
}

//Library DOM create book items function

const renderBookList = function () {
  checkMyLibraryLength();

  myLibrary.forEach((book) => {
    const list = document.createElement("li");
    const bookListTitle = document.createElement("div");
    const bookListAuthor = document.createElement("div");
    const bookListPage = document.createElement("div");
    const readStatusBtn = document.createElement("button");
    const deleteBookBtn = document.createElement("button");
    const image = document.createElement("img");

    image.src = "/icons/trash-can-outline.svg";

    list.className = "books-list__item";
    bookListTitle.className = "book-list__item-title";
    bookListAuthor.className = "book-list__item-author";
    bookListPage.className = "book-list__item-pages";
    readStatusBtn.className = "read-status";
    deleteBookBtn.className = "book-list__item-delete";
    image.className = "delete-btn__img";

    bookListTitle.textContent = `Book Title: ${book.title}`;
    bookListAuthor.textContent = `Book Author: ${book.author}`;
    bookListPage.textContent = `Pages: ${book.pages}`;

    booksList.append(list);
    list.append(
      bookListTitle,
      bookListAuthor,
      bookListPage,
      readStatusBtn,
      deleteBookBtn
    );
    deleteBookBtn.append(image);

    if (book.readStatus) {
      readStatusBtn.style.background = HOT_MAGENTA;
      readStatusBtn.textContent = "Read";
    } else {
      readStatusBtn.style.background = MELLOW_APROCOT;
      readStatusBtn.textContent = "Unread";
    }

    deleteBookBtn.addEventListener("click", function () {
      booksList.removeChild(this.parentElement);
      myLibrary.splice(this, 1);
    });

    readStatusBtn.addEventListener("click", () => {
      if (readStatusBtn.textContent === "Read") {
        readStatusBtn.textContent = "Unread";
        readStatusBtn.style.background = MELLOW_APROCOT;
      } else {
        readStatusBtn.textContent = "Read";
        readStatusBtn.style.background = HOT_MAGENTA;
      }
    });
  });
};

addBookBtn.addEventListener("click", showBookFormHandler);

backDrop.addEventListener("click", removeBackDropAndFormHandler);

bookSubmitBtn.addEventListener("click", addBookToLibraryHandler);
