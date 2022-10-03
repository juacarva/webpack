import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';
import { contadorPendientesHtml } from './js/componentes';



export const todoList = new TodoList();

todoList.todos.forEach(element => crearTodoHtml(element));