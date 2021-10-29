import e, * as express from 'express';
import { Project } from '../entities/project';

class ProjectController {
    public static getAllProjects = (request: express.Request, response: express.Response) => {
        Project.find().then((data) =>{
            response.json(data)
        });
    }

    public static getProject = (request: express.Request, response: express.Response) => {
        Project.findOne(
            {where:
            {id:parseInt(request.params.id)}}).then((data) =>{
            response.json(data)
        });
    }

    public static addProject = (request: express.Request, response: express.Response) => {
        let projectObject:any = {};
        let missingFields = []
        if(request.body.name!= null)
            projectObject.name = request.body.name;
        else
            missingFields.push("name");
        if(request.body.client!= null)
            projectObject.client = request.body.client;
        else
            missingFields.push("client");
        if(request.body.team!= null)
            projectObject.team =request.body.team;
        else
            missingFields.push("team");

        if(missingFields.length != 0)
             return response.send("Following fields are missing ->" + missingFields.toString());
        Project.save(projectObject);
        response.send({"message":"Added entry in database"});
    }

    public static updateProject = (request: express.Request, response: express.Response) => {
        if(request.body.id==null) return response.send("Id is missing");
        let updatedObject:any = {};
        if(request.body.name!= null)
            updatedObject.name = request.body.name;
        if(request.body.duHead!= null)
            updatedObject.client = request.body.client;
        if(request.body.manager!= null)
            updatedObject.teaam =request.body.team;
       
        if(updatedObject==null) return response.send("No data has been sent for updation");
        Project.update({id:request.body.id},updatedObject);
        response.send({"message":"Updated entry in database"});
    }

    public static deleteProject = (request: express.Request, response: express.Response) => {
        if(request.body.id==null) return response.send("Id is missing");
        Project.delete({id:request.body.id})
        response.send({"message":"Deleted project from database"});
    }
}
export default ProjectController;