import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterListRoutingModule } from './character-list-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [  
   
  ],
  imports: [
    CommonModule,
    CharacterListRoutingModule,
    NgxPaginationModule
  ],
  exports: [
    
  ]
})
export class CharacterListModule { }
