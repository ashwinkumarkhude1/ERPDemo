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
    "http://localhost:3000/get"
    this API will return all the employees

2)Get specific employee
    request type :get
    "http://localhost:3000/get/id"
    id of the employee from db.
    This will return all the details of the employee.

3)Add Employee
    request type :post
    "http://localhost:3000/addEmployee"

    body:{
        "firstName":"Ashwin",
        "lastName":"Khude",
        "age":26,
        "position":"SDE"
    }

    This will add new Employee in database.

4)Update Employee details
    request type : put
    "http://localhost:3000/updateEmployee"

    body:{
        "id":1,
        "firstName" : "Ashwinkumar"
    }

    This will update employee details in database.

5)Update Employee details
    request type : delete
    "http://localhost:3000/deleteEmployee"

    body:{
        "id":1,
    }

    This will delete employee details in database.