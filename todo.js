const div = document.querySelector('#main-container');
      ul = document.querySelector('ul');
      button = document.querySelector('button');

let todos = [];
const getTodos = taskContent => {
    let todo = {
        // id od 1 ale jakbymsmy dali od 0 to dlugosc to np. 3 a ostatni index to 2
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
        text: taskContent,
        state: false
    }
    todos.push(todo);
    saveToLocalStorage();
}


const createDOMElements = () => {
    const taskVal = document.getElementById('task').value;
    if(taskVal){
        getTodos(taskVal);
    }
    if(todos.length !== 0) {
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.id = todo.id;
            // li.className =
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.state;
            const span = document.createElement('span');
            span.textContent = todo.text;
            span.contentEditable = true;
            span.className = 'editable';

            if (todo.state) {
                li.className = "completed";
            }
            else {
                li.className = " ";
            }

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'delete';
            deleteButton.textContent = 'Delete';
            li.append(checkbox, span, deleteButton);
            ul.append(li);
            div.append(ul);
        });
    }
}


button.addEventListener('click', () => {
    while (ul.firstChild) { //reset listy
        ul.removeChild(ul.firstChild);
    }
    createDOMElements();
});



ul.addEventListener("click", e => {
    // e.preventDefault();
    const id = parseInt(e.target.parentElement.id);
    if (e.target.classList.contains('delete')) {
        deleteTodo(id);
        const elementToRemove = e.target.parentElement;
        elementToRemove.parentElement.removeChild(elementToRemove);
    }
    if (e.target.type === 'checkbox') {
        const parent = e.target.parentElement;
        changeTodoState(parseInt(parent.id));
        if(parent.classList){
            parent.classList.toggle('completed');
        }
    }
});

const deleteTodo = id => {
    todos = todos.filter(todo => todo.id !== id)
    saveToLocalStorage();
}

const changeTodoState = id => {
    todos = todos.map(todo => todo.id === id ? { id: todo.id, text: todo.text, state: !todo.state } : todo)
    saveToLocalStorage();
}

const saveToLocalStorage = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
}


const getLocalStorageItems = () => {
     todos = JSON.parse(localStorage.getItem("todos")) || [];
     createDOMElements();
}
getLocalStorageItems();




