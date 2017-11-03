"use strict";

// --- Шаг 6: удаление ---
const todoList = [
    {
        name: 'Позвонить в сервис',
        status: 'todo'
    },
    {
        name: 'Купить хлеб',
        status: 'done'
    },
    {
        name: 'Захватить мир',
        status: 'todo'
    },
    {
        name: 'Добавить тудушку в список',
        status: 'todo'
    }
];

const listElement = document.querySelector('.list');
const templateElement = document.getElementById('todoTemplate');
const templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

function getTodoElement({name, status}) {
    const newElement = templateContainer.querySelector('.task').cloneNode(true);

    newElement.querySelector('.task__name').textContent = name;
    setStatus(newElement, status);

    return newElement;
}

function renderList(todos) {
    const fragment = document.createDocumentFragment();

    todos.forEach(todo => {
        fragment.appendChild(getTodoElement(todo));
    });

    listElement.appendChild(fragment);
}

function setStatus(todoElement, status) {
    const isTodo = status === 'todo';

    todoElement.classList.toggle('task_todo', isTodo);
    todoElement.classList.toggle('task_done', !isTodo);
}

function changeStatus(todoElement) {
    const isTodo = checkTodo(todoElement);
    const newStatus = isTodo ? 'done' : 'todo';

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

// --- Исполняемый код ---
listElement.addEventListener('click', onListClick);
renderList(todoList);
