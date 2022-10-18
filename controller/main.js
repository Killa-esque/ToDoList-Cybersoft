let todoList = new TaskList();
let completeList = new TaskList();

function createRandomId(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
document.querySelector('#addItem').onclick = function () {
    var task = new Task();
    task.id = Math.random();
    task.taskName = document.querySelector('#newTask').value;
    task.status = 'todo';

    // Validation
    // Check empty and duplicate
    var valid = validation.checkEmpty(task.taskName, 'notiInput') & validation.checkDuplicate(todoList.arr.concat(completeList.arr), task.taskName);

    // document.querySelector('#notiInput').innerHTML = ''
    if (!valid) {
        return
    }

    // Add Task
    todoList.addTask(task);

    // Render
    showToDoList(document.getElementById("todo"));

    //Save to local
    saveLocalStorage();

    // F5
    refresh();
}
function renderToDo(arr) {
    // Output contentHTML: String
    var contentHTML = '';
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        contentHTML += `
            <li>
                <span>${item.taskName}</span>
                <div class="buttons">
                    <button class="remove" data-index="${item.id}" data-status="${item.status}" onclick="deleteTask(${item.id})"><i class="fa fa-trash-alt"></i></button>
                    <button class="complete" data-index="${item.id}" data-status="${item.status}" onclick="completeTask(${item.id})">
                        <i class="far fa-check-circle"></i>
                        <i class="fas fa-check-circle"></i>
                    </button>
                </div>
            </li>
        `
    }
    return contentHTML;
}
function refresh() {
    document.querySelector('#newTask').value = '';
}
function showToDoList(ulToDo) {
    ulToDo.innerHTML = renderToDo(todoList.arr);
}
function showCompleteList(ulCompleted) {
    ulCompleted.innerHTML = renderToDo(completeList.arr);
}

function completeTask(id) {
    var getStatus = document.querySelector('[data-index="' + id + '"]').getAttribute("data-status");
    var ulToDo = document.getElementById("todo");
    var ulCompleted = document.getElementById("completed");
    if (getStatus === 'todo') {
        var objToDo = todoList.getTaskById(id);
        objToDo.status = 'completed';
        todoList.deleteTask(id);
        completeList.addTask(objToDo);

        showToDoList(ulToDo);
        showCompleteList(ulCompleted);

        //Save to local
        saveLocalStorage();
        saveLocalStorage();
    }
    else if (getStatus === 'completed') {
        var objToDo = completeList.getTaskById(id);
        objToDo.status = 'todo';
        completeList.deleteTask(id);
        todoList.addTask(objToDo);
        showCompleteList(ulCompleted);
        showToDoList(ulToDo);

        //Save to local
        saveLocalStorage();
        saveLocalStorage();

    }
    else {
        alert("Unable to change status !!!");
    }
}

function deleteTask(id) {
    var getStatus = document.querySelector('[data-index="' + id + '"]').getAttribute("data-status");
    var ulToDo = document.getElementById("todo");
    var ulCompleted = document.getElementById("completed");
    if (getStatus === 'todo') {
        var getIndex = todoList.findIndex(id);
        todoList.deleteTask(getIndex);
        showToDoList(ulToDo);
        showCompleteList(ulCompleted);

        //Save to local
        saveLocalStorage();
        saveLocalStorage();

    }
    else if (getStatus === 'completed') {
        var getIndex = todoList.findIndex(id);
        completeList.deleteTask(getIndex);
        showToDoList(ulToDo);
        showCompleteList(ulCompleted);

        //Save to local
        saveLocalStorage();
        saveLocalStorage();

    }
    else {
        alert("Unable to change status !!!");
    }
}

function saveLocalStorage() {
    var stringArrToDo = JSON.stringify(todoList.arr);
    var stringArrCompleted = JSON.stringify(completeList.arr);
    // Lưu
    localStorage.setItem('todoList.arr',stringArrToDo);
    localStorage.setItem('completeList.arr',stringArrCompleted);

    // Lưu vào cookies
    setCookie('todoList.arr',stringArrToDo,5);
    setCookie('completeList.arr',stringArrCompleted,5);
}

function getLocalStorage() {
    //Kiểm tra xem local storage có cái name đó không
    if (localStorage.getItem('todoList.arr')) {
        var stringArr = localStorage.getItem('todoList.arr');
        todoList.arr = JSON.parse(stringArr);
        var ulToDo = document.getElementById("todo");
        showToDoList(ulToDo);
    }
    if (localStorage.getItem('completeList.arr')) {
        var stringArr = localStorage.getItem('completeList.arr');
        completeList.arr = JSON.parse(stringArr);
        var ulCompleted = document.getElementById("completed");
        showCompleteList(ulCompleted);
    }
}

getLocalStorage();

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
