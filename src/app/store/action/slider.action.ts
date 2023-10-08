import { slider } from "app/Models/slider";
import { SliderModel } from "../state/slider.state";



export class GetSlider {

  static readonly type = '[Slider] Get';

}

export class AddSlider {

  static readonly type = '[Slider] Post';

  constructor(public payload:slider){

}

}

export class DeleteSlider {

  static readonly type = '[Slider] Delete';

  constructor(public id:String){

}


}
export class UpdateSlider {

  static readonly type = '[Slider] Update';

  constructor(public payload:any){

}

}


