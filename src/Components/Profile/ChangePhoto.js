import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


export default function ChangePhoto() {
  const [image, setImage] = useState("");
      const navigate = useNavigate();


  const handleChangePhoto = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    const reader = new FileReader();
  
    const imgtag = document.getElementById("myimage");
    imgtag.title = selectedFile.name;
  
    reader.onload = function(event) {
      imgtag.src = event.target.result;
    };
  
    reader.readAsDataURL(selectedFile);

  }
  const returnHome = (e) => {
    if (image !== "") {
    Swal.fire({
      icon: 'info',
      title: 'Guardando foto...',
      text: 'Esto puede tardar algunos segundos',
      showConfirmButton: false,
      timer: 3000
    }).then((value) => {
      Swal.fire({
      icon: 'success',
      title: 'Foto guardada correctamente',
      showConfirmButton: false,
      timer: 1500
    }).then(()=> {
      navigate("/home")
    })
      
    })  
    } else {
       Swal.fire({
      icon: 'error',
      title: 'Selecciona un imagen',
      showConfirmButton: false,
      timer: 1500
    })
    }
    
  }


  return (
    <div>
      <div class="card-group">
        <div class="card "style={{width:"640px"}}>
          <div className='d-flex align-items-center justify-content-center'>
          <img id= "myimage"  class="img-fluid card-img-top" alt="Foto de perfil no seleccionada" style={{maxWidth :"144px"}}/>


          </div>
          <div class="card-body">
            <h5 class="card-title">Foto de perfil</h5>
            <p class="card-text"><label for="formFile" class="form-label">Seleccionar foto de perfil</label>
          <input onChange={handleChangePhoto} class="form-control" type="file" id="formFile"/></p>
          </div>
          <div className='d-flex align-items-center justify-content-center'>
          <div class="card-footer" style={{width:"240px"}}>
          
          <button  className="w-100 btn btn-outline-success" onClick={returnHome}>Guardar</button>
          </div>
            
          </div>
        </div>
      </div>
      
            
   

    </div>
  )
}

