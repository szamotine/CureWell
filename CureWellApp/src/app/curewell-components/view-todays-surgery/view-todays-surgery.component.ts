import { Component, OnInit } from '@angular/core';
import { Surgery } from '../../curewell-interfaces/surgery';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Route } from '@angular/compiler/src/core';

@Component({
  templateUrl: './view-todays-surgery.component.html',
})
export class ViewTodaysSurgeryComponent implements OnInit {

  surgeryList: Surgery[] | null;
  showMsgDiv: boolean = false;
  errorMsg: string;

  constructor(private _curewellService: CurewellService, private router: Router) { }

  ngOnInit() {
    this.getTodaySurgery();
  }

  getTodaySurgery() {
    //To do implement necessary logic
    this._curewellService.getAllSurgeriesForToday().subscribe(
      responseSurgeryData => {
        this.surgeryList = responseSurgeryData;
        if (this.surgeryList ==null) {
          this.showMsgDiv = true;
        }
      },
      responseSurgeryError => {
        this.surgeryList = null;
        this.errorMsg = responseSurgeryError;
        console.log(this.errorMsg);
        this.showMsgDiv = true;
      },
      () => console.log("getTodaySurgery() executed successfully")
    );
  }

  editSurgery(surgery: Surgery) {
    //To do implement necessary logic
 
    this.router.navigate(['/editSurgery', surgery.doctorId, surgery.endTime, surgery.startTime, surgery.surgeryCategory, surgery.surgeryDate, surgery.surgeryId]);
  }

}
