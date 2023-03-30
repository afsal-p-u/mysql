import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from '../styles/commonStyles'

const Books = () => {
  const [books, setBooks] = useState<any[]>([])
  
  const handleDelete = async (id: number) => {
    await axios.delete('http://localhost:8080/books/' + id).then((res) => {
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    const fetchAllBooks = async () => {
      await axios.get('http://localhost:8080/books').then((res) => {
        setBooks(res.data)
      }).catch((err) => {
        console.log(err)
      })
    }
    fetchAllBooks()
  }, [handleDelete])


  return (
    <div 
      style={{width: "100%", height: "100vh", boxSizing: 'border-box', padding: "0 100px"}} 
      className={`${styles.centerAll} flex-column`}>
      <h1>Afsal Book Shop</h1>
      <div className="d-flex gap-2">
        {books.map(book => (
          <div 
            className="me-2 d-flex flex-column align-items-center rounded overflow-hidden shadow-lg" 
            style={{width: "250px", background: "black"}} 
            key={book.id}
          >
            {book.cover && 
              <div style={{width: "100%", height: "300px", background: "red"}}>
                <img
                  style={{width: "100%", height: "100%", objectFit: 'cover'}}
                  className='bg-danger' 
                  src={book.cover} alt="cover-img" 
                />
              </div>
            }
            <h3 
              style={{wordBreak: 'break-word'}} 
              className="fs-4 mt-2 fw-bold text-light"
            >
              {book.title}
            </h3>
            <p className='text-secondary-emphasis'>{book.desc}</p>
            <span className="bg-success text-light px-2 py-1 mb-2 rounded">${book.price}</span>
            <div className="d-flex mb-3">
              <button 
                onClick={() => handleDelete(book.id)}
                className={`${styles.customBtn}`}
                style={{border: "1px solid rgb(245, 191, 191)", color: 'rgb(242, 100, 100)'}}
              >
                Delete
              </button>
              <button 
                className={`${styles.customBtn}`}
                style={{border: "1px solid rgb(204, 204, 243)", color: 'rgb(139, 139, 234)'}}
              >
                <Link to={`/update/${book.id}`}>Update</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button 
        className='mt-3 px-3 py-2 border-0 rounded fw-semibold'
        style={{background: "rgb(244, 142, 74)"}}
      >
        <Link to='/add' className='text-light'>Add new book</Link>
      </button>
    </div>
  )
}

export default Books