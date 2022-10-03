import { Todo } from "../classes";
import { todoList } from "..";

//Referencias en el html
const divTodoList         = document.querySelector('.todo-list')  ;
const txtInput            = document.querySelector('.new-todo');
const btnBorraCompletados = document.querySelector('.clear-completed')
const ulfilters           = document.querySelector('.filters')
const anchorFiltros       = document.querySelectorAll('.filtro');
let contadorPendientes    = document.querySelector('#cantidadPendientes');

export const contadorPendientesHtml = (todoList) => {
    let contador = 0
    for( let elem of divTodoList.children ) {
        if( !elem.classList.contains('completed') ) {
            contador += 1
        }
    }    
    contadorPendientes.innerText = contador;
}

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
    <div class="view">
        <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
        <label>${ todo.tarea }</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);//agrega el <li> al html y no el div

    return div.firstElementChild;

}



// Eventos
txtInput.addEventListener('keyup', ( event ) => {
    
    if (event.keyCode === 13 && txtInput.value.length > 0 ) {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value='';
        contadorPendientesHtml();
    }
})

divTodoList.addEventListener('click', ( event ) => {

    const nombreElemento = event.target.localName //input, label, button
    const todoElemento = event.target.parentElement.parentElement
    const todoId = todoElemento.getAttribute('data-id')//data-id es el atributo que contiene el id

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed')//cambia el valor de la classe del elemento a completado
    } else if (nombreElemento.includes('button')) {//hay que borrar el todo
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild( todoElemento );
    }
    contadorPendientesHtml();
})

btnBorraCompletados.addEventListener('click', () => {

    todoList.eliminarCompletados();//elimina todos de la lista

    for(let i = divTodoList.children.length-1; i >= 0; i--) {
        const todoCompletado = divTodoList.children[i];
        if( todoCompletado.classList.contains('completed')) {
            divTodoList.removeChild(todoCompletado);
        }
    }
    contadorPendientesHtml();
})

ulfilters.addEventListener('click', ( event ) => {

    const filtro = event.target.text;
    if( !filtro ) { return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children ) {
        elemento.classList.remove('hidden')
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {

            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }

});
