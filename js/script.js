/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage( list, page ) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentListUl = document.querySelector('.student-list');
   studentListUl.innerHTML = '';

   // if the index is greater or same as the starting indexc and less than the endindex
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         console.log(startIndex, endIndex);
         const studentData = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src=${list[i].picture.medium}></img>
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>`
         // insert elements to the studentListUl
         studentListUl.insertAdjacentHTML("beforeend", studentData);
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
showPage(data, 2);