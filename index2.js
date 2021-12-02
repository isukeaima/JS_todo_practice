const form = document.getElementById('form');
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if(todos){
  forEach (todo =>{
    
  })
}

form.addEventListener("submit",function (event) {
  event.preventDefault();
  add();
});

function add(){
  let todoText = input.value;
  if (todoText) {
  const li = document.createElement("li");
  li.innerText = todoText;
  li.classList.add("list-group-item");
  ul.appendChild(li);
  input.value = "";
  saveData();
  }
}

function saveData(){
  const lists = document.querySelectorAll("li");
  let todos = [];
  lists.forEach(list => {
    todos.push(list.innerText);
    localStorage.setItem("todos",JSON.stringify(todos));
  });
}