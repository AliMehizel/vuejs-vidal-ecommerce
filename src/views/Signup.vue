<template>
<Navbar/>
  <div class="signup-container">
    <div class="form-input">
      <div class="login-title">
        <h2>Signup</h2>
      </div>
      <form @submit.prevent="SignupUser">
        <div>
          <label for="first">First name</label>
          <input
            type="text"
            id="first"
            v-model="first_name"
            placeholder="First name.."
            required
          />
        </div>
        <div>
          <label for="last">Last name</label>
          <input
            type="text"
            id="last"
            v-model="last_name"
            placeholder="Last name.."
            required
          />
        </div>
        <div>
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Username.."
            required
          />
        </div>
        <div>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Email.."
            required
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Password.."
            required
          />
        </div>
        <div>
          <label for="password2">Password validation</label>
          <input
            type="password"
            id="password2"
            v-model="password2"
            placeholder="Validate your password.."
            required
          />
        </div>
        <div class="input-btn">
          <input type="submit" value="Signup" />
        </div>

      </form>
      
    </div>
    
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { ref } from "vue";
import router from '@/router'
import { googleTokenLogin } from "vue3-google-login"
export default {
  components:{Navbar},
  setup() {

    
const login = () => {
  googleTokenLogin().then((response) => {
    console.log("Handle the response", response)
  })
}
    //satate
    const first_name = ref("");
    const last_name = ref("");
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const password2 = ref("");
    //redirect to login

    //redirect when user  auth
    const pushWithQuery = () => {
      router.push({name: "Login"});
    };


    //signup 

    const SignupUser = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/signup/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name : first_name.value,
            last_name : last_name.value,
            username: username.value,
            email: email.value,
            password: password.value,
            password2: password2.value,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          //create local storage for token
          localStorage.setItem("authTokens", JSON.stringify(res.data));
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

    
 

    return {login, first_name, last_name, username, email, password, password2,SignupUser }
  }
};
</script>

<style scoped>
.signup-container {
  margin-top: 80px;
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
}

.form-input {
  border: 1px solid #ddd;
  margin-top: 50px;
  height: 600px;
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


#first,
#last,
#username,
#password2,
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

.p button {
  color: #000;
  padding: 5px 10px;
  font-size: 18px;
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