document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("index.html")) {
    initialPageLoad();
    handelList();
  }
});

function initialPageLoad() {
  const form = document.getElementById("my_student_form");
  if (form) form.addEventListener("submit", handelFormSubmit);
  else console.error("Form not found");
}

//for get all local storage data
function getItem() {
  return JSON.parse(localStorage.getItem("items")) ?? [];
}

//form form submit
function handelFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const fname = document.getElementById("fname").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const editId = document.getElementById("editId").value;

  const formData = { name, fname, email, dob };

  const inputs = document.querySelectorAll("input");
  inputs.forEach((element) => {
    element.value = "";
  });

  if (editId) updateItem(editId, formData);
  else addItem(formData);
}

//for add form data to local storage
function addItem(item) {
  const items = JSON.parse(localStorage.getItem("items")) ?? [];
  items.push(item);

  localStorage.setItem("items", JSON.stringify(items));

  handelList();
}

//form showing local storage data in a list
function handelList() {
  const itemList = document.getElementById("student_list");
  const items = getItem();
  itemList.innerHTML = "";
  if (items.length === 0)
    itemList.innerHTML = ` 
    <tr> 
        <td col-span="5" class="text-center">No Data found! </td>
    </tr>`;
  items.forEach((item, index) => {
    itemList.innerHTML += `
        <tr>
            <td>${index}</td>
            <td>${item.name}</td>
            <td>${item.fname}</td>
            <td>${item.email}</td>
            <td>${item.dob}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="editItem(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteItem(${index})">Delete</button>
            </td>
        </tr>
    `;
  });
}

//set editable data in form
function editItem(index) {
  const editId = document.getElementById("editId");
  editId.setAttribute("value", index);

  const items = getItem();
  item = items[index];

  document.getElementById("name").value = item.name;
  document.getElementById("fname").value = item.fname;
  document.getElementById("email").value = item.email;
  document.getElementById("dob").value = item.dob;
}

//for Update item
function updateItem(id, data) {
  const items = getItem();
  items[id] = data;
  localStorage.setItem("items", JSON.stringify(items));
  handelList();
}

//for delete item from list
function deleteItem(index) {
  const items = getItem();
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  handelList();
}
