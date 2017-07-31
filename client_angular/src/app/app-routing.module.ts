import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './aboutcomponent/about.component';
import { PortfolioComponent } from './portfoliocomponent/portfolio.component';
import { PortfolioEditComponent } from './portfolioeditcomponent/portfolioedit.component';
import { ContactComponent } from './contactcomponent/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'portfolioedit/:id', component: PortfolioEditComponent },
  { path: 'portfolioedit', component: PortfolioEditComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/