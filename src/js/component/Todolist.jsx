import React, { useEffect, useState } from  "react";


const Todolist = () =>{
    const host="https://playground.4geeks.com/todo";
    const user="Javi1";

    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");
    const [borrarTarea, setBorrarTarea] = useState();
    

    
    
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
    async function  crearTareas (){
        const uri = `${host}/todos/${user}`;
        const todo = {label: nuevaTarea,is_done:false};
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
        setNuevaTarea("");
        traerTareas();
    };





    //funcion que nos trae las tareas metodo GET
    async function  traerTareas (){
        const uri = `${host}/users/${user}`
        const options = {method: "GET"}
        const response = await fetch(uri, options);


        //Funcion que borra las tareas (Metodo delete)
        async function borrarTarea() {
            const uri = `${host}/todos/${user}/${id}`;
            const options = { method: "DELETE" };
            const response = await fetch(uri, options);
        };
    

        

            //manejo errores
            if (!response.ok) {
                console.log("error",response.status,response.statusText);

            };
       
       
    
        const data = await response.json();
        setTareas(data.todos);

    };

    useEffect(()=>{
        crearUsuario();
        traerTareas();
    },[]);

    // html 
    return (
        <div className="container text-center  col-4 mt-3clae">
            <input 
            type="text"
            value={nuevaTarea}
            placeholder="Escribe la tarea"
            onChange={(evento)=>setNuevaTarea(evento.target.value)}
             />
            <button onClick={()=>crearTareas()}>Crear Tarea</button>
                <ul className="list-group">
                    {tareas.map((item) =>
                    <div>
                    <li className="list-group-item">{item.label}</li> 
                    <button onClick={() => borrarTarea(item.id)}>Borrar</button>
                    </div>)}

                </ul>
        </div>
    )

}

export default Todolist;