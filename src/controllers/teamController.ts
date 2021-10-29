import e, * as express from 'express';
import { Team } from '../entities/team';

class TeamController {
    public static getAllTeams = (request: express.Request, response: express.Response) => {
        Team.find().then((data) =>{
            response.json(data)
        });
    }

    public static getTeam = (request: express.Request, response: express.Response) => {
        Team.findOne(
            {where:
            {id:parseInt(request.params.id)}}).then((data) =>{
            response.json(data)
        });
    }

    public static addTeam = (request: express.Request, response: express.Response) => {
        let teamObject:any = {};
        let missingFields = []
        if(request.body.name!= null)
            teamObject.name = request.body.name;
        else
            missingFields.push("name");
        if(request.body.duHead!= null)
            teamObject.duHead = request.body.duHead;
        else
            missingFields.push("duHead");
        if(request.body.manager!= null)
            teamObject.manager =request.body.manager;
        else
            missingFields.push("manager");
        if(request.body.teamLead!= null)
            teamObject.teamLead =request.body.teamLead;
        else
            missingFields.push("teamLead");
        if(request.body.teamMember!= null)
            teamObject.teamMember =request.body.teamMember;
        else
            missingFields.push("teamMember");
        if(missingFields.length != 0)
             return response.send("Following fields are missing ->" + missingFields.toString());
        Team.save(teamObject);
        response.send({"message":"Added entry in database"});
    }

    public static updateTeam = (request: express.Request, response: express.Response) => {
        if(request.body.id==null) return response.send("Id is missing");
        let updatedObject:any = {};
        if(request.body.name!= null)
            updatedObject.name = request.body.name;
        if(request.body.duHead!= null)
            updatedObject.duHead = request.body.duHead;
        if(request.body.manager!= null)
            updatedObject.manager =request.body.manager;
        if(request.body.teamLead!= null)
            updatedObject.teamLead =request.body.teamLead;
        if(request.body.teamMember!= null)
            updatedObject.teamMember =request.body.teamMember;
        if(updatedObject==null) return response.send("No data has been sent for updation");
        Team.update({id:request.body.id},updatedObject);
        response.send({"message":"Team entry updated in the database"});
    }

    public static deleteTeam = (request: express.Request, response: express.Response) => {
        if(request.body.id==null) return response.send("Id is missing");
        Team.delete({id:request.body.id})
        response.send({"message":"team entry deleted"});
    }
}
export default TeamController;