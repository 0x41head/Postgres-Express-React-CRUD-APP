import React, { useState } from 'react'

function InputTODO() {

  const [description, setDescription] = useState("");

  const onFormSubmit=async(e)=>{
    e.preventDefault();
    try{
      const body={description}
      const response = await fetch("http://localhost:5000/create",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(body)
      })
      window.location="/"
      //console.log(response)
    }
    catch(err){
      console.error(err.message);
    }
  }

  return (
    <>
    <h1 className='text-center mt-3 bold'>TODO CRUD App</h1>
    <form className='d-flex mt-5' onSubmit={onFormSubmit}>
      <input type="text" className='form-control' value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
      <button className='btn btn-primary'>Add</button>
    </form>
    </>
  )
}

export default InputTODO