const form = document.getElementById("todoForm");

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const statusInput = document.getElementById("status");

const todoList = document.getElementById("todoList");

let todos = [];


form.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const status = statusInput.value;


    if (title === "") {
        alert("Please enter a title");
        return;
    }

    if (content === "") {
        alert("Please enter content");
        return;
    }


    const todo = {
        id: Date.now(),
        title: title,
        content: content,
        status: status
    };



    todos.push(todo);


    form.reset();


    renderTodos();

});


function renderTodos() {

    todoList.innerHTML = "";


    todos.forEach(function (todo) {

        const item = document.createElement("div");

        item.className = "todo-item";


        item.innerHTML = `

            <button
                class="delete-button"
                onclick="removeTodo(${todo.id})"
                title="Delete Todo"
                aria-label="Delete Todo"
            >
                <i class="fa-solid fa-trash"></i>
            </button>

            <div class="todo-content">

                <h2>${todo.title}</h2>

                <p>${todo.content}</p>

            </div>

            <select
                class="todo-status"
                onchange="updateStatus(${todo.id}, this.value)"
            >

                <option
                    value="pending"
                    ${todo.status === "pending" ? "selected" : ""}
                >
                    Pending
                </option>

                <option
                    value="in-progress"
                    ${todo.status === "in-progress" ? "selected" : ""}
                >
                    In Progress
                </option>

                <option
                    value="completed"
                    ${todo.status === "completed" ? "selected" : ""}
                >
                    Completed
                </option>

            </select>

        `;


        todoList.appendChild(item);

    });

}



function updateStatus(id, status) {

    const todo = todos.find(function (todo) {

        return todo.id === id;

    });


    if (todo) {
        todo.status = status;
    }

}


function removeTodo(id) {

    todos = todos.filter(function (todo) {

        return todo.id !== id;

    });


    renderTodos();

}