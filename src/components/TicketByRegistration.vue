<template>
  <div class="container">
    <!-- Input field for registration -->
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
  </div>
</template>

<script>
import TicketService from '../services/TicketService';
import moment from 'moment';
import Vue from 'vue'

Vue.filter('formatDate', function(value) {
    if (value) {
        // Convert the time to the local timezone and format it
        const formattedTime = moment.utc(value).format('MM/DD/YYYY hh:mm A');
        return formattedTime;
    }
});

export default {
  name: 'TicketByRegistration',
  data() {
    return {
      tickets: [],
      registration: ''
    };
  },
  methods: {
  getTicketByRegistration() {
    TicketService.getTicketByRegistration(this.registration)
      .then((response) => {
        console.log(response.data); // Add this line for debugging
        this.tickets = response.data;
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
        this.tickets = [];
      });
  }
}
};
</script>