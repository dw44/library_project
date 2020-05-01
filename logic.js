const store = window.localStorage;
const libraryDisplay = document.getElementById('library');
const addBookBtn = document.getElementById('submit-book');
const library = [];

function checkID(id) {
	// Returns true if library contains item with the same '_id' attribute as the 'id' parameter
	return library.some(book => book._id === id);
}

function synchronize() {
	/*Synchronizes localStorage with the library array. Copies library to store if localStorage is empty.
		If it isn't, adds books stored in localStorage that don't exist in library to library. Once library
		is populated, localStorage is cleared and repopulated with the updated library*/
	if (store.length === 0) {
		store.setItem('library', JSON.stringify(library));
	} else {
		for (const book of JSON.parse(store.getItem('library'))) {
			if (!checkID(book._id)) {
				library.push(book);
			}
		}
	}
	store.clear();
	store.setItem('library', JSON.stringify(library));
}

function render() { 
	// synchronize library array and local storage prior to rendering.
	synchronize();
	// clear display area for books to prevent double rendering of previously rendered elements
	libraryDisplay.innerHTML = '';
	// actual rendering done from localStorage. 
	for (const book of JSON.parse(store.getItem('library'))) {
		libraryDisplay.innerHTML += `
			<div class="library-item">
				<div class="lib-itm-container">
					<p>Title:&nbsp; ${book.title}</p>
					<p>Author:&nbsp; ${book.author}</p>
					<p>Pages:&nbsp; ${book.pages}</p>
					<p>Read:&nbsp; ${book.read ? 'Yes' : 'No'}</p>
					<button class="book-card-button" id="${findIndex(book._id)}" onClick="removeBookFromLibrary(this.id)">Delete Book</button>
					<button class="book-card-button" id="${book._id}" onClick="changeReadStatus(this.id)">Change Read Status</button>
				</div>
			</div>`
	}
}

render();

function Book(title, author, pages, read) {
	this._id = `_${Math.random().toString(36).substr(2,10)}`;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function formVerify() {
	// prevents form with empty fields from being submitted
	return (document.getElementById('enter-name').value !== '' && 
		document.getElementById('enter-author').value !== '' && 
		document.getElementById('enter-pages').value !== '');
} 

function addBookToLibrary() {
	if (formVerify()) { // prevents form with missing fields from being submitted
		const read = document.getElementById('read-book');
		const book = new Book(document.getElementById('enter-name').value,
			document.getElementById('enter-author').value,
			Number(document.getElementById('enter-pages').value),
			Boolean(Number(read.options[read.selectedIndex].value)));
		library.push(book); // add book to library
		render(); // render updated local storage
	} else {
		alert('Please fill out all the fields!');
	}
	document.getElementById('new-book').reset(); // clear form
}

addBookBtn.addEventListener('click', addBookToLibrary);

function removeBookFromLibrary(index) {
	library.splice(index, 1);
	store.clear(); 
	// if store isn't cleared before render, deleted book will be added to library again from store
	render(); 
}

function findIndex(id) {
	for (const element of library) {
		if (id === element._id) return library.indexOf(element);
	}
}

function changeReadStatus(id) {
	const index = findIndex(id);
    library[index].read = !library[index].read;
    store.clear();
    render(); 
}