import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fileUpload';
  images = '';
  imgURL = '/assets/noimage.png';
  multipleImages = [];
  imagenes: any = [];
   constructor(private http: HttpClient) {}

  ngOnInit() {
  this.mostrarImg();
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = (event: any)=>{
         this.imgURL = event.target.result;
       }
      this.images = file;
    }
  }

  selectMultipleImage(event) {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.images);
   

    this.http.post<any>('http://localhost:3000/file', formData).subscribe(
      (res) => console.log(res,  Swal.fire({
                icon: 'success',
                title: 'Imagen cargada!!',
                text: 'La imagen se subio correctamente!'
                }).then((result) => {
                            if (result) {
                                       location.reload();
                          }
               }) 
         ),
      (err) => Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Parece que no subio nada!!' 
                    })
    );
   this.imgURL = '/assets/noimage.png';
  
  
  }

  
  mostrarImg(){
    
    this.http.get<any>('http://localhost:3000/upload').subscribe(res => {
    
    this.imagenes = res;
    const reader = new FileReader();
    reader.onload = (this.imagenes);
       
   console.log(this.imagenes);
    });

  }

  deleteImg (id){ 
        
    Swal.fire({
   icon: 'info',
     title: 'Desea eliminar la imagen?',
   showCancelButton: true,
  confirmButtonText: `Eliminar`,
  }).then((result) => {
  if (result.isConfirmed) {
      this.http.delete<any>(`http://localhost:3000/delete/${id}`).subscribe( res => {
    
    console.log(res, location.reload());

    });
  }
});
  

  }

  
}
