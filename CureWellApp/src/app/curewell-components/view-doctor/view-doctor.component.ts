import { Component, OnInit, DoCheck } from '@angular/core';
import { Doctor } from '../../curewell-interfaces/doctor';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
})
export class ViewDoctorComponent implements OnInit {

  doctorList: Doctor[] | null;
  showMsgDiv: boolean = false;
  doctorId: number;
  errorMsg: string;
  status: boolean;

  constructor(private _curewellService: CurewellService, private router: Router) { }

  ngOnInit() {
    this.getDoctor();
    //To do implement necessary logic
    if (this.doctorList == null) {
      this.showMsgDiv = true;
    }
  }



  getDoctor() {
    //To do implement necessary logic
    this._curewellService.getDoctors().subscribe(
      responseDoctorData => {
        this.doctorList = responseDoctorData;
        this.showMsgDiv = false;
        if (responseDoctorData == null) {
          console.log("responseDoctorData == null");
        }
      },
      responseDoctorError => {
        this.errorMsg = responseDoctorError;
        this.doctorList = null;
        console.log(this.errorMsg);
      },
      () => console.log("Doctors fetched successfully")

    );
  }

  editDoctorDetails(doctor: Doctor) {
    //To do implement necessary logic
    
    this.router.navigate(['/editDoctorDetails', doctor.doctorId, doctor.doctorName])
  }

  removeDoctor(doctor: Doctor) {
    //To do implement necessary logic

    this._curewellService.deleteDoctor(doctor).subscribe(
      responseRemoveDoctor => {
        this.status = responseRemoveDoctor;
        console.log("status= " + this.status);
        this.ngOnInit();
        if (this.status) {
          alert("Doctor details deleted successfully!");
        } else {
          alert("Doctor's name not deleted " + status);
        }
      },
      responseRemoveError => {
        this.errorMsg = responseRemoveError;
        console.log("Error message: " + this.errorMsg);
        this.errorMsg = "Some error occurred";
      },
      ()=> console.log("removeDoctor executed successfully")
    );
  }

}
