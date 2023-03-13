import React, { useEffect, useState } from 'react'
import UpdateTODO from './UpdateTODO';


function TODOlist() {

    const [todoObjectArray,setTodoObjectArray]= useState([]);

    const fetchTODO = async()=>{
        try{
            const response = await fetch("http://localhost:5000/read");
            const JSONcontent = await response.json();
            setTodoObjectArray(JSONcontent);
        }
        catch(err){
            console.error(err.message);
        }

    }

    const deleteTODO = async (id) =>{
        try{
            const response = await fetch(`http://localhost:5000/delete/${id}`,{
                method:"DELETE",
            });
            setTodoObjectArray(todoObjectArray.filter(todo=>todo.todo_id!==id))
            console.log(response)
        }
        catch(err){
            console.error(err.message);
        }
    }

    useEffect(()=>{
        fetchTODO();
    },[])

    //console.log(todos)
  return (
    <>
    <table class="table table-hover mt-5">
        <thead  class="table-light">
            <tr>
            <th>Description</th>
            <th></th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {todoObjectArray.map(todo => (
                <tr key={todo.todo_id}>
                    <td>{todo.description}</td>
                    <td><UpdateTODO todoObject={todo}/></td>
                    <td><button class="btn btn-danger" onClick={()=>{deleteTODO(todo.todo_id)}}>Delete</button></td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
  )
}

export default TODOlist