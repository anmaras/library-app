const addBookBtn = document.querySelector(".header-button");
const backDrop = document.querySelector(".backdrop");
const libraryForm = document.querySelector(".book-form");
const bookSubmitBtn = document.querySelector(".button-submit");
const booksList = document.querySelector(".books-list__items");

let myLibrary = [];

// Utilities Function

const showBookFormHandler = function () {
  backDrop.classList.add("visible");
  libraryForm.classList.add("visible");
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

    bookListTitle.textContent = book.title;
    bookListAuthor.textContent = book.author;
    bookListPage.textContent = book.pages;
    deleteBookBtn.textContent = "Remove";

    booksList.append(list);
    list.append(
      bookListTitle,
      bookListAuthor,
      bookListPage,
      readStatusBtn,
      deleteBookBtn
    );

    deleteBookBtn.addEventListener("click", function () {
      booksList.removeChild(this.parentElement);
      myLibrary.splice(this, 1);
      console.log(myLibrary);
    });

    if (book.readStatus) {
      readStatusBtn.style.background = "green";
      readStatusBtn.textContent = "Read";
    } else {
      readStatusBtn.style.background = "red";
      readStatusBtn.textContent = "Unread";
    }
  });
};

addBookBtn.addEventListener("click", showBookFormHandler);

backDrop.addEventListener("click", removeBackDropAndFormHandler);

bookSubmitBtn.addEventListener("click", addBookToLibraryHandler);
