import { getCipherInfo } from 'crypto';
import e, * as express from 'express';
import { stringify } from 'querystring';
import { Employee } from '../entities/employee';
import { Position } from '../entities/employeeInterface';
class EmployeeController {
    public static getAllEmployee = (request: express.Request, response: express.Response) => {
        Employee.find({select:["id","firstName","lastName","age","experience","address","mobileNo","position","team"]}).then((data) =>{
            response.json(data)
        });
    }

    public static getEmployee = (request: express.Request, response: express.Response) => {
        Employee.findOne(
            {where:
            {id:parseInt(request.params.id)},
            select:["id","firstName","lastName","age","experience","address","mobileNo","position"]}).then((data) =>{
            response.json(data)
        });
    }

    public static addEmployee = async(request: express.Request, response: express.Response) => {
        let employeeObject:any = {};
        let missingFields = [];
        let incorrectFields= [];
        let message = "";
        let ceo = await this.getHigherUp("CEO");
        let md = await this.getHigherUp("MD");
        if(request.body.firstName!= null && request.body.firstName!= "")
            employeeObject.firstName = request.body.firstName;
        else
            missingFields.push("firstName");
        if(request.body.lastName!= null && request.body.lastName!= "")
            employeeObject.lastName = request.body.lastName;
        else
            missingFields.push("lastName");
        if(request.body.age!= null && request.body.age!= ""){
            if(!this.isNumber(request.body.age))
                incorrectFields.push("age should be number");
            employeeObject.age =request.body.age;
        }
        else
            missingFields.push("age");
        if(request.body.experience!= null && request.body.experience!= ""){
            if(!this.isNumber(request.body.experience))
                incorrectFields.push("experience should be number");
            employeeObject.experience =request.body.experience;
        }
        else
            missingFields.push("experience");
        if(request.body.address!= null && request.body.address!= "")
            employeeObject.address =request.body.address;
        else
            missingFields.push("address");
        if(request.body.mobileNo!= null && request.body.mobileNo!= ""){
            if(this.isValidMobileNo(request.body.mobileNo))
                employeeObject.mobileNo = request.body.mobileNo;
            else
                incorrectFields.push("mobileNo")
        }
        else{
            missingFields.push("mobileNo");
        }
        if(request.body.position!= null && request.body.position!= ""){
            if(!Object.values(Position).includes(request.body.position))
                incorrectFields.push("Incorrect position is provided");
            employeeObject.position =request.body.position;
        }
        else
            missingFields.push("position");
        
        if(request.body.position!= "CEO"){
            employeeObject.CEO = ceo?.id;
            if(request.body.position!= "MD"){   
                employeeObject.managingDirector = md?.id;
                if(request.body.position!= "DUHead"){
                    if(request.body.position== "Manager"){
                        if(request.body.duHead!= null && request.body.duHead!= "")
                            employeeObject.duHead =request.body.duHead;
                        else
                            missingFields.push("duHead");
                    }
                    else if(request.body.position== "TL"){
                        if(request.body.manager!= null && request.body.manager!= ""){
                            employeeObject.manager =request.body.manager;
                            let higherUp:any = await this.getHigherUpInfo(request.body.manager);
                            employeeObject.duHead = higherUp?.duHead;
                        }     
                        else
                            missingFields.push("manager");
                    }
                    else if(request.body.position== "SDE"){
                        if(request.body.teamLead!= null && request.body.teamLead!= ""){
                            employeeObject.teamLead =request.body.teamLead;
                            let higherUp:any = await this.getHigherUpInfo(request.body.teamLead);
                            employeeObject.manager = higherUp?.manager;
                            employeeObject.duHead = higherUp?.duHead;
                        }     
                        else
                            missingFields.push("teamLead");
                    }
                }              
            }
        }


            
        // if(request.body.duHead!= null && request.body.duHead!= "")
        //     employeeObject.duHead =request.body.duHead;
        // else{
        //      if(["CEO","MD","DUHead"].indexOf(request.body.position)<0 )
        //         missingFields.push("duHead");
        // }
        // if(request.body.manager!= null && request.body.manager!= "")
        //     employeeObject.manager =request.body.manager;
        // else{
        //      if(["CEO","MD","DUHead","Manager"].indexOf(request.body.position)<0 )
        //         missingFields.push("manager");
        // }
        // if(request.body.teamLead!= null && request.body.teamLead!= "")
        //     employeeObject.teamLead =request.body.teamLead;
        // else{
        //      if(["CEO","MD","DUHead","Manager","TL"].indexOf(request.body.position)<0 )
        //         missingFields.push("teamLead");
        // }
        if(request.body.team!= null && request.body.team!= "")
            employeeObject.team = request.body.team;
            
        if(missingFields.length != 0)
            message += "Missing Fields:" + missingFields.toString();
        if(incorrectFields.length != 0)
            message +=" Incorrect Fields:" + incorrectFields.toString();
        if(message)
            return response.send({"message":message})
        Employee.save(employeeObject);
        response.send({"message":"Added entry in database"});
    }

