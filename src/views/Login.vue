<template>
  <div class="about">
    <h1>This is an login page</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" v-model="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" class="form-text text-muted"> We'll never share your email with anyone else.</small>
              <p></p>
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <p></p>
            <button type="button" @click="loginClick()" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { initializeApp } from "@/firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginClick() {
      signInWithEmailAndPassword(auth, this.username, this.password)
        .then((result) => {
          console.log("Uspjesna prijava", result);

          this.$router.replace({ name: "home" });
        })
        .catch(function () {
          console.log("Doslo je do greske");
        });
    },
  },
};
</script>
