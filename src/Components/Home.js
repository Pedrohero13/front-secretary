import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import NavBar from "./NavBar";
import status_true from '../images/status_true.svg'
import status_false from '../images/status_false.png'
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [files, setFiles]  = useState([]);
    const user = JSON.parse(localStorage.getItem('user')); 
    const [selectedFile, setSelectedFile] = useState("");
    const [file, setFIle]  = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/documents')
         .then((response) => response.json())
         .then((data) => {
            setFiles(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
    }, []);

    const reloading = () => {
        window.location.href = "/home"; 
    };
    const summitFile  = (e) => {
        
        
        if (file != "") {

            Swal.fire({
                icon: 'info',
                title: 'Guardando archivo...',
                text: 'Esto puede tardar algunos segundos',
                showConfirmButton: false,
                timer: 3000
            })
           
          .then((value) => {
            Swal.fire({
                icon: 'info',
                title: 'Archivo guardado correctamente',
                showConfirmButton: false,
                timer: 1500
            })
          });
        } else {
            Swal.fire("No se a seleccionado algun archivo", "","error");
        }
        
         
    }
    
    const handleChangePhoto = (e) => {
        const selectedFile = e.target.files[0];
        setFIle(selectedFile);

  }
    const Trigger = (e) => {
    
        
        fetch('http://localhost:8000/api/student/'+e.id_student)
         .then((response) => response.json())
         .then((data) => {
            const select = {
                 name: data.name + " " + data.first_surname + " " + data.second_surname,
                 career: data.career,
                 name_document: e.name_document,
                 description: e.description
             }
             setSelectedFile(select)
             
         })
         .catch((err) => {
            console.log(err.message);
         });
        
        
    }
    const deleteFile = (e) => {
        console.log(e.id)
        Swal.fire({
            title: 'Seguro que deseas eliminar el registro '+e.id+'?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                fetch('http://localhost:8000/api/document/'+e.id, { method: 'DELETE' })
                .then((response) => response.json())
                .catch((err) => {
                    console.log(err.message);
                });
                
                Swal.fire('Borrado correctamente!', '', 'success').then(
                    () => {
                        reloading();
                    }
                )
            } else if (result.isDenied) {
                Swal.fire('No se a borrado', '', 'info')
            }
        })
   }
  return (
    <div>
        <div  className="d-flex flex-row-reverse bd-highlight">
            <div className="p-2 bd-highlight bg-primary text-light"><strong>Universidad Veracruzana</strong></div>
        </div>
        <div><NavBar></NavBar></div>
        <div className="d-flex bd-highlight">
        <div className="p-2 bd-highlight bg-success text-light"><strong>{user.career}</strong></div>

        </div>
        
        <div className="container" style={{marginTop:"7em"}}>
            <table className="table">
                <thead>
                    <tr>
                     <th>Id</th>   
                    <th scope="col">Nombre</th>
                    <th scope="col">Documento</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Status</th>
                    <th scope="col">Archivo abjunto</th>
                    <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                {files.map((file, index) => (
                    <tr key={index}>
                    <th>{file.id}</th>
                    <th scope="row">{file.student}</th>
                    <td>{file.name_document}</td>
                    <td>{file.description}</td>
                    <td>{file.date_solicited}</td>
                    <td>{file.status ?
                            (<img src={status_true} alt="Bootstrap" width={"40px"} />):
                            (<img src={status_false} alt="Bootstrap" width={"40px"} />)}</td>
                        <td><button type="button" className="btn btn-outline-info"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => { Trigger(file) }}>Adjuntar</button></td>
                    <td><button type="button" className="btn btn-outline-warning" onClick={() => { deleteFile(file) }} >Borrar</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        
    


        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Solicitud de tramite</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p><strong>Nombre: </strong> {selectedFile.name}</p>
                <p><strong>Carrera: </strong> {selectedFile.career}</p>
                <p><strong>Tipo de documento: </strong> {selectedFile.name_document}</p>
                <p><strong>Descripcion: </strong> {selectedFile.description}</p>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Adjuntar archivo</label>
                    <input onChange={handleChangePhoto} class="form-control" type="file" id="formFile"/>
                </div>
                                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={summitFile}>Confirmar</button>
            </div>
            </div>
        </div>
        </div>

    </div>
  )
}
