import React, { useEffect, useState } from  "react";


const Todolist = () =>{
    const host="https://playground.4geeks.com/todo";
    const user="Javi";

    const [tareas, setTareas] = useState([])
    
    
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

    useEffect(()=>{
        crearUsuario();
        traerTareas();
    },[]);


    return (
        <div className="container text-center  col-4 mt-3clae">
                <ul className="list-group">
                    {tareas.map((item) =>
                    <li className="list-group-item">{item.label}</li> )}
                </ul>
        </div>
    )

}

export default Todolist;