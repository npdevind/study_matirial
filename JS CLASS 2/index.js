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
    if (!["Submit", "Update"].includes(element.value)) element.value = "";
  });

  if (editId) {
    const validationStatus = handelValidation(formData);
    if (validationStatus) updateItem(editId, formData);
  } else {
    const validationStatus = handelValidation(formData);
    if (validationStatus) addItem(formData);
  }
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
  const SubmitType = document.getElementById("SubmitID").value;

  if (SubmitType == "Update")
    document.getElementById("SubmitID").value = "Submit";
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
  document.getElementById("SubmitID").value = "Update";
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

function handelValidation(data) {
  let status = false;

  const nameField = document.getElementById("name");
  const nameError = document.getElementById("nameErrorMsg");

  if (data.name == "") {
    nameField.classList.add("is-invalid");
    nameError.style.display = "block";
  } else {
    nameField.classList.remove("is-invalid");
    nameError.style.display = "none";
    status = true;
  }

  return status;
}

/**rule if from validation
 * 1. Name/father name/ any kind name field :
 * role : only alphabate (A-Z a-z ' ') are allowed no spical char on not any number allow
 * 2. email
 * role : only type email is allowed
 * 3. phone number :
 * role : 1. only number allowed but input field type should be text
 *        2. valid for only indian starting number (6-9) 10 digit
 * 4. Date of birth :
 * role  : 1. end date validation => showing previous date
 *         2. age should be 18-60 years
 *
 *5. email :  should be a valid email
 *
 *
 * js regex match
 * **/
