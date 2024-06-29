import axios from 'axios';

const TICKET_API_BASE_URL = 'http://192.168.137.253:8083/api/tickets';
const TICKET_BY_REGISTRATION = 'http://192.168.137.253:8083/api/tickets/registration/';


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