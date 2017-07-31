import { Component } from '@angular/core';
import { Contact } from '../Model/model';
import { LetDoService } from '../_services/index';
import { AlertService } from '../_services/index';

@Component({
  selector: 'contact-root',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  title = 'Let work hard!';
  contact: Contact = new Contact;
  constructor(private letdoservice: LetDoService,private alertService: AlertService) {

  }
  onSubmit() {
    this.letdoservice.contact(this.contact).then(result => {
      console.log(result);
      if (result.status == 'ok') {
        this.alertService.success("successfully submitted!");
      } else {
        this.alertService.error(result.message);
      }
    });
  }
}
