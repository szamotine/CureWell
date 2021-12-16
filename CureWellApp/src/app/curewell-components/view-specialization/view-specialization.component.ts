import { Component, OnInit } from '@angular/core';
import { Specialization } from '../../curewell-interfaces/specialization';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Route } from '@angular/compiler/src/core';
import { Doctor } from '../../curewell-interfaces/doctor';

@Component({
 templateUrl: './view-specialization.component.html',
})
export class ViewSpecializationComponent implements OnInit {

  specializationList: Specialization[] | null;
  showMsgDiv: boolean = false;
  errorMsg: string;
  
  constructor(private _curewellService: CurewellService, private router: Router) { }

  ngOnInit() {
    //To do implement necessary logic
    this.getSpecialization();
  }

  getSpecialization() {
    //To do implement necessary logic
    this._curewellService.getAllSpecializations().subscribe(
      responseSpecializationData => {
        this.specializationList = responseSpecializationData;
        if (responseSpecializationData == null) {
          console.log("responseSpecializationData == null");
          this.showMsgDiv = true;
        }
      },
      responseSpecializationError => {
        this.specializationList = null;
        this.errorMsg = responseSpecializationError;
        console.log(this.errorMsg);
        this.showMsgDiv = true;
      },
      () => console.log("getSpecialization() executed successfully")
    );  
  }
}
