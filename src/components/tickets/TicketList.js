import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Tickets.css"

//TicketList Component 
export const TicketList = ({ searchTermsState }) => {
    //value of setTickets variable is a function to change state
    const [tickets, setTickets] = useState([])
    //we dont want to modify the array of tickets we got from the API but we still want to display a list of tickets so we need to create another state variable called filtered tickets
    const [filteredTickets, setFiltered] = useState([])
    //by default we dont want to show only emergency tickets so we put false
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)

    const navigate = useNavigate()
    //we need to get honey user out of local storage and right now its just a string 
    const localHoneyUser = localStorage.getItem("honey_user")
    //we need to convert it into an object so that we can use it in our code (now honeyUserObject will be an object with two keys on it ID and Staff)
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermsState.toLowerCase())
            })
            setFiltered(searchedTickets)
        },
        [searchTermsState]
    )

    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`) //go get all the tickets
                //get that response back, parse the json
                .then(response => response.json())
                //convert it back to an actual javascript array
                //put parameter here to capture all of the data that I got after the JSON processing is done
                .then((ticketArray) => {
                    //we then call our setter function and pass it what I want the new value to be which is the ticket array
                    setTickets(ticketArray)
                })
        },
        [] // When this array is empty, you are observing initial component state (all of the tickets)
    )
    //we need another useEffect to see when the ticket state changes should I show all tickets or only a subset (so we need to observe tickets state)
    useEffect(
        () => {
            if (honeyUserObject.staff) {
                //for employees
                setFiltered(tickets)
            }
            else {
                //filtered down the tickets based off that is currently logged in (honeyUserObject) and the service tickets created
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }

        },
        [tickets]

    )

    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )



    //JSX to display the state 
    return <>
        {/*using terinary statement so only employees can see all tickets*/}
        {
            honeyUserObject.staff
                ? <> {/*react fragment allows you to put in multiple buttons*/}
                    <button onClick={() => { setEmergency(true) }}>Emergency Only</button>
                    <button onClick={() => { setEmergency(false) }}>Show All</button>
                </>
                : <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
                    <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>

                </>
        }


        <h2>List of Tickets</h2>
        <article className="tickets">
            {
                filteredTickets.map(
                    //for each ticket as we iterate the object array return this html representation of a ticket
                    (ticket) => {
                        return <section className="ticket">
                            <header>
                                <Link to={`/tickets/${id}/edit`}>Ticket {ticket.id}</Link>
                            </header>
                            <section>{ticket.description}</section>
                            <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}
