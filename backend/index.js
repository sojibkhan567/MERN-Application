import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

//database conection
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "book_crud"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//Application router
app.get("/", (req, res)=>{
    res.json("This backend");
})

app.get("/books", (req, res)=>{
    const q = "SELECT * FROM books";
    db.query(q, (err, data)=>{
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
    })
})

app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];
    db.query(q, [values], (err, data)=>{
        if(err){
            res.json(err)
        }else{
            res.json("Book has been created")
        }
    });
});

app.delete("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ? "

    db.query(q, [bookId], (err, data)=>{
        if(err){
            res.json(err)
        }else{
            res.json("Book has been deleted successfuly!")
        } 
    });
})

// update route
app.put("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?,`desc`= ?,`price`= ?, `cover`= ? WHERE id = ? ";

    const values=[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [...values, bookId], (err, data)=>{
        if(err){
            res.json(err)
        }else{
            res.json("Book has been deleted successfuly!")
        } 
    });
})

app.listen(5000, ()=>{
    console.log("Backend run on port: 5000")
})