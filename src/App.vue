<template>
  <div id="app">
    <auto></auto>
    <index></index>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Index from './index'
import Auto from './auto'

export default {
  components: {
    Hello,
    Index,
    Auto
  }
}
</script>

<style>

#app {
  margin: 32px;
}
</style>
