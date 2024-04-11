<template>
  <div class="container">
    <div class="form-group">
      <label for="registrationInput">Enter Your Registration:</label>
      <input type="text" class="form-control" id="registrationInput" v-model="registration" @keyup.enter="getTicketByRegistration" placeholder="Enter registration">
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Ticket Id</th>
          <th>Registration</th>
          <th>Time Of Enter</th>
          <th>Time Of Exit</th>
          <th>Exit Timeout</th>
          <th>Created</th>
          <th>Modified</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="tickets.length === 0">
          <td colspan="7">No tickets found</td>
        </tr>
        <tr v-if="tickets">
          <td>{{ tickets.ticketId }}</td>
          <td>{{ tickets.registration }}</td>
          <td>{{ tickets.timeOfEnter | formatDate }}</td>
          <td>{{ tickets.timeOfExit | formatDate }}</td>
          <td>{{ tickets.exitTimeout | formatDate}}</td>
          <td>{{ tickets.createdTs | formatDate }}</td>
          <td>{{ tickets.modifiedTs | formatDate }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="tickets">
      <button @click="getReciep(ticketId)" class="btn btn-primary">Do you want to pay?</button>
    </div>
    <br>
    <br>
    <div v-if="receipt">
      <h1>Your Receipt</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Price</th>
            <th>Time From</th>
            <th>Time Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ receipt.price }}</td>
            <td>{{ receipt.timeFrom | formatDate }}</td>
            <td>{{ receipt.timeUntil | formatDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import TicketService from '../services/TicketService';
import moment from 'moment';

export default {
  name: 'TicketByRegistration',
  data() {
    return {
      tickets: [],
      registration: '',
      ticketId: '',
      receipt: null 
    };
  },
  methods: {
    getTicketByRegistration() {
      TicketService.getTicketByRegistration(this.registration)
        .then((response) => {
          console.log(response.data); 
          this.tickets = response.data;
          this.ticketId = response.data.ticketId; 
          // Reset receipt when new tickets are fetched
          this.receipt = null;
        })
        .catch((error) => {
          console.error("Error fetching tickets:", error);
          this.tickets = [];
          this.receipt = null; // Reset receipt on error
        });
    },
    getReciep(ticketId) {
      TicketService.getReciep(ticketId)
        .then((response) => {
          console.log(response.data);
          this.receipt = response.data; 
        })
        .catch((error) => {
          console.error("Error fetching receipt:", error);
          this.receipt = null; 
        });
    }
  },
  filters: {
    formatDate(value) {
      if (value) {
        return moment.utc(value).format('MM/DD/YYYY hh:mm A');
      }
    }
  }
};
</script>
