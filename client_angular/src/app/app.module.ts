import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { ImageUploadModule } from "angular2-image-upload";

import { AppRoutingModule } from './app-routing.module';
import {CKEditorModule} from 'ng2-ckeditor';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfoliocomponent/portfolio.component';
import { PortfolioEditComponent } from './portfolioeditcomponent/portfolioedit.component';
import { AboutComponent }   from './aboutcomponent/about.component';
import { ContactComponent }   from './contactcomponent/contact.component';

import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, LetDoService } from './_services/index';
import { EqualValidator } from './_directives/equaldirective';
@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    PortfolioComponent,
    AboutComponent,
    ContactComponent,
    PortfolioEditComponent,
    EqualValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ImageUploadModule.forRoot(),
    CKEditorModule,
    Ng2Bs3ModalModule
  ],
  providers: [         
        customHttpProvider,
        AuthGuard,
        AlertService,
        LetDoService,
         ],
  bootstrap: [AppComponent]
})
export class AppModule { }
