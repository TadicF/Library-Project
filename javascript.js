const myLibrary = [];
let bookCount = 0;
// To do: Check title inputs to make sure there are no multiple title's of same name

function Book(title, author, pages, isRead, rating) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.rating = rating;
}

Book.prototype.changeReadStatus = function() { 
  if(this.isRead === true) {
    this.isRead = false;
  }
  else if(this.isRead === false) {
    this.isRead = true;
  }
}

function addBookToLibrary(title, author, pages, isRead, rating) {
  let newBook = new Book(title, author, pages, isRead, rating);
  myLibrary.push(newBook);
  bookCount++;
}

function displayBooks(myLibrary) {
  const mainLibrary = document.querySelector(".main")
  for(let i = bookCount; i < myLibrary.length + 1; i++) {
    // Create a new Book Card element and append it to the Main parent  
    const bookCard = document.createElement('div');
    bookCard.classList.add("book-card");
    // Every book will have different data value
    mainLibrary.appendChild(bookCard);

    // Creating Title 
    const titleContainer = document.createElement('div');
    titleContainer.classList.add("titleContainer");
    bookCard.appendChild(titleContainer);

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = 'Title:'
    titleContainer.appendChild(title);

    const book_title = document.createElement('div');
    book_title.classList.add("book-title");
    book_title.textContent = `${myLibrary[i-1].title}`;  
    // Add Title to bookcard data
    bookCard.setAttribute('data-book', `${book_title.textContent}`);
    titleContainer.appendChild(book_title);
    
    // Creating Author
    const authorContainer = document.createElement('div');
    authorContainer.classList.add("authorContainer");
    bookCard.appendChild(authorContainer);

    const author = document.createElement('div');
    author.classList.add("author");
    author.textContent = 'Author:';
    authorContainer.appendChild(author);

    const book_author = document.createElement('div');
    book_author.classList.add('book-author');
    book_author.textContent = `${myLibrary[i-1].author}`;
    authorContainer.appendChild(book_author);

    // Creating Pages
    const pagesContainer = document.createElement('div');
    pagesContainer.classList.add("pagesContainer");
    bookCard.appendChild(pagesContainer);

    const pages = document.createElement('div');
    pages.classList.add('pages');
    pages.textContent = 'Pages:'
    pagesContainer.appendChild(pages);

    const book_pages = document.createElement('div');
    book_pages.classList.add('book-pages');
    book_pages.textContent = `${myLibrary[i-1].pages}`;
    pagesContainer.appendChild(book_pages);

    // Creating Read
    const readContainer = document.createElement('div');
    readContainer.classList.add("readContainer");
    bookCard.appendChild(readContainer);

    const read = document.createElement('div');
    read.classList.add('read');
    read.textContent = 'Read:';
    readContainer.appendChild(read);

    if(myLibrary[i-1].isRead === true) {
      const book_read = document.createElement('div');
      book_read.classList.add('book-read');
      book_read.textContent = "Yes";
      book_read.setAttribute('data-read', `${book_title.textContent}`);
      readContainer.appendChild(book_read);
    } 
    else {
      const book_read = document.createElement('div');
      book_read.classList.add('book-read');
      book_read.textContent = "No";
      book_read.setAttribute('data-read', `${book_title.textContent}`);
      readContainer.appendChild(book_read);
    }

    // Creating Rating
    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('ratingContainer');
    bookCard.appendChild(ratingContainer);

    const rating = document.createElement('div');
    rating.classList.add("rating");
    rating.textContent = 'Rating:';
    ratingContainer.appendChild(rating);

    const book_rating = document.createElement('div');
    book_rating.classList.add('book-rating');
    book_rating.textContent = `${myLibrary[i-1].rating}/10`
    ratingContainer.appendChild(book_rating);

    // Creating Buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add("buttonContainer");
    bookCard.appendChild(buttonContainer);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.textContent = 'Delete';
    buttonContainer.appendChild(deleteBtn);

 // delete elements that correspond to data set of deleted book

    deleteBtn.addEventListener('click', () => {
      let data_book = bookCard.getAttribute('data-book');
      for(let i = 0; i < myLibrary.length; i++) {
        if(data_book == myLibrary[i].title) {
          myLibrary.splice(i, 1);
          bookCount--;
          bookCard.replaceChildren();
          bookCard.remove();
          console.log('book deleted')
        }
      }
    })

    const readBtn = document.createElement('button');
    readBtn.classList.add('readBtn');
    readBtn.textContent = 'Change Read Status';
    buttonContainer.appendChild(readBtn);

    // Change read status - fix bug that occurs when more books are added

    readBtn.addEventListener('click', () => {
      let data_book = bookCard.getAttribute('data-book');
      let book_read = document.querySelector(`[data-read="${data_book}"]`);
      for(let i = 0; i < myLibrary.length; i++) {
        if(data_book == myLibrary[i].title) {
          if(myLibrary[i].isRead == true) {
            book_read.textContent = 'No';
            myLibrary[i].changeReadStatus();
          }
          else {
            book_read.textContent = 'Yes';
            myLibrary[i].changeReadStatus();
          }
        }
      }
    })
  }
}

// Add Book Button 
const addBookBtn = document.querySelector('.addBookBtn');
const modalForm = document.querySelector('#dialog');
const cancelBtn = document.querySelector('.cancelBtn');
const confirmBtn = document.querySelector('.confirmBtn');

addBookBtn.addEventListener('click', () => {
  const title = document.querySelector('#title-input').value = '';
  const author = document.querySelector('#author-input').value = '';
  const pages = document.querySelector('#pages-input').value = '';
  const read = document.querySelector('#read-input').value = '';
  const rating = document.querySelector('#rating-input').value = '';
  modalForm.showModal();
})

confirmBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title-input').value;
  const author = document.querySelector('#author-input').value;
  const pages = document.querySelector('#pages-input').value;
  const read = document.querySelector('#read-input').value.toUpperCase();
  const rating = document.querySelector('#rating-input').value;
  let isValid = true;

  // Check if the input is valid
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    let errorMessage = input.nextElementSibling;

    if(!input.checkValidity()) {
      input.classList.add('error');
      if(!errorMessage) {
        errorMessage = document.createElement('span')
        errorMessage.classList.add("error-message");
        input.parentNode.appendChild(errorMessage);
      }
      errorMessage.textContent = input.validationMessage;
      isValid = false;
    }
    else {
      input.classList.remove('error');
      if(errorMessage) {
        errorMessage.textContent = '';
      }
    }
  });

  if(isValid) {
    if(read === 'YES') {
      addBookToLibrary(title, author, pages, true, rating);
      modalForm.close();
      displayBooks(myLibrary);
    }
    else {
      addBookToLibrary(title, author, pages, false, rating);
      modalForm.close();
      displayBooks(myLibrary);
    }
  } 
})

// Close the form

cancelBtn.addEventListener('click', (event) => {
  event.preventDefault();
  modalForm.close();
})
