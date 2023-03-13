import React, { useState } from 'react'

function UpdateTODO({todoObject}) {

  const [description,setDescription]=useState(todoObject.description);
  const id = todoObject.todo_id;

  const updateDescription = async()=>{
    try{
      const body={description};
      const response = await fetch(`http://localhost:5000/update/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(body)
      })
      window.location="/"
      //console.log(response);
    }catch(err){
      console.error(err.message);
    }
  }


  return (
    <>
    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id-${id}`}>
      Update
    </button>

    <div class="modal" id={`id-${id}`}>
      <div class="modal-dialog">
        <div class="modal-content">
 
          <div class="modal-header">
            <h4 class="modal-title">Update Description</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={() => setDescription(todoObject.description)}></button>
          </div>

          <div class="modal-body">
            <input type="text" class="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-bs-dismiss="modal" onClick={e => updateDescription(e)}>Update</button>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default UpdateTODO