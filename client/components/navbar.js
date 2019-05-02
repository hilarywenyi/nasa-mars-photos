import React from 'react'
import {Link} from 'react-router-dom'


const Navbar = () => (
  <div className='navbar-container'>
    <h1>NASA Mars Rover Photos</h1>
    <nav>
        <div className='white-btn-shadow'>
           <Link to="/date">Search Mars Photo By Date</Link>
        </div>
    </nav>
    <hr />
  </div>
)

export default Navbar
