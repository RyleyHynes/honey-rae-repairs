import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeDetails } from "../../employees/EmployeeDetails"
import { EmployeeList } from "../../employees/EmployeeList"
import { CustomerDetails } from "../customers/CustomerDetails"
import { CustomerList } from "../customers/CustomerList"
import { Profile } from "../profile/Profile"
import { TicketContainer } from "../tickets/TicketContainer"




export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={<TicketContainer/>} />
                <Route path="employees" element={<EmployeeList/>} /> 
                {/*whenever the route matches, employees/ some number is going to capture that and store it in an employee variable*/}
                <Route path="employees/:employeeId" element={<EmployeeDetails/>} />
                <Route path="customers" element={<CustomerList/>} />  
                <Route path="customers/:customerId" element={<CustomerDetails/>} />
                <Route path="profile" element={<Profile />} />
 
            </Route>
        </Routes>
    )
}