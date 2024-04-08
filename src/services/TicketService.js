import axios from 'axios';

const TICKET_API_BASE_URL = 'http://localhost:8082/tickets'

class TicketService{
    getTickets(){
        return axios.get(TICKET_API_BASE_URL);
    }
}

export default new TicketService()