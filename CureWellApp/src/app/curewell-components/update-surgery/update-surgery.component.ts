import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Surgery } from '../../curewell-interfaces/surgery';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './update-surgery.component.html'
})
export class UpdateSurgeryComponent implements OnInit {

  doctorId: number;
  surgeryId: number;
  surgeryDate: Date;
  startTime: number;
  endTime: number;
  surgeryCategory: string;
  status: boolean;
  errorMsg: string;

  constructor(private route: ActivatedRoute, private _cureWellService: CurewellService, private router: Router) { }

  ngOnInit() {
    //To do implement necessary logic
    this.surgeryId = parseInt(this.route.snapshot.params['surgeryId']);
    this.surgeryCategory = this.route.snapshot.params['surgeryCategory'];
    this.surgeryDate = new Date(this.route.snapshot.params['surgeryDate']);

    this.startTime = parseInt(this.route.snapshot.params['startTime']);
    this.endTime = parseInt(this.route.snapshot.params['endTime']);
    this.doctorId = parseInt(this.route.snapshot.params['doctorId']);

    
  }

  editSurgery(startTime: number, endTime: number) {
    //To do implement necessary logic
    this.startTime = startTime;
    
    this.endTime = endTime;

   
   
    if (typeof this.startTime == 'string') {
      this.startTime = parseInt(this.startTime);
    }

    if (typeof this.endTime == 'string') {
      this.endTime = parseInt(this.endTime);
    }

   // console.log("New start time: " + typeof (this.startTime));
   // console.log("New end time: " + typeof (this.endTime));


    //editSurgery(doctorId: number, endTime: number, startTime: number, surgeryCategory: string, surgeryDate: Date, surgeryId: number)
    this._cureWellService.editSurgery(this.doctorId, this.endTime, this.startTime, this.surgeryCategory, this.surgeryDate, this.surgeryId)
      .subscribe(
        responseSurgeryData => {
          this.status = responseSurgeryData;
          if (this.status) {
            alert("Surgery Details update successfully!");
            this.router.navigate(['/viewTodaySurgery']);
          } else {
            alert("Surgery details not updated");
          }
          
        },
        responseSurgeryError => {
          this.errorMsg = responseSurgeryError;
          alert("Some error occured");
          this.router.navigate(['/viewTodaySurgery']);
         
        },
        () => {
          console.log("editSurgery executed")
         // this.router.navigate(['/viewTodaySurgery']);
        }

      );
  }

  checkEndTime(startTime: number, endTime: number): boolean {
    //let startT = start.value;
    //let endT = end.value;

    if (startTime >= endTime) {
      return true;
    } else {
      return false;
    }
  }
}


