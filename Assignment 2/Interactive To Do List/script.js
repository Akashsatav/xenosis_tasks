const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// Function to add todo
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to do");
        return false;
    }

    if (addBtn.value === "Edit") {
        // Passing the original text to editLocalTodos function before edit it in the todoList
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "Add";
    } else {
        // Creating li element
        const li = document.createElement("li");
        
        // Creating p tag
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        // Creating Complete Btn
        const completeBtn = document.createElement("button");
        completeBtn.innerText = "Complete";
        completeBtn.classList.add("btn", "completeBtn");
        li.appendChild(completeBtn);

        // Creating Edit Btn
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        // Creating Delete Btn
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText, false); // false means not completed
    }
}

// Function to update (Edit/Delete/Complete) todo
const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
    
    if (e.target.innerHTML === "Complete") {
        const li = e.target.parentElement;
        const p = li.querySelector('p');
        p.classList.toggle('completed');
        saveLocalTodos(p.innerHTML, p.classList.contains('completed'));
    }
}

// Function to save local todo
const saveLocalTodos = (todo, completed) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    const todoObj = {
        text: todo,
        completed: completed
    };

    todos.push(todoObj);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to get local todos
const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todoObj => {
            // Creating li element
            const li = document.createElement("li");
            
            // Creating p tag
            const p = document.createElement("p");
            p.innerHTML = todoObj.text;
            if (todoObj.completed) p.classList.add('completed');
            li.appendChild(p);

            // Creating Complete Btn
            const completeBtn = document.createElement("button");
            completeBtn.innerText = "Complete";
            completeBtn.classList.add("btn", "completeBtn");
            li.appendChild(completeBtn);

            // Creating Edit Btn
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            // Creating Delete Btn
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    }
}

// Function to delete local todo
const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.findIndex(todoObj => todoObj.text === todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to edit local todo
const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.findIndex(todoObj => todoObj.text === todo);
    todos[todoIndex].text = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
