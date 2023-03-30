import { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../styles/commonStyles'

const Update = () => {
  const [books, setBooks] = useState({
    title: '',
    desc: '',
    price: null,
    cover: ''
  })

  const navigate = useNavigate()
  const location = useLocation()

  const bookId = location.pathname.split('/')[2]

  const handleChange = (e: any) => {
    setBooks(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleClick = async(e: any) => {
    e.preventDefault()
    await axios.put('http://localhost:8080/books/' + bookId, books).then((res) => {
      navigate('/')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div 
      className={`${styles.centerAll} flex-column gap-3`}
      style={{height: "100vh"}}
    >
      <h1>Update The Book</h1>
      <input 
        style={{width: "250px", padding: "10px", border: "1px solid gray"}} 
        type="text" 
        placeholder='title' 
        onChange={handleChange} 
        name='title'
      />
      <input 
        style={{width: "250px", padding: "10px", border: "1px solid gray"}} 
        type="text" 
        placeholder='desc' 
        onChange={handleChange} 
        name='desc'
      />
      <input 
        style={{width: "250px", padding: "10px", border: "1px solid gray"}} 
        type="number" 
        placeholder='price' 
        onChange={handleChange} 
        name='price'
      />
      <input 
        style={{width: "250px", padding: "10px", border: "1px solid gray"}} 
        type="text" 
        placeholder='cover' 
        onChange={handleChange} 
        name='cover'
      />
      <button 
        className='border-0 px-5 py-2 rounded fw-bold cursor-pointer'
        onClick={handleClick}
        style={{background: "rgb(244, 142, 74)", color: 'white'}}
      >
        Update
      </button>
    </div>
  )
}

export default Update