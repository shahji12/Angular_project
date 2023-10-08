import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { slider } from 'app/Models/slider';
import { AddSlider, DeleteSlider, GetSlider, UpdateSlider } from 'app/store/action/slider.action';
import { SliderState } from 'app/store/state/slider.state';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Records } from '../Models/records.model';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  // records: any = [];
  userId: number = 0;
  isUpdate: boolean = false;
  sliderSubcription! : Subscription;

  AddSlider: FormGroup = this.formbuilder.group({
    title: [null, Validators.required],
    detail: [null, Validators.required],
    imgUrl: [null, Validators.required],
  });

  @ViewChild('main') main: ElementRef | any;

  constructor(
    private service: MainService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private store: Store
  ) {}

  @Select(SliderState.getSliderList) records$!:Observable<any[]>
  @Select(SliderState.ifSliderLoaded) sliderLoaded$!: Observable<boolean>

  ngOnInit(): void {
    this.service.sideMain$.subscribe((response) => {
      this.main.nativeElement.style.marginLeft = response;
    });
    this.getSlider();
  }

  ngOnDestroy():void{
    this.sliderSubcription.unsubscribe();
  }

  defaultImg: string = 'http://localhost:63870/assets/img/logo.png';
  url = '';

  previewImg(e: any) {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  addSlider() {
    this.store.dispatch(new AddSlider({
      title: this.AddSlider.controls['title'].value,
      detail: this.AddSlider.controls['detail'].value,
      imgUrl: this.url,
    }));
    this.toastr.success('Slider added successfully');

    // this.store.dispatch(new AddSlider(this.AddSlider.value))
    // this.service
    //   .addSlider({
    //     title: this.AddSlider.controls['title'].value,
    //     detail: this.AddSlider.controls['detail'].value,
    //     imgUrl: this.url,
    //   })
    //   .subscribe((res) => {
    //     this.toastr.success('Slider added successfully');
    //     console.log('slider', res);
    //     this.AddSlider.reset();
    //     this.getSlider();
    //   });
  }
  getEditValue(data: slider | any) {
    this.userId = data.id;
    this.isUpdate = true;
    this.AddSlider.get('title')?.setValue(data.title);
    this.AddSlider.get('detail')?.setValue(data.detail);
    this.url = data.imgUrl;
  }

  updateSlider() {
    this.store.dispatch(new UpdateSlider({
          id: this.userId,
          title: this.AddSlider.controls['title'].value,
          detail: this.AddSlider.controls['detail'].value,
          imgUrl: this.url
        }
      ))
    // this.service
    //   .updateSlider(this.userId, {
    //     title: this.AddSlider.controls['title'].value,
    //     detail: this.AddSlider.controls['detail'].value,
    //     imgUrl: this.url,
    //   })
    //   .subscribe((res) => {
    //     this.toastr.success('Slider updated successfully');
    //     console.log('slider', res);
    //     this.AddSlider.reset();
    //     this.getSlider();
    //   });
  }
  getSlider() {

    this.sliderSubcription = this.sliderLoaded$.subscribe(sliderLoaded=>{
      console.log("sliderLoaded", sliderLoaded);

      if(!sliderLoaded){
        this.store.dispatch(new GetSlider())
        // this.service.getSliders().subscribe((response) => {
        //   this.records = response;
        //   this.AddSlider.reset();

        // });
        }
    })

  }

  deleteSlider(id: any) {
    console.log('delete response', id);
    if (confirm('Are you sure?')) {

      this.store.dispatch(new DeleteSlider(id))
      // this.service.deleteSliderById(id).subscribe(async (res) => {
      //   this.toastr.success('Slider Deleted successfully');
      //   const data = await res.json;
      //   this.getSlider();
      // });
    }
  }
}
