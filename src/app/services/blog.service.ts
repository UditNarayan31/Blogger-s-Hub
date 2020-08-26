import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private angularFireDb:AngularFireDatabase, private store:AngularFirestore, private route:ActivatedRoute) {}
  itemList:AngularFireList<any>;
  
 
  getService(){
    this.itemList = this.angularFireDb.list("blogs");
   return this.itemList.snapshotChanges();
  }
  insertBlog(blogData){
     this.itemList.push({
       blog:blogData.blog,
       desc:blogData.desc,
       imageUrl:blogData.imageUrl
     });
  }
  updateBlog(blogData){
    this.itemList.update(blogData.$key,{
      blog:blogData.blog,
       desc:blogData.desc,
       imageUrl:blogData.imageUrl
    });
  }
  deleteService($key:string){
    this.itemList.remove($key);
  }
}
