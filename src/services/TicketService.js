import axios from 'axios';
import {BASE_API} from "./Constants";

const TICKET_API_BASE_URL = `${BASE_API}/tickets`;
const TICKET_BY_REGISTRATION = `${TICKET_API_BASE_URL}/registration`;


class TicketService {
  getTickets() {
    return axios.get(TICKET_API_BASE_URL);
  }

  getTicketByRegistration(registration) {
    return axios.get(`${TICKET_BY_REGISTRATION}/${registration}`);
  }

  getReciep(id){
    return axios.get(`${TICKET_API_BASE_URL}/${id}/receipt`);
  }
}

export default new TicketService();
