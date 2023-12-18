document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    cursor.style.left = e.clientX + 'px'; 
    cursor.style.top = e.clientY + 'px'; 
  });
  
  $(document).ready(function() {
    $('.flipbook').turn({
      width: 800,
      height: 500,
      autoCenter: true, 
      gradients: true, 
      acceleration: true, 
      elevation: 50,
      duration: 1000,//ms
      display: 'single', // Display one pages at once
      when: {
        turning: function(event, page, view) {
          console.log('Turning the page', page);
        },
        turned: function(event, page, view) {
          console.log('Page turned', page);
        }
      }
    });
  });
  // Sample book data 
const bookCatalog = [
    { title: 'Book 1', author: 'Author 1', category: 'Category A' },
    { title: 'Book 2', author: 'Author 2', category: 'Category B' },
    
  ];
  
  function searchBooks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
  
    const filteredBooks = bookCatalog.filter(book =>
      book.title.toLowerCase().includes(searchInput) ||
      book.author.toLowerCase().includes(searchInput) ||
      book.category.toLowerCase().includes(searchInput)
    );
  
    if (filteredBooks.length === 0) {
      searchResults.innerHTML = 'No matching books found.';
    } else {
      filteredBooks.forEach(book => {
        const bookInfo = document.createElement('p');
        bookInfo.textContent = `Title: ${book.title}, Author: ${book.author}, Category: ${book.category}`;
        searchResults.appendChild(bookInfo);
      });
    }
  }
  
  
    