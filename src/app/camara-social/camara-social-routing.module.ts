import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { CamaraSocialComponent } from './camara-social.component';

const routes: Routes = [{ path: '', component: CamaraSocialComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class CamaraSocialRoutingModule {}
