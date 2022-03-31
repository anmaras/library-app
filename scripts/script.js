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
  // formInputsClear();
};

const formInputsClear = function () {
  document.getElementById("book-title").value = "";
  document.getElementById("book-author").value = "";
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

function Books(title, author, readStatus) {
  this.title = title;
  this.author = author;
  this.readStatus = readStatus;
}

//Library DOM create book items function

const renderBookList = function () {
  checkMyLibraryLength();

  myLibrary.forEach((book) => {
    //Create  the li and li items
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

    //img srcs
    deleteIcon.src = "/icons/trash-can-outline.svg";
    starIcon.src = "/icons/star-outline.svg";
    bookmarkCheckIcon.src = "/icons/bookmark-check.svg";
    bookmarkMinusIcon.src = "/icons/bookmark-minus.svg";

    //class names assign
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

    //text content assign
    bookListTitle.textContent = `${book.title}`;
    bookListAuthor.textContent = `by ${book.author}`;

    //append to list
    list.append(listItemContainer);

    //append to listItemContainer
    listItemContainer.append(
      bookListTitle,
      bookListAuthor,
      readStatusBtn,
      starContainer,
      deleteIcon
    );

    //append star img 5 times
    for (let i = 0; i < 5; i++) {
      starContainer.append(starIcon.cloneNode(true));
    }

    if (book.readStatus) {
      readStatusBtn.id = "read";
      readStatusBtn.style.background = HOT_MAGENTA;
      readStatusBtn.append(bookmarkCheckIcon);
    } else {
      readStatusBtn.id = "not_read";

      readStatusBtn.style.background = MELLOW_APROCOT;
      readStatusBtn.append(bookmarkMinusIcon);
    }

    deleteIcon.addEventListener("click", function () {
      booksList.removeChild(this.parentElement.parentElement);
      myLibrary.splice(this, 1);
    });

    readStatusBtn.addEventListener("click", () => {
      if (readStatusBtn.id === "read") {
        readStatusBtn.id = "not_read";
        bookmarkCheckIcon.replaceWith(bookmarkMinusIcon);
        readStatusBtn.style.background = MELLOW_APROCOT;
      } else if (readStatusBtn.id === "not_read") {
        readStatusBtn.id = "read";
        bookmarkMinusIcon.replaceWith(bookmarkCheckIcon);
        readStatusBtn.style.background = HOT_MAGENTA;
      }
    });
    booksList.append(list);
  });
};

function addBookToLibraryHandler() {
  const bookTitle = document.getElementById("book-title").value;
  const bookAuthor = document.getElementById("book-author").value;
  const checkbox = document.getElementById("book-read").checked;

  // if (bookTitle === "" || bookAuthor === "" || bookPages === "") return;

  const book = new Books(bookTitle, bookAuthor, checkbox);

  myLibrary.push(book);

  renderBookList();
  removeBackDropAndFormHandler();
}

addBookBtn.addEventListener("click", showBookFormHandler);

backDrop.addEventListener("click", removeBackDropAndFormHandler);

bookSubmitBtn.addEventListener("click", addBookToLibraryHandler);
