export const TicketEdit = () => {
    // TODO: This state object should not be blank
    const [ticket, assignTicket] = useState({})

    // TODO: What is the variable in which you stored the route parameter?
    const { ??? } = useParams()

    // TODO: Get the ticket state from the API.
    useEffect(() => {

    }, [ ??? ])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Write the fetch for the PUT request to replace the object being edited
    }


    return <form className="ticketForm">
        <h2 className="ticketForm__title">Service Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={ticket.description}
                    onChange={
                        (evt) => {
                            // TODO: Update state with a modified copy
                        }
                    }>{ticket.description}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Emergency:</label>
                <input type="checkbox"
                    onChange={
                        (evt) => {
                            // TODO: Update state with a modified copy
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={() => handleSaveButtonClick()}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}