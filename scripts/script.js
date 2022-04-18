"use strict";
/* Colors */
const color = (() => {
  const HOT_MAGENTA = "#ff16cdff";
  const MELLOW_APROCOT = "#fdbb68ff";
  return { HOT_MAGENTA, MELLOW_APROCOT };
})();

/* Page elements */
const element = (() => {
  const bookSubmitBtn = document.querySelector(".button-submit");
  const checkBox = document.querySelector("#book-read");
  const booksList = document.querySelector(".books-list__items");
  const headerAddBookBtn = document.querySelector(".header-button");
  const formUserInputs = document.querySelectorAll("input");
  const backDrop = document.querySelector(".backdrop");
  const libraryForm = document.querySelector(".book-form");
  const ratingInput = document.querySelector("#book-rating");
  return {
    ratingInput,
    checkBox,
    bookSubmitBtn,
    booksList,
    headerAddBookBtn,
    formUserInputs,
    backDrop,
    libraryForm,
  };
})();

/* Main Array Library */
const array = (() => {
  let myLibrary = [];
  return {
    myLibrary,
  };
})();

// Utilities Functions Module
const utility = (() => {
  /* BackDrop and Form visibility toggle */
  function formAndBackDrop() {
    element.libraryForm.classList.toggle("visible");
    element.backDrop.classList.toggle("visible");
    _formInputsValuesClear();
  }
  /* Clear the form input values  */
  function _formInputsValuesClear() {
    for (let input of element.formUserInputs) {
      if (input.type === "text" || input.type === "number") {
        input.value = "";
      }
    }
  }
  function checkReadStatusForRatingValidation() {
    element.ratingInput.toggleAttribute("disabled");
  }

  /* Push the book object to the library */
  const pushBookToLibraryArray = function (book) {
    array.myLibrary.push(book);
  };

  /* Create the book  */
  function displayBooks(library) {
    /* without the loop and counter it creates duplicates */
    let counter = 0;
    for (let i = 1; i < array.myLibrary.length; i++) {
      counter++;
    }
    createCard(library[counter]);
  }

  return {
    checkReadStatusForRatingValidation,
    displayBooks,
    formAndBackDrop,
    pushBookToLibraryArray,
  };
})();

/* Class For Books */
class Books {
  constructor(title, author, rating, status) {
    this.title = title;
    this.author = author;
    this.status = status;
    this.rating = rating;
  }
}

