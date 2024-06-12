import React, { useEffect, useState } from  "react";


const Todolist = () =>{
    const host="https://playground.4geeks.com/todo";
    const user="Javi";

    const [tareas, setTareas] = useState([])


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
        traerTareas();
    },[]);

    console.log(tareas);


    return (
        <div>
            {tareas.map((item)=>
                <p>{item.label}</p>
            )}
        </div>
    )

}

export default Todolist;