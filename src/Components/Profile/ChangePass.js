import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './styles.css';

export default function ChangePass() {
  const user = JSON.parse(localStorage.getItem('user'));  
  const [actualPass, setActualPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [conPass, setConPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();




  const handleSubmit = async e => {
    e.preventDefault();
  
    if (newPass == conPass) {
      if (newPass != actualPass) {
        fetch('http://localhost:8000/api/changePassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
              id: user.id,
              password: actualPass,
              newPassword: newPass
            })
        })
            .then((response) => response.json())
         .then((data) => {
           console.log(data);
           swal("Iniciando sesión", data.message, "success", {
            buttons: false,
            timer: 2000,
          })
          .then((value) => {
            localStorage.setItem('accessToken', data['token']);
            
            localStorage.setItem('user', JSON.stringify(data['secretary']));
            navigate("/home")
          });
         })
         .catch((err) => {
            setError("ERROR: ¡La contraseña actual no es correcta!")
         });
      } else {
        setError("ERROR: ¡La nueva contraseña es igual a la actual!")
      }
          
      
    } else {
        setError("ERROR: ¡La contraseña no coincide!")
        }
      }
  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div>
        <div className="input-group p-2  ">

          <label for="actualPass" class="col-form-label">Contraseña actual: </label>
          <input id='actualPass' type="password" className="form-control" value={actualPass}
          onChange={(e) => setActualPass(e.target.value)} placeholder="Contraseña" />
          
        
      </div>

      <div className="input-group p-2">
        <label for="newPass" class="col-form-label">Nueva contraseña: </label>
        <input id='newPass' type="password" className="form-control" value={newPass}
          onChange={(e) => setNewPass(e.target.value)} placeholder="Nueva contraseña" />
      </div>
      <div className="input-group p-2">
        <label for="conPass" class="col-form-label">Repetir contraseña: </label>
        <input id='conPass' type="password" className="form-control" value={conPass}
          onChange={(e) => setConPass(e.target.value)} placeholder="Confirmar contraseña" required/>
        
      </div>
      <div className="input-group p-2">
        
        <p class="text-start text-danger">{error}</p>
      </div>

      <div className="input-group p-2 d-flex align-items-center justify-content-center ">
          <button onClick={handleSubmit} 
          className="  btn btn-outline-success">Cambiar</button>

      </div>
</div>
      
    </div>
  )
}

