let form = document.querySelectorAll("form")[0];
let addInput = document.querySelector("#todoName");
let todoListGroup = document.querySelector(".list-group");
let cardBody1 = document.querySelectorAll(".card-body")[0];
let cardBody2 = document.querySelectorAll(".card-body")[1];
let clearButton = document.querySelector("#todoClearButton");
let searchInput = document.querySelector("#todoSearch");

let todos=[];

runEvents();
function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    cardBody2.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",removeAllTodos);
    searchInput.addEventListener("keyup",filter);
}
function filter(e){
    const value = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");
    todoListesi.forEach(function(todo){
        if(todo.textContent.toLowerCase().trim().includes(value)){
            todo.setAttribute("style","display:block");
        }else{
            todo.setAttribute("style","display:none !important");
        }
    })
}
function removeAllTodos(){
    const todoList = document.querySelectorAll(".list-group-item");
    if(todoList.length>0){
        todoList.forEach(function(todo){
             todo.remove();
        });
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
    }
}
function removeTodoToUI(e){
    if(e.target.className =="fa fa-remove"){
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        removeTodoToStorage(todo.textContent);
    }
}
function removeTodoToStorage(removeTodo){
    checkTodos();
    todos.forEach(function(todo,index){
        if(removeTodo==todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function pageLoaded(){
    checkTodos();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}
function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText==null||inputText==""){
        showAlert("warning","Lütfen boş bırakmayınız.");
    }else{
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success","Todo Eklendi.");
    }
    
    e.preventDefault();
}
function addTodoToUI(newTodo){
    const li = document.createElement("li");
    li.className="list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href="#";
    a.className="delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoListGroup.appendChild(li);
    addInput.value = "";
}

function addTodoToStorage(newTodo){
    checkTodos();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
function checkTodos(){
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}
function showAlert(type,message){
    const div = document.createElement("div");
    div.className ="alert alert-"+type;
    div.textContent =message;
    cardBody1.appendChild(div);
    // <div class="alert alert-warning" role="alert">
    //                         This is a warning alert—check it out!
    //                       </div>
    setTimeout(function(){
        div.remove();
    },1000);
}

{/* <li class="list-group-item d-flex justify-content-between">Todo 1
                            <a href="#" class="delete-item">
                                <i class="fa fa-remove"></i>
                            </a>
                        </li> */}