/* Main function for creating book dom elements and event listeners for delete and read button */
function createCard(book) {
  const ID_EMPTY = "empty";
  const ID_FULL = "full";
  /* Elements create */
  const list = document.createElement("li");
  const listItemContainer = document.createElement("div");
  const bookListTitle = document.createElement("div");
  const starContainer = document.createElement("div");
  const bookListAuthor = document.createElement("div");
  const readStatusBtn = document.createElement("button");
  const deleteIcon = document.createElement("img");
  const starIconOutline = document.createElement("img");
  const starIconFull = document.createElement("img");
  const bookmarkCheckIcon = document.createElement("img");
  const bookmarkMinusIcon = document.createElement("img");
  /* Src for img elements */
  deleteIcon.src = "/icons/trash-can-outline.svg";
  starIconOutline.src = "/icons/star-outline.svg";
  starIconFull.src = "/icons/star.svg";
  bookmarkCheckIcon.src = "/icons/bookmark-check.svg";
  bookmarkMinusIcon.src = "/icons/bookmark-minus.svg";
  /* Class names for elements */
  list.className = "books-list__item";
  listItemContainer.className = "book-list__item-container";
  starContainer.className = "stars-container";
  bookListTitle.className = "book-list__item-title";
  bookListAuthor.className = "book-list__item-author";
  readStatusBtn.className = "read-status";
  deleteIcon.className = "book-list__item-delete";
  starIconOutline.className = "rating-stars";
  starIconFull.className = "rating-stars";
  bookmarkCheckIcon.className = "bookmark-check";
  bookmarkMinusIcon.className = "bookmark-minus";
  starIconFull.id = ID_FULL;
  starIconOutline.id = ID_FULL;
  /* text content for elements  */
  bookListTitle.textContent = book.title;
  bookListAuthor.textContent = `by ${book.author}`;

  /* Append function for rating stars */
  function appendStars() {
    /* Create 5 empty stars */
    for (let i = 0; i < 5; i++) {
      starContainer.append(starIconOutline.cloneNode(true));
    }
    /* if status true emty stars depend the user rating number will be replaced with full stars*/
    if (book.status) {
      readStatusBtn.style.background = color.HOT_MAGENTA;
      readStatusBtn.append(bookmarkCheckIcon);
      for (let i = 0; i < book.rating; i++) {
        starContainer.childNodes[i].src = starIconFull.src;
        starContainer.childNodes[i].id = ID_FULL;
      }
    } else {
      readStatusBtn.style.background = color.MELLOW_APROCOT;
      readStatusBtn.append(bookmarkMinusIcon);
      starContainer.classList.add("hidden");
    }
  }
  appendStars();

  /* Append all function */
  function appendAll() {
    listItemContainer.append(
      bookListTitle,
      bookListAuthor,
      readStatusBtn,
      starContainer,
      deleteIcon
    );
    list.append(listItemContainer);
    element.booksList.append(list);
  }
  appendAll();

  /* Function to toggle read status */
  function bookReadIconsToggle() {
    readStatusBtn.addEventListener("click", () => {
      if (book.status) {
        /* Change the book status to false */
        book.status = false;
        /* Change the bg color */
        readStatusBtn.style.background = color.MELLOW_APROCOT;
        /* Replace icon */
        bookmarkCheckIcon.replaceWith(bookmarkMinusIcon);
        /* Stars will be hidden */
        starContainer.classList.add("hidden");
        /* Reset stars to no rating */
        starContainer.childNodes.forEach(
          (node) => ((node.src = starIconOutline.src), (node.id = ID_EMPTY))
        );
      } else {
        book.status = true;
        readStatusBtn.style.background = color.HOT_MAGENTA;
        bookmarkMinusIcon.replaceWith(bookmarkCheckIcon);
        starContainer.classList.remove("hidden");
      }
    });
  }
  bookReadIconsToggle();

  /* Function so the user can change manual the star rating */
  function changeStarsRatingWithEvent() {
    /* Array from star nodelist */
    const starArray = Array.from(starContainer.childNodes);
    let i;
    starArray.forEach((star) =>
      star.addEventListener("click", function () {
        i = starArray.indexOf(this);
        /* if this id empty all the stars before will become full stars */
        if (this.id === ID_EMPTY) {
          for (i; i >= 0; --i) {
            starArray[i].id = ID_FULL;
            starArray[i].src = starIconFull.src;
          }
          /* if the id is full all the stars after will become empty */
        } else if (this.id === ID_FULL) {
          for (i; i < starArray.length; ++i) {
            starArray[i].id = ID_EMPTY;
            starArray[i].src = starIconOutline.src;
          }
        }
      })
    );
  }
  changeStarsRatingWithEvent();

  /* Delete function  , need to be "normal function so this work" */
  function deleteButton() {
    deleteIcon.addEventListener("click", function () {
      /* delete the parent of the delete img */
      element.booksList.removeChild(this.parentElement.parentElement);
      /* remove the item from the array list */
      array.myLibrary.splice(this, 1);
    });
  }
  deleteButton();
}

function addBookToLibrary() {
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const rating = document.getElementById("book-rating").value;
  const status = document.getElementById("book-read").checked;

  const book = new Books(title, author, rating, status);

  if (title.trim() === "" || author.trim() === "" || rating === "") {
    return;
  } else {
    array.myLibrary.push(book);
    utility.displayBooks(array.myLibrary);
    utility.formAndBackDrop();
  }
}

/* Event Listeners */

element.checkBox.addEventListener(
  "click",
  utility.checkReadStatusForRatingValidation
);

element.bookSubmitBtn.addEventListener("click", addBookToLibrary);

element.headerAddBookBtn.addEventListener("click", utility.formAndBackDrop);

element.backDrop.addEventListener("click", utility.formAndBackDrop);
