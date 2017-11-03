"use strict";

// --- Шаг 4: клик на  кнопку ---
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
    // добавим клик
    newElement.querySelector('.task__status').addEventListener('click', onStatusClick)

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

function onStatusClick(event) {
    const todoElement = event.target.parentElement;
    const isTodo = checkTodo(todoElement);
    const newStatus = isTodo ? 'done' : 'todo';

    setStatus(todoElement, newStatus);
}

function checkTodo(todoElement) {
    return todoElement.classList.contains('task_todo');
}

// --- Исполняемый код ---
renderList(todoList);
