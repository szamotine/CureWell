using System;
using System.Linq;
using System.Text;
using System.Collections.Generic;
using CureWellDataAccessLayer.Models;

namespace CureWellDataAccessLayer
{
    public class CureWellRepository
    {
        public CureWellContext Context { get; set; }

        #region CureWellRepository - Do not modify 
        public CureWellRepository()
        {
            Context = new CureWellContext();
        }
        #endregion

        #region GetAllDoctors - Do not modify the signature
        public List<Doctor> GetAllDoctors()
        {
            //To Do: Implement appropriate logic and change the return statement as per your logic
            List<Doctor> doctors = new List<Doctor>();
            try
            {
                doctors = (from doctor in Context.Doctor select doctor).ToList();
            }
            catch (Exception e)
            {
                doctors = null;
                Console.WriteLine(e.Message);
            }
            return doctors;
        }

        #endregion

        #region GetAllSpecializations - Do not modify the signature
        public List<Specialization> GetAllSpecializations()
        {
            //To Do: Implement appropriate logic and change the return statement as per your logic
            List<Specialization> specList = new List<Specialization>();
            try
            {
                specList = (from specialization in Context.Specialization select specialization).ToList();
                
            }
            catch (Exception)
            {
                specList = null;
            }
            return specList;
        }

        #endregion

        #region GetAllSurgeryTypeForToday - Do not modify the signature
        public List<Surgery> GetAllSurgeryTypeForToday()
        {
            //To Do: Implement appropriate logic and change the return statement as per your logic
            List<Surgery> lstSurgeries = new List<Surgery>();
            try
            {
               // lstSurgeries = (from surgeries in Context.Surgery where surgeries.SurgeryDate == DateTime.Today.Date select surgeries).ToList();
                lstSurgeries = (from surgeries in Context.Surgery select surgeries).ToList();
            }
            catch (Exception)
            {
                lstSurgeries = null;
            }

            return lstSurgeries;
        }

        #endregion

        #region AddDoctor - Do not modify the signature
        public bool AddDoctor(Doctor dObj)
        {
            //To Do: Implement appropriate logic and change the return statement as per your logic
            var docObj = new Doctor();
            bool status;
            try
            {
                docObj.DoctorId = dObj.DoctorId;
                docObj.DoctorName = dObj.DoctorName;
                
                Context.Doctor.Add(docObj);
                Context.SaveChanges();
                status = true;
               
            }
            catch (Exception)
            {
                status = false;
            }
            
            return status;
        }
        #endregion

        #region UpdateDoctorDetails - Do not modify the signature
        public bool UpdateDoctorDetails(Doctor dObj)
        {
            //To Do: Implement appropriate logic and change the return statement as per your logic
            Doctor updatedocObj = new Doctor();
            try
            {
                updatedocObj = Context.Doctor.Find(dObj.DoctorId);
                if (updatedocObj != null)
                {
                    updatedocObj.DoctorName = dObj.DoctorName;
                    Context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion

        #region UpdateSurgery - Do not modify the signature
        public bool UpdateSurgery(Surgery SObj)
        {
            //To Do: Implement appropriate logic and change the return statement as per your logic
            Surgery surgery = new Surgery();
            bool status = false;
            try
            {
                surgery = Context.Surgery.Find(SObj.SurgeryId);
                if(surgery!=null)
                {
                    surgery.StartTime = SObj.StartTime;
                    surgery.EndTime = SObj.EndTime;
                    Context.SaveChanges();
                    status = true;
                }                
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }
        #endregion

        #region DeleteDoctor - Do not modify the signature
        public bool DeleteDoctor(Doctor doctorObj)
        {
            bool status = false;
            try
            {
                //Find doctor using ID in Doctor table
                Doctor doctor = Context.Doctor.Find(doctorObj.DoctorId);

                //Create list to hold specializations of this doctor
                List<DoctorSpecialization> docSpecList = new List<DoctorSpecialization>();

                //Create list to hold all specializations that are available
                List<string> specList = new List<string>();
                
                //Obtain List of specializations that are available for all doctors
                specList = (from specs in Context.Specialization select specs.SpecializationCode).ToList();

                //Find entries in DoctorSpecialization table using DoctorId and Specialization code
                foreach (var item in specList)
                {
                    var foundDocSpec = Context.DoctorSpecialization.Find(doctorObj.DoctorId, item);
                    //add entry to list of specializations of this doctor
                    docSpecList.Add(foundDocSpec);
                }

                //Create list of surgeries that doctor is scheduled for
                List<Surgery> docSurgeryList = new List<Surgery>();
                docSurgeryList = (from surgeries in Context.Surgery where surgeries.DoctorId == doctorObj.DoctorId select surgeries).ToList();

                if ( docSurgeryList != null)
                {
                    //Remove entities from Surgery table
                    foreach (var item in docSurgeryList)
                    {
                        //Context.Surgery.Remove(item);
                    }
                    
                }

                if (docSpecList != null)
                {
                    //Remove entities from DoctorSpecialization table
                    foreach (var item in docSpecList)
                    {
                        //Context.DoctorSpecialization.Remove(item);
                    }

                }
                
                if (doctor != null)
                {
                    
                    Context.Doctor.Remove(doctor);
                    Context.SaveChanges();
                    status = true;
                }
                else
                {
                    status = false;
                }
                

            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }
        #endregion

    }
}
