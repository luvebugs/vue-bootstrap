<template>
  <div id="app">
    <index></index>
</template>

<script>
import Hello from './components/Hello'
import index from './index'

export default {
  components: {
    Hello,
    index
  }
}
</script>

<style>

#app {
  margin: 32px;
}
</style>
