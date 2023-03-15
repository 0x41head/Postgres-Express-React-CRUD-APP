const express = require("express");
const app = express();
const pool = require("./db")
const cors = require("cors");

const connectToDB = async () => {
    var retry =5
    while(retry){
        try {
            await pool.connect();
            break;
        } catch (err) {
            if (retry>0){
                retry=retry-1;
                console.log(retry+ " retries left")
            }
            else{
                console.log(err.message)
            }
        }
    }
  };
connectToDB();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
//CREATE
app.post("/create",async(req,res)=>{
    try{
        const {description} = req.body;
        const newData = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]);

        res.json(newData.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

//READ

//GET ALL TABLE ROWS
app.get("/read",async(req,res)=>{
    try{
        const allData = await pool.query("SELECT * FROM todo");
        res.json(allData.rows);
    }catch(err){
        console.error(err.message);
    }
})

//GET SINGLE TODO
app.get("/read/:id",async(req,res)=>{
    try{
        const {id} = req.params
        const singleTodo = await pool.query("SELECT * FROM todo where todo_id = $1",[id]);
        res.json(singleTodo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

// UPDATE A ROW
app.put("/update/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const {description} = req.body;
        const updateData = await pool.query("UPDATE todo SET description = $1 where todo_id = $2 RETURNING *",[description,id]);
        res.json(updateData.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

//DELETE A ROW
app.delete("/delete/:id",async(req,res)=>{
    try{
        const {id} = req.params
        const deleteTodo = await pool.query("DELETE FROM todo where todo_id = $1 RETURNING *",[id]);
        res.json(deleteTodo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

// LISTEN ON PORT 5000
app.listen(5000, ()=>{
    console.log("Server started on port 5000");
})