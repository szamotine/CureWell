import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Doctor } from '../../curewell-interfaces/doctor';

@Component({
  templateUrl: './update-doctor.component.html'
})
export class UpdateDoctorComponent implements OnInit {

  doctorId: number;
  doctorName: string;
  status: boolean;
  errorMsg: string;

  constructor(private route: ActivatedRoute, private _cureWellService: CurewellService, private router: Router) { }

  ngOnInit() {
     //To do implement necessary logic
    this.doctorId = parseInt(this.route.snapshot.params['doctorId']);
    this.doctorName = this.route.snapshot.params['doctorName'];
  }

  editDoctorDetails(doctorname: string) {
    //To do implement necessary logic
    
    this.doctorName = doctorname;
    
    this._cureWellService.editDoctorDetails(this.doctorId, this.doctorName).subscribe(
      responseEditData => {
        this.status = responseEditData;
        if (this.status) {
          alert("Doctor details updated successfully");
          this.router.navigate(['\viewdoctor']);
        } else {
          alert("Unable to update doctor details");
          this.router.navigate(['\viewdoctor']);
        }
      },
      responseEditError => {
        this.errorMsg = responseEditError;
        alert("Some error occured");
        this.router.navigate(['\viewdoctor']);
      },
      () => console.log("editDoctorDetails executed")
    );
  }
}
