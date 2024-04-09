<template>
  <div id="reg">
    <TicketByRegistration />
  </div>
</template>

<script>
import TicketByRegistration from '../components/TicketByRegistration.vue'

export default {
  name: 'RegistrationView',
  components: {
    TicketByRegistration
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>