let todos = [];

const input = document.querySelector('#input');
const output = document.querySelector('#output');
const form = document.querySelector('#todoForm');
const todoText = document.querySelector('#todoText');
const deleteBtn = document.querySelectorAll('.deleteBtn');
const checkBtn = document.querySelectorAll('.checkBtn');

// FUNCTION - hämtar todos
const fetchTodos = async () => {
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
  output.innerHTML = ''
  todos.forEach(todo => {
    newTodo(todo);
  })
}

// FUCTION - skapar todos
const newTodo = (todo) => {
  let card = document.createElement('div');
  card.classList.add('card', 'mt-3');

  let innerCard1 = document.createElement('div');
  innerCard1.classList.add('card-body');

  let innerCard2 = document.createElement('div');
  innerCard2.classList.add('d-flex', 'justify-content-between');

  let textCard = document.createElement('div');
  textCard.classList.add('d-flex', 'align-items-center');

  let text = document.createElement('p');
  text.classList.add('card-text');
  text.innerText = todo.title;

  let iconsCard = document.createElement('div');
  iconsCard.classList.add('d-flex', 'justify-content-end')

  let editIcon = document.createElement('i');
  editIcon.classList.add('bi', 'bi-square', 'm-1', 'd-flex', 'align-items-center');
  //EVENT - editIcon
  editIcon.addEventListener('click', () => {
    todo.completed = !todo.completed;
    checkTodo();
  });

  let editedIcon = document.createElement('i');
  editedIcon.classList.add('bi', 'bi-check-square', 'm-1', 'd-flex', 'align-items-center');
  //EVENT - editedIcon
  editedIcon.addEventListener('click', () => {
    todo.completed = !todo.completed;
    checkTodo();
});

  let deleteIcon = document.createElement('i');
  deleteIcon.classList.add('bi', 'bi-trash-fill', 'm-1', 'd-flex', 'align-items-center');
  //EVENT - deleteIcon
  deleteIcon.addEventListener('click', e => {
    if(todo.completed) {
      for(let i = 0; i < todos.length; i++) {            
        if(todos[i].id == todo.id) {
            todos.splice(i, 1);
        }    
      }
      listTodos();
    }
  });

  card.appendChild(innerCard1);
  innerCard1.appendChild(innerCard2);
  innerCard2.appendChild(textCard);
  textCard.appendChild(text);
  innerCard2.appendChild(iconsCard);
  output.appendChild(card);

  const checkTodo = () => {
    if(todo.completed) {
      text.classList.add('checked');
      iconsCard.appendChild(editIcon);
      iconsCard.appendChild(editedIcon);
      iconsCard.appendChild(deleteIcon);
      iconsCard.removeChild(editIcon);
    } else {
      text.classList.remove('checked');
      iconsCard.appendChild(editIcon);
      iconsCard.appendChild(editedIcon);
      iconsCard.appendChild(deleteIcon);
      iconsCard.removeChild(editedIcon);
      iconsCard.removeChild(deleteIcon);
    }
  }
  checkTodo();
}

// FUNCTION - lägger till todo
const addTodo = (title) => {
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
  input.value ='';
  input.classList.remove('is-valid');
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
});