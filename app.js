//Book Class: Represt a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI cLass: Handle UI Tasks
class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: "Subtle art of Not Giviing a Fuck",
        author: "Mark Manson",
        isbn: "123456"
      },
      {
        title: "The Girl in the Room 105",
        author: "Chetan Bhagat",
        isbn: "123457"
      },
      {
        title: "Educated",
        author: "Tara Westover",
        isbn: "123458"
      },
      {
        title: "Every Breath",
        author: "Nichollas Sparks",
        isbn: "123459"
      }
    ];

    const books = StoredBooks;

    books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href="#" class="btn btn-danger btn-sm font-weight-bold delete">X</a></td>
       `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    // go away 3seconds
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}
//Store Class: Handle Storage

//Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);
//Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", e => {
  //Prevent Submit
  e.preventDefault();

  //Get Form Values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //Validation
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert(
      "Please Fill all Fields",
      "danger text-center font-weight-bold"
    );
  } else {
    //init Book
    const book = new Book(title, author, isbn);

    ///Add Book To list Ui
    UI.addBookToList(book);

    //Success Message
    UI.showAlert("Book Added", "success text-center font-weight-bold");

    //Clear Field
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", e => {
  UI.deleteBook(e.target);

  //Delete Book
  UI.showAlert("Book Deleted", "warning text-center font-weight-bold");
});
