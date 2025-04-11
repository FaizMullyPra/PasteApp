import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex flex-row gap-4 place-content-evenly '>
            <NavLink to='/'>
                Home
            </NavLink>

            <NavLink to='/pastes'>
                Pastes
            </NavLink>
        </div>
        // <nav className='navbar'>
        //     <div className='navbar__logo'>
        //         <h1>Pastebin</h1>
        //     </div>
        //     <ul className='navbar__links'>
        //         <li><a href="/">Home</a></li>
        //         <li><a href="/pastes">Pastes</a></li>
        //         <li><a href="/pastes/:id">PasteList</a></li>
        //     </ul>
        // </nav>
    )
}
export default Navbar