import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';

@NgModule({
  exports:[
    InputTextModule,
    CardModule,
    ButtonModule,
    SplitterModule,
    CheckboxModule,
    ToastModule
  ]
})
export class PrimeNgModule { }
