const inputBox = document.getElementById("adding-task-2.0");
const listCont = document.getElementById("list-container-2.0");

inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var draggedItem = document.getElementById(data);

    if (ev.target && ev.target.tagName === "LI") {
    ev.target.parentNode.insertBefore(draggedItem, ev.target.nextSibling);
  }
  
}

function addTask() {
  if (inputBox.value === "") {
    alert("Enter a task first");
  } else {
    let li = document.createElement("li");
    let taskId = "task-" + Date.now(); // Creating a unique ID using timestamp
    li.id = taskId;  // Assigning the unique ID to the list item

    li.innerHTML = inputBox.value;
    li.classList.add("text-slate-100");
    li.setAttribute("draggable", "true");
    li.setAttribute("ondragstart", "drag(event)"); 
    li.setAttribute("ondrop", "drop(event)");
    li.setAttribute("ondragover", "allowDrop(event)");
    listCont.appendChild(li);

    let iconContainer = document.createElement("div");
    iconContainer.style.display = "flex";
    iconContainer.style.gap = "8px";
    iconContainer.style.marginLeft = "1.5rem";

    let deleteIcon = document.createElement("img");
    deleteIcon.src = "/To-Do list 2.0/images/delete.png";
    deleteIcon.alt = "Delete";
    deleteIcon.style.width = "16px";
    deleteIcon.style.height = "16px";
    deleteIcon.style.cursor = "pointer";

    let editIcon = document.createElement("img");
    editIcon.src = "/To-Do list 2.0/images/edit (1).png";
    editIcon.alt = "Edit";
    editIcon.style.width = "16px";
    editIcon.style.height = "16px";
    editIcon.style.cursor = "pointer";

    let dragIcon = document.createElement("img");
    dragIcon.src = "/To-Do list 2.0/images/drag-down_15442899.png";
    dragIcon.alt = "Drag";
    dragIcon.style.width = "16px";
    dragIcon.style.height = "16px";
    dragIcon.style.cursor = "pointer";
    

    iconContainer.appendChild(deleteIcon);
    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(dragIcon);
    

    li.appendChild(iconContainer);
  }
  inputBox.value = "";
  saveData();
}

listCont.addEventListener(
  "click",
  function (e) {
    const iconContainer = e.target.closest("div");

    if (iconContainer && iconContainer.parentElement.tagName === "LI") {
      const deleteIcon = iconContainer.querySelector('img[alt="Delete"]');
      const editIcon = iconContainer.querySelector('img[alt="Edit"]');

      if (e.target === deleteIcon) {
        iconContainer.parentElement.remove();
        saveData();
      } else if (e.target === editIcon) {
        const listItem = iconContainer.parentElement;
        const inputBox = document.getElementById("adding-task-2.0");

        inputBox.value = listItem.firstChild.textContent;
//         What firstChild Does
// It returns the first child node of the specified element, which could be:
// A text node (e.g., plain text).
// An element node (e.g., a <div> or <span>).
// A comment node (e.g., <!-- Comment -->).
        listItem.remove();
        saveData();
      }
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listCont.innerHTML);
}

function showData() {
  listCont.innerHTML = localStorage.getItem("data");
}
showData();

const title = document.getElementById("name");
function saveTitle() {
  localStorage.setItem("title-name", title.value);
}
function showTitle() {
  const savedTitle = localStorage.getItem("title-name");
  if (savedTitle) {
    title.value = savedTitle;
  }
}

title.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Check if the pressed key is "Enter"
    saveTitle(); // Call saveTitle when Enter is pressed
  }
});
document.addEventListener("DOMContentLoaded", showTitle);
