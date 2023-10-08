import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Videos } from "app/Models/videos";
import { MainService } from "app/service/main.service";
import { tap } from "rxjs/operators";
import { AddVideos, GetVideos } from "../action/video.action";



export class VideoModel{
  video!: Videos[]
  videoLoaded!: boolean
}


@State<VideoModel>({
name:'video',
defaults:{
  video:[],
  videoLoaded: false
}
})

@Injectable()
export class videoSate{

  constructor(private service: MainService){

  }
@Selector()
static getvideoSelector(state:VideoModel){
  return state.video
}
@Selector()
static ifVideoLoaded(state:VideoModel){
  return state.videoLoaded
}

@Action(GetVideos)
 getVideosFromState({getState,setState}:StateContext<VideoModel>){

  console.log('This is Video State')
  return this.service.getVideos().pipe(tap(response=>{

    const state = getState();

    setState({
      ...state,
      video: response,
      videoLoaded:true
    })
  }))
 }


 @Action(AddVideos)
 addVideos({getState, patchState}:StateContext<VideoModel>,{payload}:AddVideos){

  console.log('Video added')
  return this.service.addVideos(payload).pipe(tap(response=>{

    const state = getState()

    patchState({
      video : [...state.video, response]
    })
  }))

 }



}

