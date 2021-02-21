/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// GlobalVariables
let studentListElement = document.querySelector('.student-list');
let linkListElement = document.querySelector('.link-list');
let headerElement = document.querySelector('.header');

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
let showPage = (studentList, pageNum) => {
   let startIndex = (pageNum * 9) - 9;
   let endIndex = (pageNum * 9);

   studentListElement.innerHTML = '';

   for (let i=0; i<studentList.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let studentInfoHTML = 
            `<li class="student-item cf">
               <div class="student-details">
               <img class="avatar" src="${studentList[i].picture.large}" alt="Profile Picture">
               <h3>${studentList[i].name.first} ${studentList[i].name.last}</h3>
               <span class="email">${studentList[i].email}</span>
               </div>
               <div class="joined-details">
               <span class="date">Joined ${studentList[i].registered.date}</span>
               </div>
            </li>`
         studentListElement.insertAdjacentHTML('beforeend', studentInfoHTML);
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
let addPagination = studentList => {
   let numOfPages = parseInt(Math.ceil(studentList.length/9));
   linkListElement.innerHTML = '';

   for (let i=0; i<numOfPages; i++) {
      let paginationHTML = 
         `<li>
            <button type="button">${i+1}</button>
         </li>`
      linkListElement.insertAdjacentHTML('beforeend', paginationHTML);
   }

   let firstListHTML = linkListElement.firstElementChild;
   firstListHTML.firstElementChild.classList.toggle('active');

   linkListElement.addEventListener('click', (e) => {
      if (e.target.type == 'button') {
        for (element of linkListElement.children) {
         element.firstElementChild.classList.remove('active');
        }
        e.target.classList.toggle('active');
        showPage(studentList, e.target.textContent);
      }
   });
}

/*
   Build Search Bar
*/
let buildSearchBar = () => {
   let searchBarHTML =
      `<label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>`;
   
   headerElement.insertAdjacentHTML('beforeend', searchBarHTML);

   let searchButtonElement = document.querySelector('.student-search button');
   let searchInputElement = document.querySelector('.student-search #search');
   
   searchButtonElement.addEventListener('click', (e) => {
      let search = searchInputElement.value;
      searchStudents(data,search);
   });

   searchInputElement.addEventListener('keyup', (e) => {
      let search = searchInputElement.value;
      searchStudents(data,search);

   })
}

// Search function
let searchStudents = (data,search) => {
   search = search.toLowerCase();
   let searchResult =  data.filter((student) => {
      return student.name.last.toLowerCase().includes(search) || student.name.first.toLowerCase().includes(search);
   });
   // Display "No students found!" message if no search found otherwise display searchable students
   if(searchResult == undefined || searchResult.length == 0) {
      let noSearchResultHTML = '<p class="no-results">No Students Found!</p>';
      document.querySelectorAll('.student-item').forEach(element => {
         studentListElement.removeChild(element);
      });
      document.querySelectorAll('.link-list li').forEach(element => {
         linkListElement.removeChild(element);
      });
      if (document.querySelector('.no-results') == undefined) {
         headerElement.insertAdjacentHTML('beforeend',noSearchResultHTML);
      }
   } else {
      let noSearchResultElement = document.querySelector('.no-results');
      if (noSearchResultElement) {
         headerElement.removeChild(noSearchResultElement);
      }
      showPage(searchResult, 1);
      addPagination(searchResult);
   }
}

// Call functions
showPage(data, 1);
addPagination(data);
buildSearchBar();


