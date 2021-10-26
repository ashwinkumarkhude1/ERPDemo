import express from 'express';
import EmployeeController from '../controllers/employeeController';
import TeamController from '../controllers/teamController';
import ProjectController from '../controllers/projectController';
const router = express.Router();
 
router.get('/', (request, response) => {
  response.send('Hello world!');
});

router.get('/employee/get', EmployeeController.getAllEmployee);
router.get('/employee/get/:id', EmployeeController.getEmployee);
router.post('/employee/addEmployee', EmployeeController.addEmployee);
router.put('/employee/updateEmployee', EmployeeController.updateEmployee);
router.delete('/employee/deleteEmployee', EmployeeController.deleteEmployee);
router.get('/employee/getEmployeeHigherHierarchy/:id',EmployeeController.getEmployeeHigherHierarchy);

router.get('/team/get', TeamController.getAllTeams);
router.get('/team/get/:id', TeamController.getTeam);
router.post('/team/addTeam', TeamController.addTeam);
router.put('/team/updateTeam', TeamController.updateTeam);
router.delete('/team/deleteTeam', TeamController.deleteTeam);

router.get('/project/get', ProjectController.getAllProjects);
router.get('/project/get/:id', ProjectController.getProject);
router.post('/project/addProject', ProjectController.addProject);
router.put('/project/updateProject', ProjectController.updateProject);
router.delete('/project/deleteProject', ProjectController.deleteProject);

export default router;