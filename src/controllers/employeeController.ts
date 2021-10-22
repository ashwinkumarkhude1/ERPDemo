import * as express from 'express';
import { Employee } from '../entities/employee';
import { json } from 'stream/consumers';
// import Joi from 'joi';

class EmployeeController {
    public static getAllEmployee = (request: express.Request, response: express.Response) => {
        Employee.find().then((data) =>{
            response.json(data)
        });
    }

    public static getEmployee = (request: express.Request, response: express.Response) => {
        Employee.findOne(
            {where:
            {id:parseInt(request.params.id)}}).then((data) =>{
            response.json(data)
        });
    }

    public static addEmployee = (request: express.Request, response: express.Response) => {
        // const {error} = this.validateEmployee(request.body);
        // if(error) return response.status(400).send(error.details[0].message);
        let employeeObject:any = {};
        let missingFeilds = []
        if(request.body.firstName!= null)
            employeeObject.firstName = request.body.firstName;
        else
            missingFeilds.push("firstName");
        if(request.body.lastName!= null)
            employeeObject.lastName = request.body.lastName;
        else
            missingFeilds.push("lastName");
        if(request.body.age!= null)
            employeeObject.age =request.body.age;
        else
            missingFeilds.push("age");
        if(request.body.experience!= null)
            employeeObject.experience =request.body.experience;
        else
            missingFeilds.push("experience");
        if(request.body.address!= null)
            employeeObject.address =request.body.address;
        else
            missingFeilds.push("address");
        if(request.body.mobileNo!= null)
            employeeObject.mobileNo = request.body.mobileNo;
        else
            missingFeilds.push("mobileNo");
        if(request.body.position!= null)
            employeeObject.position =request.body.position;
        else
            missingFeilds.push("position");
        if(request.body.reportingTo!= null)
            employeeObject.reportingTo =request.body.reportingTo;
        else if(request.body.position != "CEO")
            missingFeilds.push("reportingTo");
        
        if(missingFeilds.length != 0)
             return response.send("Following feilds are missing ->" + missingFeilds.toString());
        Employee.save(employeeObject);
        Employee.find().then((data) =>{
            response.json(data)
        });
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
        if(updatedObject==null) return response.send("No data has been sent for updation");
        Employee.update({id:request.body.id},updatedObject);
        Employee.findOne(
            {where:
            {id:parseInt(request.body.id)}}).then((data) =>{
            response.json(data)
        });
    }
    
    
    public static deleteEmployee = (request: express.Request, response: express.Response) => {
        if(request.body.id==null) return response.send("Id is missing");
        Employee.delete({id:request.body.id})
        response.send("Employee entry deleted");
    }

    public static getEmployeeHigherHierarchy = (request: express.Request, response: express.Response) => {
        let ehh:any ;
        let emp;
        Employee.findOne(
            {where:
                {id:parseInt(request.params.id)}
            }).then((data)=>{emp =data});
        console.log(emp);
        response.send(emp);
        
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