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
    if (store.length >= 1) {
        for (const book of JSON.parse(store.getItem('library'))) {
            libraryDisplay.innerHTML += `
                <div class="library-item">
                    <h1><span class="bold">Title:</span> ${book.title}</h1>
                    <p><span class="bold">Author:</span> ${book.author}</p>
                    <p><span class="bold">Pages:</span> ${book.pages}</p>
                    <p><span class="bold">Read:</span> ${book.read}</p>
                    <button>Delete Book</button>
                </div>`
        }
    }	
}

// populateStorage();
render();



class Book {
    constructor(title, author, pages, read) {
        this._id = keyGen();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    get id() {
        return this._id;
    }

    toggleReadStatus() {
        this.read = !this.read;
	}
}





function addBookToLibrary(book) {
    if (formVerify()) {
        let book = new Book(document.getElementById('enter-name').value,
                            document.getElementById('enter-author').value,
                            Number(document.getElementById('enter-pages').value),
                            Boolean(document.querySelector('input[name="read"]:checked').value));
		library.push(book);
    } else {
        alert('Please fill out all the fields!');
    }
    console.log(library);
    populateStorage();
    libraryDisplay.innerHTML = '';
    render(); 
    document.getElementById('new-book').reset();
}

addBookBtn.addEventListener('click', addBookToLibrary);



function formVerify() {
    // prevents form with empty fields from being submitted
    // function working as expected
    return (document.getElementById('enter-name').value !== '' && 
            document.getElementById('enter-author').value !== '' && 
            document.getElementById('enter-pages').value !== '');
} 

function clearForm() {
    document.getElementById('enter-name').value = ''; 
    document.getElementById('enter-author').value = ''; 
    document.getElementById('enter-pages').value = '';
}



function keyGen() {
    // generate a key for local storage
    return `_${Math.random().toString(36).substr(2,10)}`;
}
