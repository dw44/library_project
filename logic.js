const library = []; 
const store = window.localStorage;
const libraryDisplay = document.querySelector('section[id="library"]');
const addBookBtn = document.getElementById('submit-book');

// populates library with items in local storage  but only if there's something in local storage.
if (store.length >= 1) { 
    for (const book of JSON.parse(store.getItem('library'))) {
        library.push(book);
    }
}    

function populateStorage() {
    // stores a snapshot of the current state of the library array to localStorage
    store.setItem('library', JSON.stringify(library));
}

function render() {
    /* renders directly from localStorage. localStorage updated everytime library is so convenient 
    to just render from there instead of checking both to see which is more up to date*/
    if (store.length >= 1) {
        for (const book of JSON.parse(store.getItem('library'))) {
            libraryDisplay.innerHTML += `
                <div class="library-item">
                    <h1><span class="bold">Title:&nbsp;</span> ${book.title}</h1>
                    <p><span class="bold">Author:&nbsp;</span> ${book.author}</p>
                    <p><span class="bold">Pages:&nbsp;</span> ${book.pages}</p>
                    <p><span class="bold">Read:&nbsp;</span> ${book.read ? 'Yes' : 'No'}</p>
                    <button class="book-delete-btn" id="${findIndex(book._id)}" onClick="removeBookFromLibrary(this.id)">Delete Book</button>
                    <button id="${book._id}" onClick="changeReadStatus(this.id)">Change Read Status</button>
                </div>`
        }
    }	
}

render(); // initial render on page load

class Book {
    constructor(title, author, pages, read) {
        this._id = `_${Math.random().toString(36).substr(2,10)}`;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        this.read = !this.read;
	}
}

function addBookToLibrary(book) {
    if (formVerify()) {
        // won't proceed until form is filled out
        let book = new Book(document.getElementById('enter-name').value,
                            document.getElementById('enter-author').value,
                            Number(document.getElementById('enter-pages').value),
                            Boolean(document.querySelector('input[name="read"]:checked').value));
        library.push(book);
        populateStorage();
        libraryDisplay.innerHTML = '';
        render(); 
    } else {
        alert('Please fill out all the fields!');
    }
    document.getElementById('new-book').reset(); // clear form
}

function removeBookFromLibrary(domID) {
    library.splice(domID, 1);
    populateStorage();
    libraryDisplay.innerHTML = '';
    render(); 
}

addBookBtn.addEventListener('click', addBookToLibrary);

function formVerify() {
    // prevents form with empty fields from being submitted
    return (document.getElementById('enter-name').value !== '' && 
            document.getElementById('enter-author').value !== '' && 
            document.getElementById('enter-pages').value !== '');
} 

function findIndex(id) {
    for (const element of library) {
        if (id === element._id) return library.indexOf(element);
    }
}

function changeReadStatus(book_id) {
    const index = findIndex(book_id);
    library[index].toggleReadStatus();
    populateStorage();
    libraryDisplay.innerHTML = '';
    render(); 
}