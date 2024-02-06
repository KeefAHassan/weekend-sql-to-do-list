console.log('JS is sourced!');
//client.js steps
//1 - create a function for submitting todo to the server
//2 - create a function fot getting all todo & shpw on the table
//3 - create a functions for mark as complete & delete.


getTodos()


function submitItem(event) {
    event.preventDefault()
    const input = document.getElementById("toDoTextInput")
    const newTodo = {
        text: input.value
    }
    axios({
        method: 'POST',
        url: '/todos',
        data: newTodo
    }).then(response => {
        getTodos();

    }).catch(error => {
        console.log('Error in POST request', error);
    });
}

function getTodos() {
    axios({
        method: 'GET',
        url: '/todos'
    }).then(response => {
        let tbody = document.getElementById("todobody")
        tbody.innerHTML = '';
        for (let todo of response.data) {

            tbody.innerHTML += `
      <tr data-testid="toDoItem" class="${todo.isComplete && "completed"}">
        <td>${todo.text}</td>
        <td><button data-testid="completeButton" onclick="MarkAsComplete(${todo.id})">Mark As Complete</button></td>
        <td><button data-testid="deleteButton" onclick="deleteTodo(${todo.id})">Delete</button></td>
      </tr>
    `;
        }


        console.log('GET response is good', response);
    }).catch(error => {
        console.log('GET response went wrong', error);
    });
}
function MarkAsComplete(id) {
    axios({
        method: 'PUT',
        url: `/todos/${id}`
    }).then(response => {
        getTodos();
    }).catch(error => {
        console.log('PUT function failed', error);
    });
}
function deleteTodo(id) {
    axios({
        method: 'DELETE',
        url: `/todos/${id}`
    }).then(response => {
        getTodos();
    }).catch(error => {
        console.log('PUT function failed', error);
    });
}
