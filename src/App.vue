<template>
  <div id="app">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand">
          <router-link to="/" class="nav-link"> <img src="@/assets/fipu_logo.png" height="40" class="d-inline-block align-text-top" alt="" loading="lazy" /> </router-link>
        </a>

        <form class="d-flex mx-auto" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        </form>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggleMobileMenu" aria-colcount="toggleMobileMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="toggleMobileMenu">
          <ul class="navbar-nav ms-auto text-center">
            <li>
              <router-link to="/login" class="nav-link"><b>Login</b></router-link>
            </li>
            <li>
              <router-link to="/signup" class="nav-link"><b>Signup</b></router-link>
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
