const addBookBtn = document.querySelector(".header-button");
const backDrop = document.querySelector(".backdrop");
const libraryForm = document.querySelector(".book-form");
const bookSubmitBtn = document.querySelector(".button-submit");

let myLibrary = [];

function Books(title, author, pages, id) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
}

Books.prototype.delete = function (e) {
  // const list = document.querySelector(".books-list__items");
  const listItem = document.querySelector(".book-list__item-title");
};

const renderBookList = () => {
  const booksList = document.querySelector(".books-list__items");
  if (myLibrary.length !== 0) {
    booksList.classList.add("visible");
  }

  booksList.innerHTML = "";

  myLibrary.forEach((book) => {
    const list = document.createElement("li");
    const bookListTitle = document.createElement("div");
    const bookListAuthor = document.createElement("div");
    const bookListPage = document.createElement("div");
    const readStatusBtn = document.createElement("button");
    const deleteBookBtn = document.createElement("button");

    list.classList = "books-list__item";
    bookListTitle.className = "book-list__item-title";
    bookListAuthor.className = "book-list__item-author";
    bookListPage.className = "book-list__item-pages";
    readStatusBtn.className = "read-status";
    deleteBookBtn.className = "book-list__item-delete";

    bookListTitle.textContent = book.title;
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

    deleteBookBtn.addEventListener("click", () => {
      console.log(book.id);
    });
  });
};

function addBookToLibraryHandler() {
  const bookTitle = document.getElementById("book-title").value;
  const bookAuthor = document.getElementById("book-author").value;
  const bookPages = document.getElementById("book-pages").value;
  const randomId = Math.random();

  const book = new Books(bookTitle, bookAuthor, bookPages, randomId);
  myLibrary.push(book);
  addBackDropHandler();
  renderBookList();
}

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
bookSubmitBtn.addEventListener("click", addBookToLibraryHandler);
