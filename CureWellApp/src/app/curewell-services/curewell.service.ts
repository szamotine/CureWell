import { Injectable } from '@angular/core';
import { Doctor } from '../curewell-interfaces/doctor';
import { DoctorSpecialization } from '../curewell-interfaces/doctorspecialization';
import { Specialization } from '../curewell-interfaces/specialization';
import { Surgery } from '../curewell-interfaces/surgery';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { start } from 'repl';

@Injectable({
  providedIn: 'root'
})
export class CurewellService {

  doctorList: Doctor[];
  surgeryList: Surgery[];
  specializationList: Specialization[];
  doctorSpecializationList: DoctorSpecialization[];
  baseURL: string = "http://localhost:50476/api/CureWell/";

  constructor(private http: HttpClient) { }
  
  //GetDoctor
  getDoctors(): Observable<Doctor[]> {
     //To do implement necessary logic
    let tempURL = "GetDoctors";
    let tempVar = this.http.get<Doctor[]>(this.baseURL + tempURL)
      .pipe(catchError(this.errorHandler));
   
    return tempVar;
  }

  //GetSpecialization
  getAllSpecializations(): Observable<Specialization[]> {
   //To do implement necessary logic
    let tempURL = "GetSpecializations";
    let tempVar = this.http.get<Specialization[]>(this.baseURL + tempURL)
      .pipe(catchError(this.errorHandler));

    return tempVar;
  }

  //GetSurgeries
  getAllSurgeriesForToday(): Observable<Surgery[]> {
    //To do implement necessary logic
    let tempURL = "GetAllSurgeryTypeForToday";
    let tempVar = this.http.get<Surgery[]>(this.baseURL + tempURL)
      .pipe(catchError(this.errorHandler));

    return tempVar;
  }

  //AddDoctor
  addDoctor(doctorName: string): Observable<boolean> {
    //To do implement necessary logic
    let tempURL = "AddDoctor";
    let doctorObj: Doctor;
    let id: number = 1005; // number does not matter, ID will be set by ID Counter in DAL
    doctorObj = { doctorId: id, doctorName: doctorName };
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(doctorObj);
    
    
 //   let tempVar = this.http.post<boolean>(this.baseURL + tempURL, body, {'headers':headers})
  //    .pipe(catchError(this.errorHandler));

     let tempVar = this.http.post<boolean>(this.baseURL + tempURL, doctorObj)
      .pipe(catchError(this.errorHandler));

    return tempVar;
  }

  //EditDoctor
  editDoctorDetails(doctorId: number, doctorName: string): Observable<boolean> {
    //To do implement necessary logic
    let tempURL = "UpdateDoctorDetails";
    let doctorObj: Doctor;
    doctorObj = { doctorId: doctorId, doctorName: doctorName };
    let tempVar = this.http.put<boolean>(this.baseURL + tempURL, doctorObj)
      .pipe(catchError(this.errorHandler));
    return tempVar;
  }

  //editSurgery
  editSurgery(doctorId: number, endTime: number, startTime: number, surgeryCategory: string, surgeryDate: Date, surgeryId: number): Observable<boolean> {
    //To do implement necessary logic
    let tempURL = "UpdateSurgery";
    let surgeryObj: Surgery;
    surgeryObj = {
      doctorId: doctorId,
      endTime: endTime,
      startTime: startTime,
      surgeryCategory: surgeryCategory,
      surgeryDate: surgeryDate,
      surgeryId: surgeryId
    };

    let tempVar = this.http.put<boolean>(this.baseURL + tempURL, surgeryObj)
      .pipe(catchError(this.errorHandler));

    return tempVar;
  }

  //RemoveDoctor
  deleteDoctor(doctor: Doctor): Observable<boolean> {
    //To do implement necessary logic
    let tempURL = "DeleteDoctor";
    let doctorObj: Doctor;
    doctorObj = doctor;
   
    let httpOptions = { headers: new HttpHeaders({ 'ContentType': 'application/json' }), body: doctorObj };
    let tempVar = this.http.delete<boolean>(this.baseURL + tempURL, httpOptions).pipe(catchError(this.errorHandler));

    return tempVar;
  }

  //ErrorHandler
  errorHandler(error: HttpErrorResponse) {
    //To do implement necessary logic
    console.error(error);
    console.log("Error Handler: "+error);
    return throwError(error.message || 'ERROR');

  }

}
