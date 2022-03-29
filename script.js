const addBookBtn = document.querySelector(".header-button");
const backDrop = document.querySelector(".backdrop");
const libraryForm = document.querySelector(".book-form");
const bookSubmitBtn = document.querySelector(".button-submit");

let myLibrary = [];

function Books(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Books.prototype.readCheck = function () {
  return this.readStatus
    ? (this.readStatus = "Read")
    : (this.readStatus = "Unread");
};

const renderBookList = () => {
  const booksList = document.querySelector(".books-list__items");
  if (myLibrary.length !== 0) {
    booksList.classList.add("visible");
  } else return;

  // need to refactor this
  booksList.replaceChildren();

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

    bookListTitle.textContent = book.title;
    bookListAuthor.textContent = book.author;
    bookListPage.textContent = book.pages;
    readStatusBtn.textContent = book.readStatus;
    deleteBookBtn.textContent = "Remove";

    booksList.append(list);
    list.append(bookListTitle);
    list.append(bookListAuthor);
    list.append(bookListPage);
    list.append(readStatusBtn);
    list.append(deleteBookBtn);

    // need to be normal function to work this in delete
    deleteBookBtn.addEventListener("click", function () {
      const listItem = document.querySelector(".books-list__items");
      listItem.removeChild(this.parentElement);
      myLibrary.splice(book, 1);
    });
  });
};

function addBookToLibraryHandler() {
  const bookTitle = document.getElementById("book-title").value;
  const bookAuthor = document.getElementById("book-author").value;
  const bookPages = document.getElementById("book-pages").value;
  const checkbox = document.getElementById("book-read").checked;

  const book = new Books(bookTitle, bookAuthor, bookPages, checkbox);
  myLibrary.push(book);
  book.readCheck();
  // addBackDropHandler();
  renderBookList();
}

const showBookFormHandler = function () {
  backDrop.classList.add("visible");
  libraryForm.classList.add("visible");
};

const addBackDropHandler = () => {
  backDrop.classList.remove("visible");
  libraryForm.classList.remove("visible");
};

addBookBtn.addEventListener("click", showBookFormHandler);

backDrop.addEventListener("click", addBackDropHandler);

bookSubmitBtn.addEventListener("click", addBookToLibraryHandler);
