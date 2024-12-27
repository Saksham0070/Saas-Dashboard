import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import { Link } from 'react-router-dom';
import "../src/components/Navbar.css";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Jobs from './components/Jobs';
import Settings from './components/Settings';
const App = () => {
  let tog = false;
  return (
    <Router>  
      {
        (!tog)?(
          <>
          <Navbar />
          </>
        ):(<div className='navbar'>
        <div className="navbar-left">
        <Link className="navbar-brand" to="/">
          Skill Tank
        </Link>
      </div>
      </div>)
      }
      
    <div style={{display:"flex",marginTop: "70px"}}>
      <Sidebar />    
        <div>
        <Routes>
          <Route exact path='/' element = {<Home />}/>
          <Route exact path='/createuser' element = {<Signup />}/>
          <Route exact path='/login' element = {<Login />}/>
          <Route exact path='/dashboard' element = {<Dashboard/>}/>
          <Route exact path='/analytics' element = {<Analytics/>}/>
          <Route exact path='/jobs' element = {<Jobs/>}/>
          <Route exact path='/settings' element = {<Settings/>}/>
        </Routes>
        </div>
      
      </div>
    </Router>
  )
}

export default App;
