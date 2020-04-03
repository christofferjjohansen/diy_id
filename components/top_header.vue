<template>
  <header>
    <h1>
      {{title}}
    </h1>
  </header>
</template>

<script>
  export default {
    props: ['title']
  }
</script>

<style lang="scss" scoped>
  header {
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightblue;
  } 
</style>