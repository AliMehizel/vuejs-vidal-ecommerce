<template>
  <Navbar />
  <!---<div class="shipping-container">
    <div class="shipping-address">
      <div class="shipp-title">
        <h2>Shipping information</h2>
      </div>
      <form >
        <div>
          <label>Address</label>
          <input
            type="text"
            placeholder="Address.."
            v-model="address"
            required
          />
        </div>
        <div>
          <label>Phone number</label>
          <input
            type="text"
            placeholder="Phone number.."
            v-model="phone"
            required
          />
        </div>
        <div>
          <label>State</label>
          <input type="text" placeholder="State.." v-model="state" required />
        </div>
        <div>
          <label>City</label>
          <input type="text" placeholder="City.." v-model="city" required />
        </div>
        <div>
          <label>Zip code</label>
          <input
            type="text"
            placeholder="Zip code.."
            v-model="zip_code"
            required
          />
        </div>
        <div class="ad-btn">
          <input type="submit" value="submit" />
        </div>
      </form>
    </div>
  </div>--->

  <div class="checkout">
    <button @click="handlePayment">Pay with Stripe</button>
  </div>
</template>

<script>
import { ref } from "vue";
import Navbar from "../components/Navbar.vue";
import { useCarts } from "../stores/carts";


export default {
  components: { Navbar },
  setup() {
    const carts = useCarts();
    carts.GetCarts();
    const total = ref(0);

    const handlePayment = async () => {
      total.value = carts.TotalProducts;
      
    };

    return {
      total,
      handlePayment,
    };
  },
};
</script>

<style scoped>
.shipping-container {

  display: flex;
  justify-content: center;
}

.shipping-address {

  border-radius: 4px;
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.shipp-title {
  text-align: center;
}

.shipping-address form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

form > div {
  padding: 10px;
  width: 100%;
}

form input {
  width: 100%;
  padding: 10px;
  font-size: 17px;

  border-radius: 4px;
}

.ad-btn {
  text-align: center;
}

.ad-btn button {
  padding: 7px 14px;
  color: #fff;
  background: #2e5266ff;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/*checkout mssg */

.success-message {
  color: green;
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.checkout {
  padding: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.checkout button {
  background: #2e5266ff;
  color: #fff;
  padding: 10px;
  font-size: 18px;
  border-radius: 2px;
  border: none;
  cursor: pointer;
}
</style>