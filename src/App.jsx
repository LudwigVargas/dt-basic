import Search from './components/SearchBar';
import './App.css';
import 'styled-components'
import React, {useState, useEffect} from 'react';
import DataTable , {createTheme} from 'react-data-table-component';
import SearchBar from './components/SearchBar';

const App = () => {
  const [Issues, setIssues] = useState([])
  //1 - Configurar los hooks
  const [users, setUsers] = useState( [] )
  const [info, setInfo] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  //const [data, setData] = useState([])
  
  /*
  const InfoList = ({ id, title, user, html_url }) => {
    const handleIssueClick = () => {
      const link = 'html_url'

      const encodedLink = encodeURI(link)

      const endpoint = 'https://api.github.com/repos/facebook/react/issues'

      window.open(endpoint)
    }
    return (
      <div className='list-group'>
        <a href={html_url}>{title}</a>
      </div>)
      */

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }
  const filteredData = Issues.filter((Issues) => {
    return Issues.title.toLowerCase().includes(searchTerm.toLowerCase())
  })
  //2 - Función para mostrar los datos con fetch
  
  const URL = 'https://api.github.com/repos/facebook/react/issues'
  const showData = async () => {
    const response = await fetch(URL)
    const data     = await response.json()
    console.log(data)
    setUsers(data)
  }   
  /*
  useEffect(()=> {
    fetch('https://api.github.com/repos/facebook/react/issues')
    .then((response) => {
      return response.json()
    }).then((results) => {
      console.log(results)
      setInfo(results)
    }).catch((error) => {
      console.error(error)
    })
  }, [])
*/

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
      selector: row => row.title,
      return: (
      <ul>
      <a href= "https://api.github.com/repos/facebook/react/issues">row.title</a>
      </ul>)
      //<a href ={row => html_url}>{row.title}</a>
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
      data={filteredData}
      theme="solarized"
    />
  );

  //4 - Mostramos la data en DataTable
  return (
    <div>
      <div className='search-bar'>
        <Search handleSearchChange={handleSearch} />
      </div>
      <h1>React Issues</h1>
     <DataTable 
      columns={columns}
      data={users}
      theme='custom' //habilitar esta linea y descomentar createTheme()
      pagination
     />
    </div>
  );
}//}
export default App;
