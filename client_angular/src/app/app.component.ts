import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './Model/model';
import { AlertService } from './_services/index';
import { LetDoService } from './_services/index';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private letdoservice: LetDoService,
    private alertService: AlertService) { }
  title = 'Let work hard!';
  show_signup_button = true;
  show_login_button = true;
  usermodel: User = new User;
  returnUrl: string;

  ngOnInit() {
    // reset login status
    //this.authenticationService.logout();
    if(localStorage.getItem('currentUser')){
      this.show_login_button = false;
    } else{
      this.show_login_button = true;
    }
    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  @ViewChild('signupModal')
  signupModal: ModalComponent;
  @ViewChild('loginModal')
  loginModal: ModalComponent;
  onSignUp() {
    this.letdoservice.signUp(this.usermodel).then(result => {
      console.log(result);
      if (result.status == 'ok') {
        this.signupModal.close();
        this.alertService.success("successfully registered! please wait until admin approve your account");
      } else {
        this.alertService.error(result.message);
      }
    });
    console.log(this.usermodel);
  }
  onLogin() {
    this.letdoservice.logIn(this.usermodel).then(result => {
      console.log(result);
      
      if (result.status == 'ok') {
        this.loginModal.close();
        this.show_login_button = false;
      } else {
        this.alertService.error(result.message);
      }
    });
    console.log(this.usermodel);
  }
  onLogout() {
    this.show_login_button = true;
    this.letdoservice.logout();
  }
  onProfile() { 
    this.router.navigate(['/portfolioedit']);
  }
  get diagnostic() { return JSON.stringify(this.usermodel) }
}