    public static updateEmployee = (request: express.Request, response: express.Response) => {
        if(request.body.id==null) return response.send("Id is missing");
        let updatedObject:any = {};
        if(request.body.firstName!= null && request.body.firstName!= "")
            updatedObject.firstName = request.body.firstName;
        if(request.body.lastName!= null && request.body.lastName!= "")
            updatedObject.lastName = request.body.lastName;
        if(request.body.age!= null && request.body.age!= "")
            updatedObject.age =request.body.age;
        if(request.body.experience!= null && request.body.experience!= "")
            updatedObject.experience =request.body.experience;
        if(request.body.address!= null && request.body.address!= "")
            updatedObject.address =request.body.address;
        if(request.body.mobileNo!= null && request.body.mobileNo!= "")
            updatedObject.mobileNo = request.body.mobileNo;
        if(request.body.position!= null && request.body.position!= "")
            updatedObject.position =request.body.position;
        if(request.body.position!= null && request.body.position!= "")
            updatedObject.position = request.body.position;
        if(request.body.team!= null && request.body.team!= "")
            updatedObject.team = request.body.team;
        if(updatedObject==null) return response.send({"message":"No data has been sent for updation"});
        Employee.update({id:request.body.id},updatedObject);
        
        response.send({"message":"Employee entry updated in the database"});
    }
    
    
    public static deleteEmployee = (request: express.Request, response: express.Response) => {
        if(request.body.id==null) return response.send("Id is missing");
        Employee.delete({id:request.body.id})
        response.send({"message":"Employee entry deleted"});
    }

    public static getEmployeeHigherHierarchy = async (request: express.Request, response: express.Response) => {
        let res:any ={} 
        let employee = await Employee.findOne(
                {where:
                    {id:parseInt(request.params.id)}
                });
                res.Employee = {"id":employee?.id,"firstName":employee?.firstName,"lastName":employee?.lastName};
        if(employee!= null){
            if(employee?.teamLead != null){
                res.TeamLead = await Employee.findOne(
                    {where:
                        {id:employee.teamLead},
                        select:["id","firstName","lastName"]
                    });
            }
            if(employee?.manager != null){
                res.Manager = await Employee.findOne(
                    {where:
                        {id:employee.manager},
                        select:["id","firstName","lastName"]
                    });
            }
            if(employee?.duHead != null){
                res.DUHead = await Employee.findOne(
                    {where:
                        {id:employee.duHead},
                        select:["id","firstName","lastName"]
                    });
            }
            if(employee?.managingDirector != null){
                res.ManagingDirector = await Employee.findOne(
                    {where:
                        {id:employee.managingDirector},
                        select:["id","firstName","lastName"]
                    });
            }
            if(employee?.CEO != null){
                res.CEO = await Employee.findOne(
                    {where:
                        {id:employee.CEO},
                        select:["id","firstName","lastName"]
                    });
            }
            response.send(res);
        }else{
            response.send("Employee not found");
        }
    }

    public static isNumber(num:any){
            let n = parseInt(num);
            if(Number.isInteger(n))
                return true;
            else
                return false;
    }

    public static getHigherUp = (post:string) => {
        let employee =  Employee.findOne(
            {where:
            {position:post},
            select:["id","firstName","lastName"]});
            return employee;
    }

    public static isValidMobileNo(mobileNo:string){
        if(this.isNumber(mobileNo)){
            if(mobileNo.length == 10){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
        
    }

    public static getHigherUpDetails = async(request: express.Request, response: express.Response) => {
        let res:any ={} 
        res.duHead = await Employee.find(
            {where:
            {position:"DUHead"},
            select:["id","firstName","lastName"]});
        res.manager = await Employee.find(
            {where:
            {position:"Manager"},
            select:["id","firstName","lastName"]});
        res.teamLead = await Employee.find(
            {where:
            {position:"TL"},
            select:["id","firstName","lastName"]});
        response.send(res);
    }

    public static getHigherUpInfo = async(id:any) => {
        let higherUpInfo = await Employee.findOne(
        {where:
        {id:parseInt(id)},
        select:["duHead","manager"]});
        return higherUpInfo;
    }
}

export default EmployeeController;