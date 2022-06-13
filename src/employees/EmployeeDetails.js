import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
//this component will only show when the route matches employee/somenumber
export const EmployeeDetails = () => {
    //heres where you can deconstruct that employeeId variable that you defined in the route itself 
    //this pulls in the object that it created from the route parameters and you extract any variable that you define there 
    const { employeeId } = useParams()
    //we want to display all of the details about an employee which means we need a state variable for the employee
    //now that we have our state set up go to the employee component and we use the link component. take name of employee and turn into hyperlink that changes route to employees/ whatever primary key of employee is 
    const [employee, updateEmployee] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
                .then((response) => response.json())
                .then((data) => {
                    const singleEmployee = data[0]
                    updateEmployee(singleEmployee)
                })

        },
        //we want to observe the changes in employeeId
        [employeeId]
    )

    return <section className="employee">
    <header className="employee__header">{employee?.user?.fullName}</header>
    <div>Email: {employee?.user?.email}</div>
    <div>Specialty: {employee.specialty}</div>
    <div>Rate: {employee.rate}</div>
    <footer className="employee__footer">Currently working on {employee?.employeeTickets?.length} tickets</footer>
</section>
}