
export class Todo {

    //el siguiente metodo tiene por objeto crear las instancias de todo de aquellos que vienen del localstorage
    //y que no son instancias de esta clase. Se construirán en base a las mismas propiedades recuperadas del localstorage
    static fromJson({id, tarea, completado, creado}) {//obj es el objeto que recibimos del localstorage (y que no es una istancia del todo)
        const tempTodo = new Todo(tarea);

        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;

        return tempTodo;
    }


    constructor( tarea ) {

        this.tarea = tarea;
        this.id = new Date().getTime();
        this.completado = false
        this.creado = new Date();

    }

}

