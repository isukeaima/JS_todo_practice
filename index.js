const form = document.getElementById("form");
const input = document.getElementById("input");

form.addEventListener("submit",function(event){
  event.preventDefault()
  console.log(input.value);
  console.log(input.value);
})