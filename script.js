const addBookBtn = document.querySelector(".header-button");
const backDrop = document.querySelector(".backdrop");
const libraryForm = document.querySelector(".book-form");
const bookSubmitBtn = document.querySelector(".button-submit");
const booksList = document.querySelector(".books-list__items");

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

  if (bookTitle === "" || bookAuthor === "" || bookPages === "") return;

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

    list.className = "books-list__item";
    bookListTitle.className = "book-list__item-title";
    bookListAuthor.className = "book-list__item-author";
    bookListPage.className = "book-list__item-pages";
    readStatusBtn.className = "read-status";
    deleteBookBtn.className = "book-list__item-delete";

    bookListTitle.textContent = `Book Title: ${book.title}`;
    bookListAuthor.textContent = `Book Authot: ${book.author}`;
    bookListPage.textContent = `Pages: ${book.pages}`;
    deleteBookBtn.textContent = "Remove";

    booksList.append(list);
    list.append(
      bookListTitle,
      bookListAuthor,
      bookListPage,
      readStatusBtn,
      deleteBookBtn
    );

    if (book.readStatus) {
      readStatusBtn.style.background = "green";
      readStatusBtn.textContent = "Read";
    } else {
      readStatusBtn.style.background = "red";
      readStatusBtn.textContent = "Unread";
    }

    deleteBookBtn.addEventListener("click", function () {
      booksList.removeChild(this.parentElement);
      myLibrary.splice(this, 1);
    });

    readStatusBtn.addEventListener("click", () => {
      if (readStatusBtn.textContent === "Read") {
        readStatusBtn.textContent = "Unread";
        readStatusBtn.style.background = "red";
      } else {
        readStatusBtn.textContent = "Read";
        readStatusBtn.style.background = "green";
      }
    });
  });
};

addBookBtn.addEventListener("click", showBookFormHandler);

backDrop.addEventListener("click", removeBackDropAndFormHandler);

bookSubmitBtn.addEventListener("click", addBookToLibraryHandler);
