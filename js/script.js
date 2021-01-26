let todos = [];

const input = document.querySelector('#input');
const output = document.querySelector('#output');
const form = document.querySelector('#todoForm');
const todoText = document.querySelector('#todoText');
const deleteBtn = document.querySelectorAll('.deleteBtn');
const checkBtn = document.querySelectorAll('.checkBtn');

// FUNCTION - hämtar todos
const fetchTodos = async () => {
  console.log("fetchTodos");

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    const data = await res.json();
  
    todos = data;
    listTodos();
  }
  catch(err) {
    console.log(err)
  }
}

// FUNCTION - listar todos
const listTodos = () => {
  console.log("listTodos");

  output.innerHTML = ''
  todos.forEach(todo => {
    newTodo(todo);
  })
}

// FUCTION - skapar todos
const newTodo = (todo) => {
  console.log("newTodos");

  let card = document.createElement('div');
  card.classList.add('card', 'mb-3');

  let innerCard1 = document.createElement('div');
  innerCard1.classList.add('card-body');

  let innerCard2 = document.createElement('div');
  innerCard2.classList.add('d-flex', 'justify-content-between');

  let innerCard3 = document.createElement('div');
  innerCard3.classList.add('d-flex', 'align-items-center');

  let checkbox = document.createElement('input');
  checkbox.classList.add('m-2', 'big-checkbox', 'checkBtn');
  checkbox.setAttribute("type", "checkbox");
  // EVENT - check
  checkbox.addEventListener('click', () => {
    todo.completed = !todo.completed;
    console.log(todo.completed);

    if(todo.completed) {
      title.classList.add('checked');
    } else {
      title.classList.remove('checked');
    }
  });

  let title = document.createElement('p');
  title.classList.add('card-text');
  title.innerText = todo.title;

  let button = document.createElement('button');
  button.classList.add('btn', 'btn-danger', 'deleteBtn');
  button.addEventListener('click', () => {
    if(todo.completed) {
      console.log("tabort" + todo.id);
      // EVENT - ta bort todo
      // todos = todos.splice(todo => todo.id !== e.target.parentNode.parentNode.parentNode.id);
    }
  })

  let trashcan = document.createElement('i');
  trashcan.classList.add('bi', 'bi-trash-fill');

  card.appendChild(innerCard1);
  innerCard1.appendChild(innerCard2);
  innerCard2.appendChild(innerCard3);
  innerCard3.appendChild(checkbox);
  innerCard3.appendChild(title);
  innerCard2.appendChild(button);
  button.appendChild(trashcan);
  output.appendChild(card);
}

// FUNCTION - lägger till todo
const addTodo = (title) => {
  console.log("addTodo");

  fetch('https://jsonplaceholder.typicode.com/todos?_limit=10',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title: title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    todos.unshift(data);
    listTodos();
  })
}

// FUNCTION - validerar input
const validateInput = (id) => {
  let input = document.querySelector(id);

  if(input.value === '') {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      input.focus();
      return false;
  } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      return true;
  }
}

// FUNCTION - rensar form
const resetForm = input => {
  console.log("resetForm");

  input.value ='';
  input.classList.remove('is-valid');
}

function myFunction() {
  var element = document.getElementById("myDIV");
  element.classList.toggle("mystyle");
}

// START
fetchTodos();

// EVENT - add
form.addEventListener('submit', e => {
  e.preventDefault();
  
  if(validateInput('#input')) {
    addTodo(input.value);
    resetForm(input);
  }
})

// FUNCTION - ta bort todo
// const deleteTodo = () => {
//   console.log("deleteTodo");
  
//   console.log(todo.id);
//   // todos = todos.filter(todos => todo.id !== e.target.parentNode.parentNode.parentNode.id);
//   // listTodos();
// }