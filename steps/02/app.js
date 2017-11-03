"use strict";

// --- Шаг 2: несколько задач ---
const todoList = [
    'Позвонить в сервис',
    'Купить хлеб',
    'Захватить мир',
    'Добавить тудушку в список'
];

const listElement = document.querySelector('.list');
const templateElement = document.getElementById('todoTemplate');
const templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

function getTodoElement(todo) {
    const newElement = templateContainer.querySelector('.task').cloneNode(true);

    newElement.querySelector('.task__name').textContent = todo;

    return newElement;
}

// --- Вариант 1: в лоб ---
todoList.forEach(todo => {
    listElement.appendChild(getTodoElement(todo));
});

// --- Вариант 2: documentFragment ---
function renderList(todos) {
    const fragment = document.createDocumentFragment();

    todos.forEach(todo => {
        fragment.appendChild(getTodoElement(todo));
    });

    listElement.appendChild(fragment);
}

// --- Исполняемый код ---
renderList(todoList);
