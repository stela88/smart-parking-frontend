<template>
  <div class="container">
    <div class="form-group">
      <label for="registrationInput">Enter Your Registration:</label>
      <input type="text" class="form-control" id="registrationInput" v-model="registration" @input="getTicketByRegistration" placeholder="Enter registration">
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
    <div v-if="tickets.length !== 0">
      <button @click="getReciep(ticketId)" class="btn btn-primary">Pay your receipt?</button>
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
      <button @click="postTransaction" class="btn btn-primary">Pay</button>
      <div v-if="popupMessage" class="popup">
    <div class="popup-content">
      <span class="close" @click="closePopup">&times;</span>
      <p>{{ popupMessage }}</p>
    </div>
  </div>
    </div>
  </div>
</template>

<script>
import TicketService from '../services/TicketService';
import TransactionService from '../services/TransactionService';
import moment from 'moment';

export default {
  name: 'TicketByRegistration',
  data() {
    return {
      tickets: [],
      registration: '',
      ticketId: '',
      receipt: null,
      price: '',
      popupMessage: null 
    };
  },
  methods: {
    getTicketByRegistration() {
      TicketService.getTicketByRegistration(this.registration)
        .then((response) => {
          console.log(response.data); 
          this.tickets = response.data;
          this.ticketId = response.data.ticketId; 
          this.receipt = null;
        })
        .catch((error) => {
          console.error("Error fetching tickets:", error.response.data.message);
          this.tickets = [];
          this.receipt = null; 
        });
    },
    getReciep(ticketId) {
      TicketService.getReciep(ticketId)
        .then((response) => {
          console.log(response.data);
          this.receipt = response.data; 
        })
        .catch((error) => {
          console.error("Error fetching receipt:", error.response.data.message);
          this.receipt = null; 
        });
    },
    postTransaction() {
    TransactionService.postTransaction({
    amount: this.receipt.price,
    createdTs: null, 
    modifiedTs: null, 
    ticket: {
      ticketId: this.ticketId
    }
    },
    {
  headers: {
    'Content-Type': 'application/json'
  }
  }
    )
    .then((response) => {
      console.log("Transaction posted successfully:", response.data);
      this.showPopup("Transaction posted successfully, You have 15 minutes to exit");
    })
    .catch((error) => {
      console.error("Error posting transaction:", error.response.data.message);
      this.showPopup("Error posting transaction: " + error.response.data.message);
    });
},
showPopup(message) {
      this.popupMessage = message; 
      setTimeout(() => {
        this.closePopup();
      }, 3000); 
    },
    closePopup() {
      this.popupMessage = null; 
    }
  },
  filters: {
    formatDate(value) {
      if (value) {
        return moment.utc(new Date(value).toString()).format('MM/DD/YYYY hh:mm A');
      }
    }
  }
};
</script>
<style>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(0, 0, 0); 
  padding: 20px;
  border-radius: 5px;
  z-index: 999; 
}

.popup-content {
  color: white;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>