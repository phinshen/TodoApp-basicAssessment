
// -------------------------fetch data from API function------------------
let allData = [];

async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  allData = data;
  // -----------------------------getting user Id from API--------------------------
  const userIds = [];

  for (let i = 0; i < data.length; i++) {
    const userId = data[i].userId;

    if (!userIds.includes(userId)) {
      userIds.push(userId);
    }
  } 

  // ------------------------getting dropdown selection from API------------------------
  // ------------------------linking it to html-----------------------
  const menu = document.getElementById("userIdMenu"); //getting dropdown menu container
  menu.innerHTML = ''; // clear existing item from menu to avoid duplicate

  userIds.forEach(id => {
   const li = document.createElement("li");
   const a = document.createElement("a");
   a.className = "dropdown-item";
   a.href = "#";
   a.textContent = `User ID: ${id}`;

   a.addEventListener('click', () => {
    document.getElementById("selectedUserId").textContent = `User ID: ${id}`;
    filterData();
   });

   li.appendChild(a);
   menu.appendChild(li);
  });

  displayData(allData);
}
// ---------------------------------display content data function-----------------------------------
function displayData(data) {
  const container = document.getElementById('todoContainer');
  container.innerHTML = ''; // clear previous content

  const table = document.createElement('table');
  table.className = 'table table-striped';
  // ------------------------create table head---------------------
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
      <th class="th-header">User ID</th>
      <th class="th-header">Title</th>
    `;
    thead.appendChild(headerRow);
  // ----------------------create table body--------------------
  const tbody = document.createElement('tbody');
  data.forEach(item => {
    const tr = document.createElement('tr');

    tr.innerHTML = `  
      <td>${item.userId} :</td>
      <td>${item.title}</td>
      `;

      tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  container.appendChild(table);
}

//----------------------linking filter button to display data content-------------------
document.getElementById('filterButton').addEventListener('click', filterData);

function filterData() {
  const selectedId = document.getElementById('selectedUserId').textContent;
  const userId = parseInt(selectedId.replace('User ID: ', ''));

 if (!isNaN(userId)) {
  const filteredData = allData.filter(item => item.userId === userId);
  displayData(filteredData);
 } else {
  displayData(allData);
 }

}

fetchData();