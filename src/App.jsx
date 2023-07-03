import './App.css';
import 'styled-components'
import React, {useState, useEffect} from 'react';
import DataTable , {createTheme} from 'react-data-table-component';
import { Link, Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'
//import SearchBar from './components/SearchBar';

const App = () => {
  //1 - Configurar los hooks
  const [users, setUsers] = useState( [] )
  //const [data, setData] = useState([])
  //const [searchTerm, setSearchTerm] = useState('')

  //const handleSearchChange = (event) => {
    //setSearchTerm(event.target.value)

  //2 - Función para mostrar los datos con fetch
  const URL = 'https://api.github.com/repos/facebook/react/issues'
  const showData = async () => {
    const response = await fetch(URL)
    const data     = await response.json()
    console.log(data)
    setUsers(data)
  }

  useEffect( ()=>{
    showData()
  }, [])

  //3 - Configuramos las columns para Datatable
  const columns = [
    {
      name: 'ID',
      selector: row => row.id
    },
    {
      name: 'TITULO',
      selector: row => row.title
      //<Router>
      //<Route path='https://github.com/facebook/react/pull/24117'>
      //selector: row => row.title
      //</Route>
      //</Router>
    },
    {
      name: 'USUARIO',
      selector: row => row.user.login
    },

  ]
  
  const MyComponent = () => (
    <DataTable
      title="Arnold Movies"
      columns={columns}
      theme="solarized"
    />
  );

  //4 - Mostramos la data en DataTable
  return (
    <div className='App'>

      <h1>React Issues</h1>
     <DataTable 
      columns={columns}
      data={users}
      //theme='custom' //habilitar esta linea y descomentar createTheme()
      pagination
     />
    </div>
  );
}//}
export default App;
