<template>
  <div>
    <v-editor content="" :height="500">
    </v-editor>
  </div>
</template>

<script>
import Hello from './components/Hello'
// import Index from './index'
// import Auto from './auto'

export default {
  components: {
    Hello,
    // Index,
    // Auto
  }
}
</script>

<style>

#app {
  margin: 32px;
}
</style>
