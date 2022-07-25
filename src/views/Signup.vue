<template>
  <div class="about">
    <h1>This is a signup page</h1>
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
              <p></p>
            </div>

            <div class="form-group">
              <label for="exampleInputPassword2">Repeat password</label>
              <input type="password" v-model="passwordRepeat" class="form-control" id="exampleInputPassword2" placeholder="Repeat password" />
              <p></p>
            </div>
            <p></p>
            <button type="button" @click="signupClick" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { initializeApp } from "@/firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      password: "",
      passwordRepeat: "",
    };
  },
  methods: {
    signupClick() {
      createUserWithEmailAndPassword(auth, this.username, this.password)
        .then(function () {
          console.log("Uspjesna registracija");
        })
        .catch(function () {
          console.log("Doslo je do greske");
        });
    },
  },
};
</script>
