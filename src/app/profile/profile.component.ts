import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'
import { Router } from '@angular/router';
import AOS from 'aos';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

uploadImg:String = "assets/upload.jpg";
selectedImg:any = null;
isSubmit:Boolean = false;
   userList;
  serviceArray = [];
  showMessage:boolean;
  alertMessage;
  updateImg;

  blogForm = new FormGroup({
    $key: new FormControl(null),
    blog: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
  })
  
   

  constructor(private blogService: BlogService, private store: AngularFireStorage, private route:Router) {}

  ngOnInit(): void {
    AOS.init();
    this.blogForm.reset();
    this.blogService.getService().subscribe(
      list => {
         this.serviceArray = list.map(item => {
           return {
             $key: item.key,
             ...item.payload.val()
           };
         });
      });

  }

  showPreview(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.uploadImg = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0]
    }else{
      this.uploadImg = "assets/images/upload.png";
      this.selectedImg = null;

    }
  }

onSubmit(formVal){
  this.isSubmit = true;
  if(this.blogForm.valid){
    var filepath = `${formVal.caption}/${this.selectedImg.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.store.ref(filepath)
    this.store.upload(filepath, this.selectedImg).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          formVal['imageUrl'] = url;
          this.blogService.insertBlog(formVal);
         this.blogForm.reset();
          this.uploadImg = "assets/upload.jpg";
         })
      })
    ).subscribe();
  }else{
  }
}

// update data
updateData(item){
 this.blogForm.setValue(item);
 this.uploadImg = "assets/upload.jpg";
    this.selectedImg = null;
}
// delete data
onDelete($key){
  if(confirm("are you sure want to remove")){
    this.blogService.deleteService($key);
  }
}
// update submit
onUpdate(formVal){
  this.blogService.updateBlog(formVal);
  this.blogForm.reset();
  this.showMessage = true;
  this.alertMessage = "Blog has Been Updated";
 setTimeout(() => {
   this.showMessage = false;
 }, 2000);
}


}
