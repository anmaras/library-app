const addBookBtn = document.querySelector(".header-button");
const backDrop = document.querySelector(".backdrop");
const libraryForm = document.querySelector(".book-form");
const bookSubmitBtn = document.querySelector(".button-submit");

let myLibrary = [];

const addBookHandler = function () {
  backDrop.classList.add("visible");
  libraryForm.classList.add("visible");
};

const addBackDropHandler = () => {
  backDrop.classList.remove("visible");
  libraryForm.classList.remove("visible");
};

function Books(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

Books.prototype.upperCase = function () {
  return `Book Title : ${this.title}`;
};

const renderBookList = () => {
  const booksList = document.querySelector(".books-list__items");
  // if the size of array is not 0
  if (myLibrary.length !== 0) {
    booksList.classList.add("visible");
  }

  booksList.replaceChildren();

  myLibrary.forEach((book) => {
    const bookListTitle = document.createElement("div");
    const bookListAuthor = document.createElement("div");
    const bookListPage = document.createElement("div");
    const readStatusBtn = document.createElement("button");
    const deleteBookBtn = document.createElement("button");
    const list = document.createElement("li");

    list.classList = "books-list__item";
    bookListTitle.className = "book-list__item-title";
    bookListAuthor.className = "book-list__item-author";
    bookListPage.className = "book-list__item-pages";
    readStatusBtn.className = "read-status";
    deleteBookBtn.className = "book-list__item-delete";

    bookListTitle.textContent = book.upperCase();
    bookListAuthor.textContent = book.author;
    bookListPage.textContent = book.pages;
    readStatusBtn.textContent = "Read-Status";
    deleteBookBtn.textContent = "Remove";

    booksList.append(list);
    list.append(bookListTitle);
    list.append(bookListAuthor);
    list.append(bookListPage);
    list.append(readStatusBtn);
    list.append(deleteBookBtn);
  });
};

renderBookList();

function addBookToLibraryHandler() {
  const bookTitle = document.getElementById("book-title").value;
  const bookAuthor = document.getElementById("book-author").value;
  const bookPages = document.getElementById("book-pages").value;

  const book = new Books(bookTitle, bookAuthor, bookPages);
  myLibrary.push(book);

  addBackDropHandler();
  renderBookList();
}

addBookBtn.addEventListener("click", addBookHandler);
backDrop.addEventListener("click", addBackDropHandler);
bookSubmitBtn.addEventListener("click", addBookToLibraryHandler);
