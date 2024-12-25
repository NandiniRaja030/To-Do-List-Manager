const todoForm = document.querySelector('form');
const todoInput = document.getElementById('ToDoInput');
const todoListUL = document.getElementById('ToDoList');

let allToDos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addtodo();
})

function addtodo () {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        }
        allToDos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
} 

function updateTodoList() {
    todoListUL.innerHTML = "";
    allToDos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);    
        todoListUL.append(todoItem);    
    });
}

function createTodoItem(todo, todoIndex) {
    const todoli = document.createElement("li");
    const todoId = "todo-"+todoIndex;
    const todoText = todo.text;
    todoli.className = "ToDo";
    todoli.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label class="ToDo-Checkbox" for="${todoId}">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="${todoId}" class="Todo-Text">
            ${todoText}
        </label>
        <button class="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>    
    `
    const deleteButton = todoli.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=> {
        deleteTodoItem(todoIndex);
    })
    const checkbox = todoli.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allToDos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoli;
}

function deleteTodoItem (todoIndex) {
    allToDos = allToDos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList(); 
}

function saveTodos() {
    const todosJson = JSON.stringify(allToDos);
    localStorage.setItem("todos", todosJson);
}

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}