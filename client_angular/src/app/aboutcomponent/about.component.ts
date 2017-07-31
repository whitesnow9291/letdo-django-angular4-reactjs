import { Component } from '@angular/core';
import { Http } from '@angular/http';
@Component({
  selector: 'about-root',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  myData: Array<any>;
  // constructor(private http:Http){
  //   this.http.get('https://jsonplaceholder.typicode.com/photos')
  //     .map(response => response.json())
  //     .subscribe(res => this.myData = res);
  // }
}
