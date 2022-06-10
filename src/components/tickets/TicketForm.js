import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, update] = useState({
        description: "",
        emergency: false
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")

        // TODO: Create the object to be saved to the API
        /*
                    {
                    "userId": 1,
                    "description": "Pariatur nihil animi eos doloremque laborum fugiat consequuntur iusto. Et tempore a enim.",
                    "emergency": true,
                    "dateCompleted": "Fri Apr 29 2022 21:24:29 GMT-0500 (Central Daylight Time)"
                    }
        */
        const ticketToSendToApi = {
            userId: honeyUserObject.id,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/serviceTickets`, {
            method: "POST",
            headers: {
//JSON server wants to know that it is being passed JSON and this is how we specify it with an HTTP header
                "Content-Type": "application/json" 
            },
//the body is the information the client wants the API to save (cant send a raw javascript object, so we stringify)
            body: JSON.stringify(ticketToSendToApi)
        }) 
//the object has been saved in the api, the JSON server has responded
            .then(response => response.json())
            .then(() => {
                //immediately direct the user back to the ticket list 
                navigate("/tickets") //the route for ticket list is /tickets and can be seen in ApplicationView.js
            })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket } //short hand notation for copying an object (copy of existing state)
                                //modifying property 
                                copy.description = evt.target.value //value of the target of the event
//since we changed the value of state we need to update the copy of state  
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }  //short hand notation for copying an object (copy of existing state)
                                //modifying property 
                                copy.emergency = evt.target.checked //value of the target of the event (.checked because we are using a checkbox)
//since we changed the value of state we need to update the copy of state 
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}