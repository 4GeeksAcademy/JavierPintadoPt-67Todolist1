import React, { useEffect, useState } from  "react";


const Todolist = () =>{
    const host="https://playground.4geeks.com/todo";
    const user="Javi1";

    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");

    // funcion botn enter
    const handleKeyPress = (event) =>{
        if(event.key==="Enter"){
            crearTareas(nuevaTarea)
        }
    }
    
    // funcion que nos crea el ususario Javi metodo POST
    async function  crearUsuario (){
        const uri = `${host}/users/${user}`
        const options = {method: "POST"}
        const response = await fetch(uri, options);
       
        //manejo errores
        if (!response.ok) {
            console.log("error",response.status,response.statusText);

        };
        const data = await response.json();
    };

    // funcion que crea tareas metodo POST
    async function  crearTareas (tarea){
        const uri = `${host}/todos/${user}`;
        const todo = {label:tarea,is_done:false};
        const options = {
            method: "POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(todo)
        };

        
        const response = await fetch(uri, options);
       
        //manejo errores
        if (!response.ok) {
            console.log("error",response.status,response.statusText);

        };
        setNuevaTarea("");// cuando creo la tarea limpio input
        traerTareas();  // fetch trae todas las tareas
    };





    //funcion que nos trae las tareas metodo GET
    async function  traerTareas (){
        const uri = `${host}/users/${user}`
        const options = {method: "GET"}
        const response = await fetch(uri, options);


        
       
            //manejo errores
            if (!response.ok) {
                console.log("error",response.status,response.statusText);

            };
       
       
    
        const data = await response.json();
        setTareas(data.todos);

    };
    //Funcion que borra las tareas (Metodo delete)
     async function borrarTarea(id) {
            const uri = `${host}/todos/${id}`;
            const options = { method: "DELETE",headers:{accept: 'accept: application/json'} };
            const response = await fetch(uri, options);
            traerTareas();

        };

    useEffect(()=>{
        crearUsuario();
        traerTareas();
    },[]);

    // html 
    return (
        <form className="container text-center  col-4 mt-3">
            <input 
            type="text"
            value={nuevaTarea}
            placeholder="Escribe la tarea"
            onChange={(evento)=>setNuevaTarea(evento.target.value)}
            onKeyDown={handleKeyPress}
             />
            <button onClick={()=>(crearTareas(nuevaTarea))} onKeyDown={handleKeyPress(nuevaTarea)}>Crear Tarea</button>
                <div className=" ">
                    {tareas.length === 0 ? (
          <p>No hay tareas, añadir tareas</p>
        ) : (tareas.map((item) =>
            <div className="tareas row">
                <li className=" text-center list-group-item col-12">{item.label}
                <button 
                    onClick={() => borrarTarea(item.id)} 
                    className="col-1 botonBorrar">
                    <i class="fa-solid fa-circle-xmark"></i>
                </button>
                </li>
               
            </div>)) }

                </div>
        </form>
    )

}

export default Todolist;