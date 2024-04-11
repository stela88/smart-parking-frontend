import axios from 'axios';

const TICKET_API_BASE_URL = 'http://localhost:8082/tickets';
const TICKET_BY_REGISTRATION = 'http://localhost:8082/tickets/registration/';


class TicketService {
  getTickets() {
    return axios.get(TICKET_API_BASE_URL);
  }

  getTicketByRegistration(registration) {
    return axios.get(`${TICKET_BY_REGISTRATION}${registration}`);
  }

  getReciep(id){
    return axios.get(`${TICKET_API_BASE_URL}/${id}/receipt`);
  }
}

export default new TicketService();