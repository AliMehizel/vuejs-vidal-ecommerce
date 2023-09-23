<template>
  <Navbar />
  <div class="login-container">
    <div class="form-input">
      <div class="login-title">
        <h2>Login</h2>
      </div>
      <form @submit.prevent="LoginUser">
        <div>
          <label for="email">Username</label>
          <input type="text" id="email" v-model="username" placeholder="Username.." required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Password.." required />
        </div>
        <div class="input-btn">
          <input type="submit" value="Login" />
        </div>
        <div class="or">
          <p>Or</p>
        </div>
        <div class="p">
          <router-link to="/signup">Create an account</router-link>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>

<script>
import { ref } from "vue";
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
import { useRoute, useRouter } from "vue-router";
import router from '@/router'
export default {
  components: { Navbar, Footer },

  setup() {
    //state
    const username = ref("");
    const password = ref("");
    //redirect when user  auth
    const pushWithQuery = () => {
      router.push({name: "home"});
    };

    //login
    const LoginUser = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/token/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          //create local storage for token
          localStorage.setItem("authTokens", JSON.stringify(data));
          console.log("POST request successful:", data);
          pushWithQuery()
        } else {
          alert("username or password error");
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
        console.error("Error during POST request:", error.message);
      }
    };

    return { username, password, LoginUser,pushWithQuery};
  },
};
</script>

<style>
.login-container {
  margin-top: 80px;
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
}

.form-input {
  border: 1px solid #ddd;
  margin-top: 50px;
  height: 350px;
  width: 500px;
  border-radius: 4px;
}

.login-title {
  text-align: center;
  padding: 7px;
}

.form-input form {
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

form > div {
  width: 80%;
}

#email,
#password {
  padding: 10px;
  width: 100%;
  border: 0.5px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}
label {
  display: block;
}

.input-btn input {
  border: none;
  padding: 5px;
  width: 180px;
  font-size: 18px;
  background: #2e5266ff;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.input-btn,
.or,
.p {
  text-align: center;
}

.p a {
  color: #000;
}

@media screen and (max-width: 530px) {
  .form-input {
    border: 1px solid #ddd;
    margin-top: 50px;

    width: 95%;
    border-radius: 4px;
  }
}
</style>