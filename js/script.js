/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const studentListUl = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const header = document.querySelector('.header')
const numPerPages = 9;
let filteredStudents = []

// Creates a search bar and appends it before the end of the header closes, gets a reference to search bar 
searchBarHTML = 
`
 <label for="search" class="student-search">
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>
 `;
header.insertAdjacentHTML('beforeend', searchBarHTML);
const searchBar = header.querySelector('input#search')

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
  const startIndex = (page * numPerPages) - numPerPages;
  const endIndex = page * numPerPages;
  studentListUl.innerHTML = '';
/* loops through the list and for each student add their data and insert it to the student list
   The start/end indexs will determine what students will be displayed to first the page
   Ex. showPage(list, 1) will display student indexs of 0 to 9 on page 1 */
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      const student = list[i];
      const studentData = 
      `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src=${student.picture.medium}></img>
               <h3>${student.name.first} ${student.name.last}</h3>
               <span class="email">${student.email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${student.registered.date}</span>
            </div>
         </li>
         `;
      // insert elements to the studentListUl
      studentListUl.insertAdjacentHTML("beforeend", studentData);
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
  const numOfPagination = Math.ceil((list.length / numPerPages));
  linkList.innerHTML = '';
  
  // loops through based off the number of pagination need to display EX. 42 students / 9 per page = 5 rounded
  for (let i = 1; i <= numOfPagination; i++) {
    const linkListButtons = 
      `
      <li>
         <button type="button">${i}</button>
      </li>
      `;
    linkList.insertAdjacentHTML('beforeend', linkListButtons)
    linkList.querySelector('button').className = 'active';
  }
  
  // Listens for a click in linkList and if click is a button then remove current active button to the new one and show to page number that was clicked
  linkList.addEventListener('click', (e) => {
    const button = e.target;
    if (button.tagName === 'BUTTON') {
      document.querySelector('.active').className = '';
      button.className = 'active';
      showPage(list, button.textContent);
    }
  })
}

// creates a h2 element and transforms a a referenced element to the h2
function notFound(refElement) {
  const text = `<h2 id="not-found">Not found</h2>`;
  refElement.innerHTML = text;
}

// Search bar will be added to the header
function searchStudent() {;
  const text = searchBar.value.toLowerCase();
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const firstName = element.name.first.toLowerCase();
    const lastName = element.name.last.toLowerCase();

    // search for a name that includes the text and store into a array for filtered students
    if (firstName.includes(text) || lastName.includes(text)) { // let li = studentListUl.children[index]
      filteredStudents.push(data[index]);
    }
  }
  // for end of loop

  // if the filteredStudents has no students then display not found otherwise show filtered students
  if (filteredStudents.length === 0) {
    notFound(studentListUl)
    addPagination(filteredStudents);
  } else {
    showPage(filteredStudents, 1);
    addPagination(filteredStudents);
  }
}

// if search img has been clicked search for the student 
header.addEventListener('click', (e) => {
  filteredStudents = [];
  if (e.target.tagName === 'IMG') {
    searchStudent();
  }
})

// Once a key stroke has been released from the search bar perform a search
searchBar.addEventListener('keyup', () => { // console.log(e.target.value);
  filteredStudents = [];
  searchStudent();
})

// Call functions
showPage(data, 1);
addPagination(data);
