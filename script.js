const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div class="todo-item">
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="edit-todo-button js-edit-todo-button" data-index="${index}">Edit</button>
        <button class="delete-todo-button js-delete-todo-button" data-index="${index}">Delete</button> 
      </div>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-edit-todo-button').forEach((editButton) => {
    editButton.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      editTodo(index);
    });
  });

  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton) => {
    deleteButton.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      deleteTodo(index);
    });
  });
}

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  if (name && dueDate) {
    todoList.push({ name, dueDate });
    inputElement.value = '';
    saveToLocalStorage();
    renderTodoList();
  } else {
    alert('Please fill out both fields');
  }
}

function editTodo(index) {
  const todo = todoList[index];
  const newName = prompt('Enter new name:', todo.name);
  const newDueDate = prompt('Enter new due date (YYYY-MM-DD):', todo.dueDate);

  if (newName && newDueDate) {
    todoList[index] = { name: newName, dueDate: newDueDate };
    saveToLocalStorage();
    renderTodoList();
  } else {
    alert('Please fill out both fields');
  }
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  saveToLocalStorage();
  renderTodoList();
}

function saveToLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}
