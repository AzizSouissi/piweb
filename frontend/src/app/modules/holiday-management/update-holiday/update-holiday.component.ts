import { Component, OnInit } from '@angular/core';
import { Holiday } from '../../../core/models/Holiday';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HolidayService } from '../../../core/services/holiday-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-holiday',
  templateUrl: './update-holiday.component.html',
  styleUrl: './update-holiday.component.css'
})
export class UpdateHolidayComponent implements OnInit {
updateFoyer() {
throw new Error('Method not implemented.');
}
id !:string|null
  holiday!:Holiday;
  updateForm!:FormGroup;
  constructor(  private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
  private holidayService:HolidayService,
    
    ) { }

  ngOnInit() {
   if( this.route.paramMap.subscribe((paramMap) => {this.id= paramMap.get('id')})){
    if(this.id==null){
      console.log("dzelkn")
return
    }
      this.holidayService.getHolidayById(this.id).subscribe(
        (data: Holiday|string) => {
          console.log(data);
          if(data instanceof Holiday){

            this.holiday = data;
            this.updateForm = this.formB.group({
              Name: [data.name],
              Date: [data.date],
              Duration:[data.duration],
              Shift :[data.shift]
            });
            this.updateForm.patchValue(data);
          }
        }
       
        )
        ,
        (error: any) => {
          console.error('Error fetching user by ID:', error);
        }
   }
  }
  

  

}
