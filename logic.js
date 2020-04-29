const library = [
    {title: 'DOM Enlightenment', author: 'Cody Lindley', pages: 180, read: true},
    {title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', pages: 425, read: false}
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'read' : 'not read yet'}.`;
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    library.push(newBook);
    console.table(library);
    alert(`ADDED - Name: ${newBook.title} ; Author: ${newBook.author} ; Page: ${newBook.pages} ; Read? ${newBook.read ? 'Yes' : 'No'}`);
}

const addBookBtn = document.getElementById('submit-book');
addBookBtn.addEventListener('click', () => {
    const name = document.getElementById('enter-name').value;
    const author = document.getElementById('enter-author').value;
    const pages = Number(document.getElementById('enter-pages').value);
    const readStatus = Boolean(document.querySelector('input[name="read"]:checked').value);
    addBookToLibrary(name, author, pages, readStatus);
});

(function render() {
    const rootElement = document.getElementById('library');
    for (const element of library) {
        const libraryItem = document.createElement('div');
        const bookTitle = document.createElement('h1');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');
        const bookRead = document.createElement('p');
        libraryItem.setAttribute('class', 'library-item');

        bookTitle.textContent = `Title: ${element.title}`;
        bookAuthor.textContent = `Author: ${element.author}`;
        bookPages.textContent = `Pages: ${String(element.pages)}`;
        bookRead.textContent = `Read: ${String(element.read ? 'Yes': 'No')}`;

        libraryItem.append(bookTitle, bookAuthor, bookPages, bookRead);
        rootElement.appendChild(libraryItem);
    }
})();

