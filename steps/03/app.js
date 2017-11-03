"use strict";

// --- Шаг 3: учитываем статусы ---
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
    // добавим функцию для статуса
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
    if (status === 'todo') {
        todoElement.classList.add('task_todo');
        todoElement.classList.remove('task_done');
    } else {
        todoElement.classList.remove('task_todo');
        todoElement.classList.add('task_done');
    }

    // const isTodo = status === 'todo';
    //
    // todoElement.classList.toggle('task_todo', isTodo);
    // todoElement.classList.toggle('task_done', !isTodo);
}

// --- Исполняемый код ---
renderList(todoList);
