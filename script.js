const library = [];
const content = document.querySelector(".content");
const newBookBtn = document.querySelector(".header button")
const newBookScreen = document.querySelector("dialog")
const closeBtn = document.querySelector("dialog button")
const submitBtn = document.querySelector("input[type = submit]")
const form = document.querySelector("form")

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read} yet`;
    };
}

function renderLibrary() {
    content.innerHTML = '';
    for (var i = 0; i < library.length; i++) {
        const new_card = document.createElement("div");
        new_card.classList.add("card");

        const title = document.createElement("h1");
        title.textContent = library[i].title;

        const author = document.createElement("h3");
        author.textContent = `By ${library[i].author}`;

        const pages = document.createElement("h3");
        pages.textContent = `${library[i].pages} pages`;

        const read = document.createElement("h3");
        read.textContent = (library[i].read ? "Read" : "Not Read");

        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "Remove Book";
        remove.addEventListener("click", removeBook);

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.textContent = "Toggle Read Status";
        toggle.dataset.status = (library[i].read ? true : false);
        toggle.addEventListener("click", toggleRead);

        new_card.dataset.index = i;

        new_card.appendChild(title);
        new_card.appendChild(author);
        new_card.appendChild(pages);
        new_card.appendChild(read);
        new_card.appendChild(remove);
        new_card.appendChild(toggle);
        content.appendChild(new_card);
    }
}

function removeBook(e) {
    library.splice(e.target.parentElement.dataset.index, 1);
    renderLibrary();
}

function toggleRead(e) {
    const targetElem = e.target.parentElement.childNodes[3];
    if (e.target.dataset.status === "true") {
        e.target.dataset.status = false;
        targetElem.textContent = "Not Read";
    } else {
        e.target.dataset.status = true;
        targetElem.textContent = "Read";
    }
}

function showNewBookScreen() {
    newBookScreen.showModal();
}

function closeNewBookScreen() {
    newBookScreen.close();
    form.reset();
}

function addBook(e) {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let readBool = (document.getElementById("read").checked ? true : false);

    library.push(new Book(title, author, pages, readBool));
    closeNewBookScreen();
    renderLibrary();
}

// const testBook1 = new Book("test book", "test author", 300, true);
// const testBook2 = new Book("test book 2", "test author 2", 600, false);

// library.push(testBook1);
// library.push(testBook2);

newBookBtn.addEventListener("click", showNewBookScreen);
closeBtn.addEventListener("click", closeNewBookScreen);
form.addEventListener("submit", addBook);
renderLibrary();