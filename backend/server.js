const express =  require('express')
const mysql = require('mysql2')
const cors = require('cors')
// if you want import like this -> "import express from 'express'" -> add this in package.json -> '"type": "module"'
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test",
})

app.get('/', (req, res) => {
    res.json('this is the backend')
})

app.get('/books', (req, res) => {
    const q = "SELECT * FROM books;"
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })
})

app.post('/books', (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [req.body.title, req.body.desc, req.body.price, req.body.cover]

    db.query(q, [values], (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json("book has been created successfully...")
        }
    })
})

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json('Book has been deleted successfully')
        }
    })
})

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?"
    const values = [req.body.title, req.body.desc, req.body.price, req.body.cover]

    db.query(q, [...values, bookId], (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json('Book has been updated successfully')
        }
    })
})

app.listen(8080, () => {
    console.log('connected to backend...') 
})