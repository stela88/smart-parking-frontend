<template>
  <div class="container">
    <!-- Input field for registration -->
    <div class="form-group">
      <label for="registrationInput">Enter Registration:</label>
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
        <td>{{ tickets.timeOfEnter }}</td>
        <td>{{ tickets.timeOfExit }}</td>
        <td>{{ tickets.exitTimeout }}</td>
        <td>{{ tickets.createdTs }}</td>
        <td>{{ tickets.modifiedTs }}</td>
      </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
import TicketService from '../services/TicketService';

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