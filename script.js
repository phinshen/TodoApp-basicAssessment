
// -------------------------------------------fetch data from API function--------------------------------------------
let allData = []; // to keep data here for later usage on filtering and displaying

async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  allData = data;
  // ------------------------------------------getting user Id from API----------------------------------------------
  const userIds = []; // store data for later usage as well for display and filter

  for (let i = 0; i < data.length; i++) { //goes through each items and collect User ID to aviod duplicate entries in filter dropdown
    const userId = data[i].userId;

    if (!userIds.includes(userId)) {
      userIds.push(userId);
    }
  } 

  // ------------------------------------------getting dropdown selection from API------------------------------------
  // ---------------------------------------------linking it to html-----------------------------------------------
  const menu = document.getElementById("userIdMenu"); //getting dropdown menu container
  menu.innerHTML = ''; // clear existing item from menu to avoid duplicate

  userIds.forEach(id => { // creates a list item (li) and clickable link (a) for each user ID - fill the dropdown with user ID options
   const li = document.createElement("li");
   const a = document.createElement("a");
   a.className = "dropdown-item";
   a.href = "#";
   a.textContent = `User ID: ${id}`;

   a.addEventListener('click', () => { //connect dropdown choice to the filter function, when user clicks, it will show in the page with filtered data
    document.getElementById("selectedUserId").textContent = `User ID: ${id}`;
    filterData();
   });

   li.appendChild(a); //add link to list item and add item to menu // display the dropdown on the page
   menu.appendChild(li);
  });

  displayData(allData); // display all to-do item 
}
// ---------------------------------------------------------display content data function-----------------------------------------------------
function displayData(data) { // finds the area where the table goes and clears old content // refresh the table content each time
  const container = document.getElementById('todoContainer');
  container.innerHTML = ''; // clear previous content

  const table = document.createElement('table'); // creates a table using bootstrap format
  table.className = 'table table-striped';
  // ----------------------------------------------------------------create table head----------------------------------------------------
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr'); // create the table header row with two columns // to give column title for easier understanding
  headerRow.innerHTML = `
      <th class="th-header">User ID</th>
      <th class="th-header">Title</th>
    `;
    thead.appendChild(headerRow);
  // ----------------------------------------------------------------create table body------------------------------------------------
  const tbody = document.createElement('tbody'); // creates a container for row of data //  will fill with to-do items
  data.forEach(item => {
    const tr = document.createElement('tr'); // create a row for each item, with user ID and title // fills the table with actual data

    tr.innerHTML = `  
      <td>${item.userId} :</td>
      <td>${item.title}</td>
      `;

      tbody.appendChild(tr);
  });

  table.appendChild(thead); // add table header and body to the table
  table.appendChild(tbody);
  container.appendChild(table); //add the table to the page
}

//--------------------------------------------------------------linking filter button to display data content------------------------------------
document.getElementById('filterButton').addEventListener('click', filterData); // listen for a click on filter button to activate filtering // runs the filter data when button is clicked

function filterData() { //reads the selected user ID from page // used for filtering the list
  const selectedId = document.getElementById('selectedUserId').textContent;
  const userId = parseInt(selectedId.replace('User ID: ', ''));

 if (!isNaN(userId)) { // if valid user ID selected, show only their items. otherwise, show all.
  const filteredData = allData.filter(item => item.userId === userId);
  displayData(filteredData);
 } else {
  displayData(allData);
 }

}

fetchData(); // starts the whole app by loading data // ensures data appears as soon as the page loads