import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Videos } from 'app/Models/videos';
import { MainService } from 'app/service/main.service';
import { AddVideos, GetVideos } from 'app/store/action/video.action';
import { videoSate } from 'app/store/state/video.state';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  videoContent : any = []
  url = '';
  attachment = '';
  isUpdate = false;
  videoId : number = 0;
  addVideos: FormGroup = this.formbuilder.group({
    title : ['', Validators.required],
    detail : ['', Validators.required],
    poster : ['', Validators.required],
    attachment : ['', Validators.required]
  })

  constructor(private service : MainService,
              private formbuilder : FormBuilder,
              private toastr: ToastrService,
              private store: Store

    ) { }

  @Select(videoSate.getvideoSelector) records$!:Observable<any[]>
  @Select(videoSate.ifVideoLoaded) videoLoaded$!:Observable<Boolean>

  ngOnInit(): void {
    this.getVideos();
  }

  previewPoster(event : any){
    console.log(event)
    if(event.target.files){
      let readFile = new FileReader();
      readFile.readAsDataURL(event.target.files[0]);
      readFile.onload =(e : any)=>{
        this.url = e.target.result;
      }
    }
  }
  previewAttachment(event : any){
    console.log(event)
    if(event.target.files){
      let readFile = new FileReader();
      readFile.readAsDataURL(event.target.files[0]);
      readFile.onload =(e : any)=>{
        this.attachment = e.target.result;
      }
    }
  }

  getVideos(){
    // this.service.getVideos().subscribe(res =>{
    //   this.videoContent = res
    //   console.log(res)
    // })
     this.videoLoaded$.subscribe(videoLoaded=>{
      console.log("sliderLoaded", videoLoaded);

      if(!videoLoaded){
        this.store.dispatch(new GetVideos())

        }
    })
  }

  addVideo(){

    this.store.dispatch(new AddVideos({
        title: this.addVideos.controls['title'].value,
        detail: this.addVideos.controls['detail'].value,
        poster: this.url,
        attachment: this.attachment
      }
    ))
    // this.service.addVideos(
    //   {
    //     title: this.addVideos.controls['title'].value,
    //     detail: this.addVideos.controls['detail'].value,
    //     poster: this.url,
    //     attachment: this.attachment
    //   }
    //   ).subscribe((res)=>{
    //   this.toastr.success('Video added been successfully');
    //   console.log('Addded', res)
    //   this.addVideos.reset();
    //   this.getVideos();
    // })
  }

  deleteVideos(id : any){
    if(confirm('Are you sure?')){
      this.service.deleteVideo(id).subscribe(res=>{
      this.toastr.success('Video deleted been successfully');
      console.log(res)
      this.getVideos();

      })
    }
  }

  getEditData(data : Videos | any){
    this.isUpdate = true;
    this.videoId = data.id;
    this.addVideos.get('title')?.setValue(data.title);
    this.addVideos.get('detail')?.setValue(data.detail);
    this.url = data.poster;
    this.attachment = data.attachment;
  }

  updateVideos(){
    this.service.updateVideos(this.videoId,      {
      title: this.addVideos.controls['title'].value,
      detail: this.addVideos.controls['detail'].value,
      poster: this.url,
      attachment: this.attachment
    }).subscribe(res=>{
      this.toastr.success('Video updated successfully');
      console.log(res);
      this.getVideos();
      this.addVideos.reset();
    })
  }

}
