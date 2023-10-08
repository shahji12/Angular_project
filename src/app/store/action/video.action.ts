import { Videos } from "app/Models/videos"



export class GetVideos{

  static readonly type = '[videos] Get'
}

export class AddVideos{

  static readonly type = '[Add videos] Post'

  constructor(public payload : Videos){}
}
