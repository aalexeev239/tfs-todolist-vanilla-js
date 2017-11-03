"use strict";

// --- Шаг 1: добавим задачу в список ---
const TODO = 'Добавить тудушку в список';

const listElement = document.querySelector('.list'); // ← добавляйте Element для явного указания переменной
const templateElement = document.getElementById('todoTemplate');
const templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

function getTodoElement(todo) {
    const newElement = templateContainer.querySelector('.task').cloneNode(true);

    newElement.querySelector('.task__name').textContent = todo;

    return newElement;
}

// listElement.appendChild(addTodo(TODO));
listElement.insertBefore(getTodoElement(TODO), listElement.firstElementChild);



