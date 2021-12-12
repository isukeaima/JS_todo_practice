const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

form.addEventListener("submit",function(event) {
  console.log(input.value);
  event.preventDefault();
  add();
});

function add(){
  const li = document.createElement("li");
  let todoText = input.value;

  if (todoText){
  li.innerText = todoText;
  li.classList.add("list-group-item");

  ul.appendChild(li);
  input.value = "";
  saveData();
  }
};

function saveData(){
  
}
