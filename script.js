
// -------------------------fetch data from API function------------------
async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  // -----------------------------getting user Id from API--------------------------
  const userIds = [];

  for (let i = 0; i < data.length; i++) {
    const userId = data[i].userId;

    if (!userIds.includes(userId)) {
      userIds.push(userId);
    }
  } 

  console.log(userIds);
  // ------------------------getting dropdown selection from API------------------------
  // ------------------------linking it to html-----------------------
  const menu = document.getElementById("userIdMenu"); //getting dropdown menu container
  menu.innerHTML = ''; // clear existing item from menu to avoid duplicate

  userIds.forEach(id => {
    const li = document.createElement("li"); //creates a <li> element in HTML
    li.innerHTML = `
      <a class="dropdown-item" id="dropdownMenu" href="#">
      User ID: ${id}</a>`; //Add a related link to specific User ID, link to UPDATE
    menu.appendChild(li);
  });
}
// ---------------------------------content data function-----------------------------------
function displayData(data) {
  const container = document.getElementById('todoContainer');
}



// -----------------------search button function-------------------------
//---incomplete
function searchButton() {
  const search = document.getElementById("searchInput").value.toLowerCase();
}
















fetchData();