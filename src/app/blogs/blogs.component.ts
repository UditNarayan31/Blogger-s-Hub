import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import AOS from 'aos';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
serviceArray;
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    AOS.init();
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

}
