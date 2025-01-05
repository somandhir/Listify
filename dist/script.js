const inputBox = document.getElementById("adding-task-2.0");
const listCont = document.getElementById("list-container-2.0");

inputBox.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        addTask();
    }
})

function addTask() {
  if (inputBox.value === "") {
    alert("Enter a task first");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    li.classList.add("text-slate-100");
    listCont.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML =
      '<img src="/To-Do list 2.0/images/delete.png" alt="Delete" style="width: 16px; height: 16px; cursor: pointer;">';
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listCont.addEventListener("click",function(e){
    const target = e.target.closest("span");
  if (target) {
    // Remove the parent <li> of the clicked span
    target.parentElement.remove();
    saveData();
  }
},false);

function saveData(){
    localStorage.setItem("data",listCont.innerHTML);
}

function showData(){
    listCont.innerHTML = localStorage.getItem("data");
}
showData();


const title = document.getElementById("name");
function saveTitle(){
    localStorage.setItem("title-name",title.value);
}
function showTitle(){
    const savedTitle = localStorage.getItem("title-name");
  if (savedTitle) { 
    title.value = savedTitle;  
  }
}

title.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {  // Check if the pressed key is "Enter"
      saveTitle();  // Call saveTitle when Enter is pressed
    }
  });
document.addEventListener("DOMContentLoaded", showTitle);


