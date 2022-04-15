<template>
  <div id="app">
    <div>
      <router-link to="/users">Go to Users</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    this.$store.dispatch("fetchUsers", { start: 0, limit: 2 });
  },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 30px;
}
</style>
