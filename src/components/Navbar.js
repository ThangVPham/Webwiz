import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import  Logo from '../asset/tailwind-css-logo.svg'

function Navbar() {
  const[active, setActive] = useState(false);
  const menuClick = ()=>{
    setActive(!active);
  }
  return (
    <header className='nav-bg w-screen'>
      <div className="w-full flex p-3 justify-between">
        <div > 
          <img className='w-14' src={Logo} alt='logo'/>
        </div>
        <div onClick={menuClick} className='flex'>
          <div className='text-2xl text-end flex sm:hidden text-white items-center'>
            {!active && <i className="fas fa-bars"></i>}
            {!active && <div className='text-sm'>&nbsp; Menu</div>} 
            {active && <i className="fas fa-times"></i>} 
            {active && <div className='text-sm'>&nbsp; Close</div>}           
          </div>
          <div className='w-full mx-5 hidden  sm:flex  '>
            <ul className= 'text-white text-center font-bold sm:flex items-center'>
              <li>
                <Link className='text-base uppercase  mx-3' to ='/'>Home</Link>
              </li>
              <li>
                <Link className='text-base uppercase  mx-3' to ='/'>View Tournaments</Link>
              </li>
              <li>                
                <Link className='text-base uppercase  mx-3' to ='/'>Login</Link>                            
              </li>
            </ul> 
          </div>
        </div>

      </div>
        <ul className={`${!active && 'hidden'} w-full text-white text-center sm:hidden sm:justify-around`}>
            <li>
              <Link className='text-base uppercase' to ='/'>Home</Link>
            </li>
            <li>
              <Link className='text-base uppercase' to ='/'>View Tournaments</Link>
            </li>
            <li>
              <Link className='text-base uppercase' to ='/'>Login</Link>
            </li>
        </ul>          
    </header>
  )
}

export default Navbar;