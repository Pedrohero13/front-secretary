import { useEffect, useState } from "react";
import { authenticationService } from "../Services/auteticationUser";
import logo from '../images/logo.png'

import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
    
    const navigate = useNavigate();
    const [registration_tag, setRegistration_tag] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        const cache = JSON.parse(localStorage.getItem('user'));  
        if(cache){
            navigate("/home")
        }

        
    });

    
   
    const handleSubmit = async e => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/api/secretary/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          registration_tag,
          email,
          password
        })
    }).then((data) => data.json())
      .then((response) => {
        if ('token' in response) {
          swal("Iniciando sesión", response.message, "success", {
            buttons: false,
            timer: 2000,
          })
          .then((value) => {
            localStorage.setItem('accessToken', response['token']);
            
            localStorage.setItem('user', JSON.stringify(response['secretary']));
            navigate("/home")
          });
        } else {
            setError("ERROR!: Usuario no encontrado")
        }
      })
    .catch((error) => {
        setError("ERROR!: Constraseña Incorrecta")
  });
        
      }
  return (
    <div>
        <div  className="d-flex flex-row-reverse bd-highlight">
            <div className="p-2 bd-highlight bg-primary text-light"><strong>Universidad Veracruzana</strong></div>
        </div>
    <div className="container d-flex align-items-center justify-content-center" style={{marginTop:"3em"}}>
        
        <div className="card mb-3 "  >
        <div className="row  ">
            <div className="col-md-6">
            <img src={logo} className="img-fluid rounded-start" alt="Logo"/>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div className="card-body">
            
                
                    <h1 className="text-center">Automatic Documents</h1>
                    <div className="input-group p-2">
                        <input type="text" className="form-control" value={registration_tag} 
                        onChange={(e) => setRegistration_tag(e.target.value)} placeholder="Usuario tag" />
                    </div>
                    <div className="input-group p-2">
                        <input type="email" className="form-control" value={email} 
                        onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div className="input-group p-2">
                        <input type="password" className="form-control" value={password}
                        onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"/>
                    </div>
                    <div className="input-group p-2">  
                        <p class="text-start text-danger">{error}</p>
                    </div>
                        <div className="input-group p-2 d-flex align-items-center justify-content-center">
                            <button onClick={handleSubmit} 
                            className=" btn btn-outline-success">Iniciar sesión</button>

                        </div>
            
                </div>
            </div>
            </div>
            </div>
        
    </div>
    </div>
  )
}
