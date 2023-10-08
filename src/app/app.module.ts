import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModuleModule } from './sharedModule/shared-module.module';
import { AppRoutingModule } from './app-routing.module';
import { SliderComponent } from './slider/slider.component';
import { VideosComponent } from './videos/videos.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { SliderState } from './store/state/slider.state';
import { videoSate } from './store/state/video.state';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SliderComponent,
    VideosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([SliderState,videoSate]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AppRoutingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    console.log('App module loading')

    }
}
