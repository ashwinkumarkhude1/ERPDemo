Setup:
    1)Clone this repository on your local machine.
    2)Start PgAdmin.On your postgre server create db named 'ERP_DB'.
    3)In your local repository, open src/db.ts. Add the PostgreSQl username and password.
    4)Open command promt at the root of local repository and enter following command
        "npm install"
        this will install all the dependencies.
    5)To start the server enter following command
        "npm run dev"
        this will start the server at port 3000.
    
Accessing APIs
1)Get:
    request type :get
    "http://localhost:3000/employee/get"
    this API will return all the employees

2)Get specific employee
    request type :get
    "http://localhost:3000/employee/get/id"
    id of the employee from db.
    This will return all the details of the employee.

3)Add Employee
    request type :post
    "http://localhost:3000/employee/addEmployee"

    body:{
        "firstName":"Ashwin",
        "lastName":"Khude",
        "age":26,
        "experience": 2,
        "address":"ABC building,xyz,Pune",
        "mobileNo":"1234567890",
        "position":"SDE",
        "CEO":2,
        "managingDirector":3,
        "duHead":4,
        "manager":5,
        "teamLead":6    
    }

    This will add new Employee in database.

4)Update Employee details
    request type : put
    "http://localhost:3000/employee/updateEmployee"

    body:{
        "id":1,
        "firstName" : "Ashwinkumar"
    }

    This will update employee details in database.

5)Delete Employee details
    request type : delete
    "http://localhost:3000/employee/deleteEmployee"

    body:{
        "id":1,
    }

    This will delete employee details in database.

6)Get:
    request type :get
    "http://localhost:3000/team/get"
    this API will return all the teams

7)Get specific team
    request type :get
    "http://localhost:3000/team/get/id"
    id of the employee from db.
    This will return all the details of the team.

8)Add team
    request type :post
    "http://localhost:3000/team/addTeam"

    body:{
         "name":"Microsoft",
        "duHead":4,
        "manager":5,
        "teamLead":6,
        "teamMember":[9,10,11]
    }

    This will add new team in database.

9)Update team details
    request type : put
    "http://localhost:3000/team/updateTeam"

    body:{
        "id":1,
        "name" : "Twitter"
    }

    This will update team details in database.

10)Delete team details
    request type : delete
    "http://localhost:3000/team/deleteTeam"

    body:{
        "id":1,
    }

    This will delete team details in database.

11)Get:
    request type :get
    "http://localhost:3000/project/get"
    this API will return all the project

12)Get specific project
    request type :get
    "http://localhost:3000/project/get/id"
    id of the employee from db.
    This will return all the details of the project.

13)Add project
    request type :post
    "http://localhost:3000/project/addProject"

    body:{
        "name":"Mobile",
        "client":"TMobile",
        "team":1   
    }

    This will add new project in database.

14)Update project details
    request type : put
    "http://localhost:3000/project/updateProject"

    body:{
        "id":1,
        "Name" : "Computer"
    }

    This will update employee details in database.

15)Delete project details
    request type : delete
    "http://localhost:3000/project/deleteProject"

    body:{
        "id":1
    }

    This will delete employee details in database.

16)Get specific employee hierarchy
    request type :get
    "http://localhost:3000/employee/getEmployeeHigherHierarchy/:id"
    id of the employee from db.
    This will return all the details of the employee.

