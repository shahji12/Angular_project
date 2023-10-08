import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { MainComponent } from '../main.component';
// import { HttpClientModule} from '@angular/common/http';
// import { ToastrModule } from 'ngx-toastr';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from 'app/header/header.component';
import { SidebarComponent } from 'app/sidebar/sidebar.component';
import { FooterComponent } from 'app/footer/footer.component';
import { HomeComponent } from 'app/home/home.component';
import { SharedModuleModule } from 'app/sharedModule/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/auth.guard';
import { VideosComponent } from 'app/videos/videos.component';


const routes: Routes = [
   { path:'',
   component:HomeComponent,
   children:[
    {
      path: '',
      redirectTo: 'main',
      pathMatch: 'prefix'
   },
    {path:'main', component:MainComponent},
    {path:'videos', component:VideosComponent}
   ]
  }
];


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule {
  constructor(){
  console.log('Main module loading')

  }
}
