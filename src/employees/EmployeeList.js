//set up initial state and with my initial state use effect I will go fetch all of the employees from the api

import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./Employees.css"

// pull them in and then with JSX we will display the name and email address of the employees
export const EmployeeList = () => {
const [employees, setEmployees] = useState([])

//will observe when initial state is done and then go fetch permanent state 
useEffect(
    () => {
        fetch(` http://localhost:8088/users?isStaff=true`)
        .then(response => response.json())
        .then((employeeArray) =>  {
            setEmployees(employeeArray)
        })
    },
    []
)

return <article className="employees">
{
    employees.map(employee => <Employee id={employee.id} fullName={employee.fullName} email={employee.email}  />)
        //we need an employee key because we are iterating over and over again
        
    
}


</article>
}
