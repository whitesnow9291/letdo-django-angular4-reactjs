import { Component } from '@angular/core';
import { User, Portfolio } from "../Model/model";
import { LetDoService, AlertService } from "../_services/index";


@Component({
  selector: 'portfolioedit-root',
  templateUrl: './portfolioedit.component.html',
  styleUrls: ['./portfolioedit.component.css']
})
export class PortfolioEditComponent {
  title = 'Let work hard!';
  content = '';
  user: User = new User;
  portfolio: Portfolio = new Portfolio;

  constructor(private letdoservice: LetDoService, private alertService: AlertService) {
    this.content = '<p>Hello <strong>World !</strong></p>'
  }
  uploadStateChange(state: boolean) {
    console.log(JSON.stringify(state));

  }
  onSaveCredit() {
    this.letdoservice.saveCreditProfile(this.user).then(result => {
      console.log(result);
      if (result.status == 'ok') {
        this.alertService.success("successfully submitted!");
      } else {
        this.alertService.error(result.message);
      }
    });
  }
  onSaveContent() {
    this.letdoservice.saveCKeditor(this.content).then(result => {
      if (result.status == 'ok') {
        this.alertService.success("successfully submitted!");
      } else {
        this.alertService.error(result.message);
      }
    });
  }
}
