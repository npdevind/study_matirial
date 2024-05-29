document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("index.html")) {
    initialPageLoad();
    handelList();
  }
});

function initialPageLoad() {
  const form = document.getElementById("my_student_form");
  if (form) form.addEventListener("submit", handleFormSubmit);
  else console.error("Form not found");
}

function handleFormSubmit(event) {
  event.preventDefault();
  const fullName = document.getElementById("fullname").value;
  const fatherName = document.getElementById("fname").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;

  const indexValue = document.getElementById("editIndex")
    ? document.getElementById("editIndex").value
    : "";

  const formData = { fullName, fatherName, email, dob, indexValue };

  if (indexValue) updateItem(indexValue, formData);
  else addItem(formData);
}

function addItem(item) {
  //   const items = [];
  const items = JSON.parse(localStorage.getItem("items")) || [];
  items.push(item);

  /** localStorage can only store strings. If you attempt to store an object or array directly, it will be implicitly converted to a string,
   * often resulting in the unhelpful string representation of the object or array.
   * By using JSON.stringify() to convert the array to a JSON string,
   * you ensure that the data is stored in a structured and serializable
   * format that can be easily retrieved and parsed later when needed.
   * When retrieving data from localStorage, you can use JSON.parse() to convert the
   * JSON string back into the original array or object, restoring its structure and
   * data integrity. */
  localStorage.setItem("items", JSON.stringify(items));

  // Select all input elements
  const inputs = document.querySelectorAll("input");

  // Loop through each input element and set its value to an empty string
  inputs.forEach((input) => {
    input.value = "";
  });

  handelList();
}

function updateItem(index, newItem) {
  const items = getItems();
  items[index] = newItem;
  localStorage.setItem("items", JSON.stringify(items));
  handelList();
}

function getItems() {
  return JSON.parse(localStorage.getItem("items")) ?? [];
}

function handelList() {
  const itemList = document.getElementById("student_list");
  const items = getItems();
  //   console.log(items);
  itemList.innerHTML = "";

  items.forEach((item, index) => {
    itemList.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.fullName}</td>
            <td>${item.fatherName}</td>
            <td>${item.email}</td>
            <td>${item.dob}</td>
            <td>
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
           
        </tr>
    `;
  });
}

function editItem(index) {
  const items = getItems();
  const item = items[index];
  //   console.log(item);
  const form = document.getElementById("my_student_form");

  if (document.getElementById("editIndex")) {
    document.getElementById("editIndex").value = index;
  } else {
    const editIndex = document.createElement("input");
    document.createElement("input");
    editIndex.setAttribute("type", "hidden");
    editIndex.setAttribute("id", "editIndex");
    editIndex.setAttribute("value", index);
    form.appendChild(editIndex);
  }
  document.getElementById("fullname").value = item.fullName;
  document.getElementById("fname").value = item.fatherName;
  document.getElementById("email").value = item.email;
  document.getElementById("dob").value = item.dob;
}

function deleteItem(index) {
  const items = getItems();
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  handelList();
}

// const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

// // Extract a section from index 1 to index 3 (excluding 3)
// const slicedFruits = fruits.slice(1, 3);

// console.log(slicedFruits); // Output: ['Banana', 'Cherry']
