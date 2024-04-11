<template>
   <div class="container">
    <h1 class="text-center"> Ticket List </h1>
    <table class="table table-striped">
        <thead>
            <th> Ticket Id </th>
            <th> Registration </th>
            <th> Time Of Enter </th>
            <th> Time Of Exit </th>
            <th> Exit Timeout </th>
            <th> Created </th>
            <th> Modified </th>
        </thead>
        <tbody>
            <tr v-for = "ticket in tickets" v-bind:key="ticket.id">
                <td>{{ticket.ticketId}}</td>
                <td>{{ticket.registration}}</td>
                <td>{{ticket.timeOfEnter | formatDate }}</td>
                <td>{{ticket.timeOfExit | formatDate }}</td>
                <td>{{ticket.exitTimeout | formatDate }}</td>
                <td>{{ticket.createdTs | formatDate }}</td>
                <td>{{ticket.modifiedTs | formatDate }}</td>
            </tr>
        </tbody>
    </table>
   </div>
</template>

<script>
import TicketService from '../services/TicketService'
import moment from 'moment';

export default{
    name: "Tickets",
    data(){
        return{
            tickets : []
        }
    },
    methods: {
        getTickets(){
            TicketService.getTickets().then((response) => {
                this.tickets = response.data;
            })
        }
    },
    created(){
        this.getTickets()
    },
    filters: {
    formatDate(value) {
      if (value) {
        return moment.utc(new Date(value).toString()).format('MM/DD/YYYY hh:mm A');
      }
    }
  }
}
</script>
