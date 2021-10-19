import express from 'express';
import employeeController from '../controllers/employeeController';
const router = express.Router();
 
router.get('/', (request, response) => {
  response.send('Hello world!');
});

router.get('/get', employeeController.getAllEmployee);
router.get('/get/:id', employeeController.getEmployee);
router.post('/addEmployee', employeeController.addEmployee);
router.put('/updateEmployee', employeeController.updateEmployee);
router.delete('/deleteEmployee', employeeController.delteEmployee);

export default router;