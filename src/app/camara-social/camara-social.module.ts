import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { CamaraSocialRoutingModule } from './camara-social-routing.module';
import { CamaraSocialComponent } from './camara-social.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    CamaraSocialRoutingModule
  ],
  declarations: [CamaraSocialComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CamaraSocialModule {}
