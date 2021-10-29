import e, * as express from 'express';
import { Employee } from '../entities/employee';
import { Position } from '../entities/employeeInterface';
class EmployeeController {
    public static getAllEmployee = (request: express.Request, response: express.Response) => {
        Employee.find({select:["id","firstName","lastName","age","experience","address","mobileNo","position"]}).then((data) =>{
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

    public static addEmployee = (request: express.Request, response: express.Response) => {
        let employeeObject:any = {};
        let missingFields = [];
        let incorrectFields= [];
        let message = "";
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
        if(request.body.mobileNo!= null && request.body.mobileNo!= "")
            employeeObject.mobileNo = request.body.mobileNo;
        else
            missingFields.push("mobileNo");
        if(request.body.position!= null && request.body.position!= ""){
            if(!Object.values(Position).includes(request.body.position))
                incorrectFields.push("Incorrect position is provided");
            employeeObject.position =request.body.position;
        }
        else
            missingFields.push("position");
        
        if(request.body.CEO!= null && request.body.CEO!= "")
            employeeObject.CEO =request.body.CEO;
        else{   
            if(request.body.position != "CEO")
                missingFields.push("CEO");
        }
        if(request.body.managingDirector!= null && request.body.managingDirector!= "")
            employeeObject.managingDirector =request.body.managingDirector;
        else{
             if (["CEO","MD"].indexOf(request.body.position)<0 )
                missingFields.push("managingDirector");
        }
        if(request.body.duHead!= null && request.body.duHead!= "")
            employeeObject.duHead =request.body.duHead;
        else{
             if(["CEO","MD","DUHead"].indexOf(request.body.position)<0 )
                missingFields.push("duHead");
        }
        if(request.body.manager!= null && request.body.manager!= "")
            employeeObject.manager =request.body.manager;
        else{
             if(["CEO","MD","DUHead","Manager"].indexOf(request.body.position)<0 )
                missingFields.push("manager");
        }
        if(request.body.teamLead!= null && request.body.teamLead!= "")
            employeeObject.teamLead =request.body.teamLead;
        else{
             if(["CEO","MD","DUHead","Manager","TL"].indexOf(request.body.position)<0 )
                missingFields.push("teamLead");
        }
            
        if(missingFields.length != 0)
            message += "Missing Fields:" + missingFields.toString();
        if(incorrectFields.length != 0)
            message +="Incorrect Fields:" + incorrectFields.toString();
        if(message)
            return response.send({"message":message})
        Employee.save(employeeObject);
        response.send({"message":"Added entry in database"});
    }

    public static updateEmployee = (request: express.Request, response: express.Response) => {
        if(request.body.id==null) return response.send("Id is missing");
        let updatedObject:any = {};
        if(request.body.firstName!= null)
            updatedObject.firstName = request.body.firstName;
        if(request.body.lastName!= null)
            updatedObject.lastName = request.body.lastName;
        if(request.body.age!= null)
            updatedObject.age =request.body.age;
        if(request.body.experience!= null)
            updatedObject.experience =request.body.experience;
        if(request.body.address!= null)
            updatedObject.address =request.body.address;
        if(request.body.mobileNo!= null)
            updatedObject.mobileNo = request.body.mobileNo;
        if(request.body.position!= null)
            updatedObject.position =request.body.position;
        if(request.body.position!= null)
            updatedObject.position = request.body.position;
        if(request.body.reportingTo!= null)
            updatedObject.reportingTo = request.body.reportingTo;
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
                res.emmployee = {"firstName":employee?.firstName,"lastName":employee?.lastName};
        if(employee!= null){
            if(employee?.teamLead != null){
                res.teamLead = await Employee.findOne(
                    {where:
                        {id:employee.teamLead},
                        select:["firstName","lastName"]
                    });
            }
            if(employee?.manager != null){
                res.manager = await Employee.findOne(
                    {where:
                        {id:employee.manager},
                        select:["firstName","lastName"]
                    });
            }
            if(employee?.duHead != null){
                res.duHead = await Employee.findOne(
                    {where:
                        {id:employee.duHead},
                        select:["firstName","lastName"]
                    });
            }
            if(employee?.managingDirector != null){
                res.managingDirector = await Employee.findOne(
                    {where:
                        {id:employee.managingDirector},
                        select:["firstName","lastName"]
                    });
            }
            if(employee?.CEO != null){
                res.CEO = await Employee.findOne(
                    {where:
                        {id:employee.CEO},
                        select:["firstName","lastName"]
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

    // private static validateEmployee(employee:object):any{
    //     const schema = {
    //         firstName: Joi.string().min(3).required(),
    //         lastName: Joi.string().min(3).required(),
    //         age: Joi.number.required(),
    //         position: Joi.string().min(3).required(),
    //     };
    
    //     return Joi.validate(employee, schema);
    // }
}

export default EmployeeController;