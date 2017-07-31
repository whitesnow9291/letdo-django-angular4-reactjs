import { Component } from '@angular/core';

@Component({
  selector: 'portfolio-root',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  title = 'Let work hard!';
  uploadStateChange(state: boolean) {
  console.log(JSON.stringify(state));
  }
}
