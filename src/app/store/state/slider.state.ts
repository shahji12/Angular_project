import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { slider } from "app/Models/slider";
import { MainService } from "app/service/main.service";
import { tap } from "rxjs/operators";
import { AddSlider, DeleteSlider, GetSlider, UpdateSlider } from "../action/slider.action";

export class SliderModel{
  slider!: slider[];
  sliderLoaded!: boolean;
}


@State<SliderModel>({
  name: 'slider',
  defaults:{
    slider:[],
    sliderLoaded:false
  }
})

@Injectable()
export class SliderState {

  constructor(private _service: MainService){}

  @Selector()
    static getSliderList(state:SliderModel){
      return state.slider
    }
  @Selector()
    static ifSliderLoaded(state:SliderModel){
      return state.sliderLoaded;
    }

  @Action(GetSlider)
    getSlider({getState, setState}: StateContext<SliderModel>){
      console.log('Action State for slider')
      return this._service.getSliders().pipe(tap(response=>{
        console.log('Action State for slider',response)
        const state = getState();

        setState({
          ...state,
          slider: response,
          sliderLoaded: true
        })

      }))
    }

  @Action(AddSlider)
  addSlider({getState, patchState}:StateContext<SliderModel>, {payload}:AddSlider){
    return this._service.addSlider(payload).pipe(tap((response:slider)=>{

      const state = getState();

      patchState({
        slider : [... state.slider, response]
      })

    }))

  }

  @Action(DeleteSlider)
  deleteSlider({getState,setState}: StateContext<SliderModel>, {id}:DeleteSlider){
    return this._service.deleteSliderById(id).pipe(tap((res:any)=>{
      const state = getState();
      const filteredSlider = state.slider.filter((res:any)=>res.id !== id)

      setState({
        ...state,
        slider: filteredSlider,
      })

    }))
  }


  @Action(UpdateSlider)
  updateSlider({getState,patchState}: StateContext<SliderModel>,{payload}:UpdateSlider){

    return this._service.updateSlider(payload.id,payload).pipe(tap((res:any)=>{
      console.log('updated data',res)
      const state = getState();

      patchState({

        slider: update(state, res)
      })
    }))

  }
}

const update = (state:any, res:any) => {
  const data = state.slider.filter((slider:any) => slider.id != res.slider.id);
  data.push(res.slider);
  return data
}
