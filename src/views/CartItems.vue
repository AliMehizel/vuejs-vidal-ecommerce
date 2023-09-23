<template>
  <!---Nav cart---->
  <nav>
    <div>
      <router-link to="/"
        ><button>
          <i class="material-icons">arrow_back</i> Continue Shopping
        </button></router-link
      >
    </div>

    <div>
      <router-link to="/login"
        ><button>Login<i class="material-icons">login</i></button></router-link
      >
    </div>
  </nav>
  <!--carts container--->
  <div class="carts-container">
    <div class="cart-title">
      <h1>Cart Items</h1>
    </div>

    <div class="cart-items">
      <div class="cart-list">
        <div class="cart-div" v-for="cart in cartList.carts" :key="cart.id">
          <div class="cart-div-img">
            <img
              :src="'https://vidaldz.com/' + cart.product.image"
              :alt="cart.product.name"
            />
          </div>

          <div class="cart-div-content">
            <h3>{{ cart.product.name }}</h3>
            <strong>{{ cart.product.price }}$</strong>
            <p>Size : {{ cart.size }}</p>
            <div class="cart-quantity">
              <i
                class="material-icons"
                @click="updateCart('add', cart.product.name, cart.id)"
                >add</i
              >
              <input type="number" v-bind:value="cart.quantity" />
              <i
                class="material-icons"
                @click="updateCart('remove', cart.product.name, cart.id)"
                >remove</i
              >
            </div>

            <button class="btn-delete" @click="deleteItem(cart.id)">
              <i class="material-icons">delete</i>
            </button>
          </div>
        </div>
      </div>

      <div class="cart-amount">
        <div>
          <div>
            <h3>Oreder summary</h3>
          </div>
          <div>
            <p>Products</p>
            <strong>{{ cartList.TotalProducts.toFixed(2) }}$</strong>
          </div>
          <div>
            <p>Shipping</p>
            <strong>30$</strong>
          </div>
          <div>
            <p>Total amount</p>
            <strong>{{ (cartList.TotalProducts + 30).toFixed(2) }}$</strong>
          </div>
          <div>
            <router-link to="/shipping"
              ><button>Go to checkout</button></router-link
            >
            <p class="nb">NB: Login before place oreder</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!----shipping form--->
  <div class="shipping-container">
    <form class="form-input" @submit.prevent="handleAddress">
      <div class="form-title">
        <h3>Shipping informations</h3>
      </div>
      <div>
        <label for="address">Address</label>
        <input
          type="text"
          id="address"
          v-model="address"
          placeholder="Address.."
        />
      </div>
      <div class="b-input">
        <div>
          <label for="city">City</label>
          <input type="text" id="city" v-model="city" placeholder="City.." />
        </div>
        <div>
          <label for="state">State</label>
          <input type="text" id="state" v-model="state" placeholder="State.." />
        </div>
      </div>
      <div class="b-input">
        <div>
          <label for="zipcode">Zipcode</label>
          <input
            type="text"
            id="zipcode"
            v-model="zipcode"
            placeholder="Zipcode.."
          />
        </div>
        <div>
          <label for="phone">Phone</label>
          <input type="text" id="phone" v-model="phone" placeholder="Phone.." />
        </div>
      </div>

      <div class="form-btn">
        <button type="submit">Confirm shipping</button>
      </div>
    </form>
  </div>
  <!----paypall button--->
  <div class="div-shipp-btn" v-if="onAction" :id="onAction ? 'animate' : ''">
    <button class="custom-btn" @click="handleEvent">Pay with stripe <i class="fab fa-stripe-s"></i></button>
  </div>
  <!---footer--->
  <Footer />
</template>

<script>
import { ref, onMounted } from "vue";
import { useCarts } from "../stores/carts";
import Footer from "../components/Footer.vue";
import axios from "axios";
import useStripe from "../app/useStripe";

