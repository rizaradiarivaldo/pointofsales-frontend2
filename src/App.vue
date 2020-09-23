<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/history">History</router-link>
      |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: Airbnb;
  src: url("../src/assets/font/AirbnbCerealLight.ttf");
}
* {
  font-family: Airbnb;
}
#app {
  font-family: Airbnb;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
