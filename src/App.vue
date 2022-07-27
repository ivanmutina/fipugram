<template>
  <div id="app">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand">
          <router-link to="/" class="nav-link"> <img src="@/assets/fipu_logo.png" height="40" class="d-inline-block align-text-top" alt="" loading="lazy" /> </router-link>
        </a>

        <form class="d-flex mx-auto" role="search">
          <input v-model="store.searchTerm" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        </form>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggleMobileMenu" aria-colcount="toggleMobileMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="toggleMobileMenu">
          <ul class="navbar-nav ms-auto text-center">
            <li v-if="!store.currentUser">
              <router-link to="/login" class="nav-link"><b>Login</b></router-link>
            </li>
            <li v-if="!store.currentUser">
              <router-link to="/signup" class="nav-link"><b>Signup</b></router-link>
            </li>
            <li>
              <a v-if="store.currentUser" href="#" @click="logoutClick()" class="nav-link"><b>Logout</b></a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { initializeApp } from "@/firebase.js";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from "@/router";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("***", user.email);
    store.currentUser = user.email;
    const uid = user.uid;
  } else {
    console.log("*** No user");
    store.currentUser = null;

    // da je prvi screen login
    if (router.name !== "Login") {
      router.push({ name: "Login" });
    }
  }
});

export default {
  name: "app",
  data() {
    return {
      store,
    };
  },
  methods: {
    logoutClick() {
      signOut(auth).then(() => {
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
