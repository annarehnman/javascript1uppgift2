const todos = [
  // { 
  //   id: 1,
  //   title: "hej",
  //   completed: false
  // },
  // {
  //   id: 2,
  //   title: "svej",
  //   completed: false
  // },
  // {
  //   id: 3,
  //   title: "grej",
  //   completed: false
  // }
];

const input = document.querySelector('#input');
const output = document.querySelector('#output');
const form = document.querySelector('#todoForm');
const todoText = document.querySelector('#todoText');
const addBtn = document.querySelector('#addBtn');
const delteBtn = document.querySelector('#deleteBtn');
const checkBtn = document.querySelector('checkBtn');

// FUNCTION - listar todos
const listTodos = () => {
  console.log("listTodos");

  output.innerHTML = ''

  todos.forEach(todo => {

    output.innerHTML +=
      `<div class="card mb-3" id="${todos.id}">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <input type="checkbox" class="m-2 big-checkbox" id="checkBox">
              <p class="card-text d-flex align-items-center">${todos.title}</p>
            </div>
            <button class="btn btn-danger" id="deleteBtn">X</button>
          </div>
        </div>
      </div>`
  })
};

// FUNCTION - lägger till todo
const addTodo = () => {
  console.log("addTodo");

  let todo = {
      id: Date.now().toString(),
      title: input.value,
      completed: false
  }
  todos.push(todo);
}

// FUNCTION - rensar form
// const resetForm = inputs => {
//   console.log("resetForm");

//   input.value ='';
//   input.classList.remove('is-valid');
// }

// FUNCTION - hämtar Json
const getJson = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    const todo = await res.json();

    todos.push(todo);
  }
  catch(err) {
    console.log(err);
  }
}

// START
getJson();
console.log(todos);
// listTodos();
console.log(todos);



// EVENT - spara
// form.addEventListener('submit', e => {
//   e.preventDefault(); 

//   addTodo();
//   listTodos();
//   resetForm();
// })

// EVENT - ta bort
// output.addEventListener('click', e => {
// 	if(e.target && e.target.id == "deleteBtn") {
//     console.log("deleteBtn");
    
//     todos = todos.filter(todos => todo.id !== e.target.parentNode.parentNode.parentNode.id);
//     listTodos();
//   }
// });