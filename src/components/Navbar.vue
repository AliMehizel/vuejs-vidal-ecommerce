<template>
  <nav>
    <router-link to="/"><h2>Vidal</h2></router-link>

    <div class="menu" :id="logic ? 'animate' : ''">
      <div class="m-right">
        <a href="#">Home</a>
        <a href="#">Contact</a>
        <a href="#">About</a>
      </div>
      <div class="m-left">
        <router-link to="/login"><button><i class="material-icons">login</i></button></router-link>
        <div id="cart-quantity">
          <router-link to="/cart-items"
            ><button id="icon">
              <i class="material-icons">local_mall</i>
            </button></router-link
          >
          <span>{{ carts.getLength }}</span>
        </div>
      </div>
    </div>

    <div id="menu-btn">
      <div id="cart-quantity">
        <router-link to="/cart-items"
          ><button id="icon">
            <i class="material-icons">local_mall</i>
          </button></router-link
        >
        <span>{{ carts.getLength }}</span>
      </div>
      <button @click="handleEvent"><i class="material-icons">menu</i></button>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { useCarts } from "../stores/carts";
export default {
  setup() {
    let logic = ref(false);
    //nav transition
    const handleEvent = () => {
      logic.value = !logic.value;
    };
    //how many item in cart : carts.getLength
    const carts = useCarts();
    carts.GetCarts();

    return { logic, handleEvent, carts };
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
  padding: 1rem 2rem;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  background: #fff;
}

h2{
  color: #2e5266ff;
}

nav a{
  text-decoration: none;
  color: #000;
}

.menu {
  display: flex;
  align-items: center;
}

.m-left,
.m-right {
  display: flex;
  justify-content: space-around;
}

.m-left {
  width: 120px;
}
.m-right {
  width: 250px;
}
.m-right a {
  text-decoration: none;
  color: #000;
}

button {
  background: transparent;
  border: none;
  cursor: pointer;
}

button i {
  vertical-align: middle;
  font-size: 28px;

}

#menu-btn {
  display: none;
  width: 120px;
}

@media screen and (max-width: 768px) {
  nav {
    position: relative;
    justify-content: space-between;
  }
  .menu {
    position: absolute;
    top: 8vh;
    right: 0;
    width: 100%;
    height: 92vh;
    flex-direction: column;
    transform: translateX(100%);
    opacity: 0;
    transition: 0.65s ease-in-out all;
    background: #fff;
  }
  .m-left,
  .m-right {
    height: 50%;
    flex-direction: column;
    align-items: center;
  }

  #menu-btn {
    display: flex;
    justify-content: space-around;
  }

  #menu-btn button {
    cursor: pointer;
  }

  #animate {
    transform: translateX(0%);
    opacity: 1;
    transition: 0.65s ease-in-out all;
  }
}

#cart-quantity {
  position: relative;
}

span {
  text-align: center;
  width: 25px;
  border-radius: 50%;
  position: absolute;
  bottom: 12px;
  right: -10px;
  background: #e63946;
  padding: 0.1em 0.4em;
}
</style>