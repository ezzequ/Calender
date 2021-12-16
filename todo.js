function addEventListeners() {
    let form = document.querySelector('form');
    form.addEventListener('submit', inputFieldToDoList);
    const toggleButton = document.getElementById('toggle-button');
    toggleButton.addEventListener('click', toggleForm)
    form.addEventListener('submit', addTodo);

     document.querySelector('.deleteBtnToDo').addEventListener('click', changeToDoWhenButtonPress);

}

function inputFieldToDoList(e) {
    let textInput = document.getElementById('text');
    e.preventDefault();
}

function toggleForm() {
    const form = document.getElementsByClassName('todo-box')[0];
    form.classList.toggle('hide')


}


//funktionen som skapar list-elementet.
function addtTodoToList(date) {
    const key = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');

    // Hämta UL från html,
    const ulTodo = document.getElementById('todoULDOM');
    ulTodo.innerHTML = "";

    if (!todos.hasOwnProperty(key)) {
        return
    }

    // loopa igenom arrayen med "todo" objekten
    for (const todo of todos[key]) {

        //skapar ett list-element ("Li") för varje  objekt "todo" ur arrayen todos och skriver ut "title" ur objektet i DOMen. samt
        // lägger till en knapp som har funktion on click.
        const liTodo = document.createElement("li");
        liTodo.innerHTML = todo.title + `<button onclick=deleteTodoFromList() class="deleteTodo">X</button>`;
        liTodo.className = "list-item"

        // let deleteBtn = document.createElement('button');
        // deleteBtn.classList = 'deleteBtnToDo';
        //
        //  // document.querySelector('.list-item').append(deleteBtn);
        //  deleteBtn.innerText = 'Ändra';

        // lägg till li-elementet i UL'en
        ulTodo.append(liTodo);

    }
}

function changeToDoWhenButtonPress() {
    const listItem = document.querySelector('.list-item')
    if (!listItem) {
        return;
    }



    addtTodoToList();
}

/**
 * Save content to Localstorage
 */

function saveToLs(keyname, keyvalue) {
    localStorage.setItem(keyname, keyvalue);

}


function loadFromLS() {
    const todoStr = localStorage.getItem('todo');
    if (todoStr) {
        todos = JSON.parse(todoStr);
    }
}


//funktionen som gör så att ett nytt list-element skapas.
function addTodo() {
    let todo = document.getElementById('text');
    if (todo.value.trim() === '') {
        return;
    }


    console.log(todo.value);
    let dateStr = document.getElementById('help').value;
    let date = new Date(dateStr);
    if (!todos.hasOwnProperty(dateStr)) {
        todos[dateStr] = [];
    }

    todos[dateStr].push({ title: todo.value.trim() });
    //todos.push({ title: todo.value, date: dateStr });//nu så läggs "date" objektet till med datumet det är i nutid när man trycker på knappen. // det kvarstår nu att lösa så att den lägg tills med rätt datum.

    localStorage.setItem('todo', JSON.stringify(todos));

    addtTodoToList(date);
    todo.value = '';


}

// en funktion som tar bort "todo" från listan samt tar bort onjektet från arrayen. från arrayen.
function deleteTodoFromList() {
    let buttons = document.getElementsByClassName("deleteTodo")
    let removeTodo = document.getElementsByClassName("deleteTodo");

    for (let i = 0; i < removeTodo.length; i++) {
        removeTodo[i].onclick = function (e) {
            let todo = this.parentNode;
            todo.style.display = "none";
            let index = e.target.getAttribute('value');// title = ex "baka en tårta"
            todos.splice(index, 1);

        }
    }
}

function showNumberOfTodos() {

}

let todos = {};