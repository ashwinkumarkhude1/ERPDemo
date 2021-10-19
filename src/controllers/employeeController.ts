import * as express from 'express';
import { Employee } from '../entities/employee';
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
        
        Employee.create(
            {
                firstName:request.body.firstName,
                lastName:request.body.lastName,
                age:request.body.age,
                position:request.body.position
            }).save();
        Employee.find().then((data) =>{
            response.json(data)
        });
    }

    public static updateEmployee = (request: express.Request, response: express.Response) => {
        Employee.update({id:request.body.id},{firstName:request.body.firstName});
        Employee.findOne(
            {where:
            {id:parseInt(request.body.id)}}).then((data) =>{
            response.json(data)
        });
    }
    
    
    public static delteEmployee = (request: express.Request, response: express.Response) => {
        Employee.delete({id:request.body.id})
        response.send("Employee entry deleted");
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