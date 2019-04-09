import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule, TooltipModule, ModalModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
   declarations: [
      AppComponent,
      PessoasComponent,
      NavigationComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
