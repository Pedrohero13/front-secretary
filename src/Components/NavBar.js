import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import personico from '../images/person-circle.svg'

export default function NavBar() {
    const navigate = useNavigate();
    const cache = JSON.parse(localStorage.getItem('user'));  
  
  
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/")
    };
    const gotoProfile = () => {
        navigate("/profile")
    };
    const reloading = () => {
        window.location.href = "/home"; 
       };

  return (
    <div>
        <nav className="navbar  bd-highlight bg-primary navbar-expand-lg ">
        <a className="navbar-brand text-light" onClick={reloading}>Automatic Documents</a>

        <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg" aria-controls="navbarOffcanvasLg">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">
        <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel"></h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
        <form className="d-flex">
        
        <a className="navbar-brand text-light" >{cache.name} {cache.first_surname} {cache.second_surname}</a>
       
        
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle"  id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    
                    <img src={personico} alt="icono" width={"40px"} />
                </a>
                <ul className="dropdown-menu dropdown-menu-end bg-primary" aria-labelledby="navbarDarkDropdownMenuLink">
                    <li><a className="dropdown-item text-light" onClick={gotoProfile}>Perfil</a></li>
                    <li><a className="dropdown-item text-light" onClick={handleLogout}>Cerrar sesion</a></li>
                    
                </ul>
                </li>
            
        </form>
        </ul>
        
      </div>
        </div>
    </nav>

    

    </div>
  )
}