export default {
  components: { Footer },
  setup() {
    let cartList = useCarts();
    onMounted(async()=>{
      
      await cartList.GetCarts();
    })
    //update cart quantity
    const updateCart = async(action, name, id) => {
      await cartList.updateCart({
        name: name,
        id: id,
        action: action,
      });
      await cartList.GetCarts();
    };
    //delete product from carts
    const deleteItem = async (id) => {
      await cartList.deletFromCart({ id: id });
    };

    //post address information
    const address = ref("");
    const city = ref("");
    const state = ref("");
    const zipcode = ref("");
    const phone = ref("");
    const onAction = ref(true);
    const handleAddress = async () => {
      let authTokens = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;

      try {
        const res = await fetch("http://127.0.0.1:8000/address", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the appropriate content type for your data
            Authorization: `Bearer ${authTokens?.access}`,
          },
          body: JSON.stringify({
            address: address.value,
            state: state.value,
            city: city.value,
            zipcode: zipcode.value,
            phone: phone.value,
          }), // Convert your data to JSON string
        });

        if (!res.ok) {
          if (res.status === 401) {
            // Handle 401 Unauthorized status
            alert("Log in Please");
            console.log("Unauthorized access.");
          }
        } else if (res.ok) {
          // Handle successful response
          onAction.value = true;
        }
      } catch (error) {
        console.log("Error during POST request:", error.message);
      }
    };
    //implementation checkout process here
    const handleEvent = async () => {
      const response = await useStripe(cartList.carts[0].oreder.id);

      if (response) {
        const { url } = response;
        window.location.href = url;
      } else {
        // Handle the error or show an error message
        console.log("Failed to fetch data.");
      }
    };

    //paypall
    //no new

    //'http://127.0.0.1:8000/createOreder/'
    const createPaymentOrder =async ()=>{
      paypal
      .Buttons({

       createOrder: async () => {
            return await fetch('http://127.0.0.1:8000/createOreder/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ oreder_id:3}),
            }).then((res) => res.json());
          },
          onApprove: async (data) => {
            // Handle the payment approval
            await fetch('http://127.0.0.1:8000/captureOreder/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ orderID: data.orderID }),
            }).then((res) => res.json());

            // Update UI or navigate to a success page
            console.log('Payment completed successfully!');
          },
        }).render('#paypal-button-container');
  
    }
    return {
      cartList,
      updateCart,
      deleteItem,
      handleAddress,
      address,
      state,
      city,
      zipcode,
      phone,
      onAction,
      handleEvent,
      createPaymentOrder

    };
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 8vh;
  padding: 2rem;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  background: #fff;
}
h1 {
  color: #000;
}
button {
  background: #2e5266ff;
  border: none;
  color: #fff;
  padding: 7px;
  border-radius: 4px;
  font-size: 18px;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
}

button i {
  vertical-align: middle;
  font-size: 28px;
  margin: 0 5px;
  cursor: pointer;
}

/*carts container */

.carts-container {
  margin-top: 100px;
  width: 90%;
}

.cart-title {
  text-align: center;
  padding: 30px 0;
}
/*cart item */
.cart-items {
  border-top: 1px solid #ddd;
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 10px;
}
/*cart list */

.cart-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 2;
  border-radius: 6px;
}
/*cart div */

.cart-div {
  width: 100%;
  border: 1px solid #c4c4c4;
  display: flex;
  border-radius: 6px;
  margin: 5px 0;
}

.cart-div:hover {
  box-shadow: 0px 0px 15px 9px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border: none;
}

/*cartt div img */
.cart-div-img {
  padding: 8px 5px;
}
.cart-div-img img {
  width: 150px;
  height: 150px;
}

/*cart div content */
.cart-div-content {
  padding: 10px 15px;
}

.cart-quantity {
  display: inline-block;
}
.cart-quantity input {
  border: none;
  width: 40px;
  height: 40px;
  text-align: center;
  outline: none;
}

.cart-quantity i {
  vertical-align: middle;
  border-radius: 50px;
  background: #c1c1c1;
  cursor: pointer;
}

.btn-delete {
  display: inline-block;
  margin: 5px 10px;
  background: #e63946;
}

strong {
  margin: 8px 5px;
}

/*cart amount */
.cart-amount {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
}

.cart-amount > div {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

.cart-amount > div > div {
  padding: 5px;
}
.nb {
  margin-top: 10px;
  color: #e63946;
  font-size: 14px;
}

/*shipping address */

.shipping-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
  width: 100%;
}

.form-title {
  text-align: center;
}

.form-input {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 60%;
}

.form-input > div {
  width: 100%;
  padding: 5px;
}
label {
  font-size: 18px;
}
.form-input > div input {
  width: 98%;
  padding: 7px;
  font-size: 18px;
  border-radius: 2px;
  border: 1px solid #c4c4c4;
}

.b-input {
  display: flex;
}

.b-input > div {
  width: 50%;
}

.form-btn {
  text-align: center;
}
/*ANIMATION */
.div-shipp-btn {
  width: 100%;
  text-align: center;
  padding: 5px;
  margin-bottom: 50px;
}

.custom-btn{
  width: 200px;
  background: rgb(35, 124, 54);
  backdrop-filter: blur(2rem);
  border: 1px solid #ddd;
  color: #fffdfd;
}
.custom-btn i{
  font-size: 16px;
  color: rgb(255, 255, 255);
}

@keyframes animate {
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@media screen and (min-width: 1200px) {
  .cart-div{
    width: 50%;
  }
}
@media screen and (max-width: 868px) {
  .cart-div {
    width: 80%;
  }

  .cart-quantity {
    display: inline-block;
  }

  .cart-quantity input {
    width: 30px;
    text-align: center;
  }
  .btn-delete {
    display: inline-block;
    margin: 0 5px;
    padding: 2px;
  }
  .btn-delete i {
    font-size: 20px;
  }

  strong {
    display: block;
  }

  .cart-amount > div {
    width: 100%;
  }

  /*address shipping */
  .form-input {
    width: 80%;
  }
}

@media screen and (max-width: 648px) {
  nav button {
    font-size: 0.8em;
    text-align: center;
    padding: 5px;
  }

  .cart-items {
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }

  .cart-div {
    width: 95%;
  }
  .cart-amount {
    margin-top: 20px;
  }
  h3 {
    font-size: 1em;
  }
  strong {
    font-size: 0.8em;
  }
  /*address shipping */
  .form-input {
    width: 90%;
  }
}
</style>