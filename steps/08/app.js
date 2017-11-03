"use strict";

// --- Шаг 8: рефакторинг магических значений ---
const keyCode = {
    ENTER: 13
};

const todoStatus = {
    TODO: 'todo',
    DONE: 'done'
};

// --- Шаг 7: создание новой задачи ---
const todoList = [
    {
        name: 'Позвонить в сервис',
        status: todoStatus.TODO
    },
    {
        name: 'Купить хлеб',
        status: todoStatus.DONE
    },
    {
        name: 'Захватить мир',
        status: todoStatus.TODO
    },
    {
        name: 'Добавить тудушку в список',
        status: todoStatus.TODO
    }
];

const listElement = document.querySelector('.list');
const templateElement = document.getElementById('todoTemplate');
const templateContainer = 'content' in templateElement ? templateElement.content : templateElement;
const inputElement = document.querySelector('.add-task__input');

function getTodoElement({name, status}) {
    const newElement = templateContainer.querySelector('.task').cloneNode(true);

    newElement.querySelector('.task__name').textContent = name;
    setStatus(newElement, status);

    return newElement;
}

function renderList(todos = []) {
    const fragment = document.createDocumentFragment();

    todos.forEach(todo => {
        fragment.appendChild(getTodoElement(todo));
    });

    listElement.appendChild(fragment);
}

function setStatus(todoElement, status) {
    const isTodo = status === todoStatus.TODO;

    todoElement.classList.toggle('task_todo', isTodo);
    todoElement.classList.toggle('task_done', !isTodo);
}

function changeStatus(todoElement) {
    const isTodo = checkTodo(todoElement);
    const newStatus = isTodo ? todoStatus.DONE : todoStatus.TODO;

    setStatus(todoElement, newStatus);
}

function checkTodo(todoElement) {
    return todoElement.classList.contains('task_todo');
}

function checkStatusBtn(element) {
    return element.classList.contains('task__status');
}

function checkDeleteBtn(element) {
    return element.classList.contains('task__delete-button');
}

function deleteTodo(element) {
    listElement.removeChild(element);
}

function onListClick(event) {
    const {target} = event;

    if (checkStatusBtn(target)) {
        changeStatus(target.parentElement);
        return;
    }

    if (checkDeleteBtn(target)) {
        deleteTodo(target.parentElement);
    }
}

function onInputKeydown(event) {
    if (event.keyCode !== keyCode.ENTER) {
        return;
    }

    if (!inputElement.value) {
        return;
    }

    const newName = inputElement.value;

    if (checkTodoExists(newName)) {
        return;
    }

    addNewTodo(newName);
    inputElement.value = '';
}

function checkTodoExists(newName) {
    const elements = listElement.querySelectorAll('.task__name');
    const names = [...elements].map(element => element.textContent);

    return names.indexOf(newName) !== -1;
}

function addNewTodo(name) {
    const todo = {
        name,
        status: todoStatus.TODO
    };

    listElement.insertBefore(getTodoElement(todo), listElement.firstChild);
}

// --- Исполняемый код ---
listElement.addEventListener('click', onListClick);
inputElement.addEventListener('keydown', onInputKeydown);
renderList(todoList);
