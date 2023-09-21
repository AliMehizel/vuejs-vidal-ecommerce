<template>
  <header>
    <Navbar />
    <div class="intro-container">
      <div>
       <div class="intro-text">
        <h1>50% Off For Your First Shopping</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit quo
          repellendus perferendis reiciendis, expedita nesciunt libero nulla
          rem.
        </p>
       </div>
        <div class="search-bar">
          <!--category select-->
          <details class="custom-select">
            <summary class="radios">
              <input type="radio" name="item" id="default" title="Category.." checked>
              <input type="radio" name="item" id="men" title="Men's clothing" @click="fetchBycategory('MEN')">
              <input type="radio" name="item" id="women" title="Women's's clothing" @click="fetchBycategory('WOMEN')">
              <input type="radio" name="item" id="kids" title="Kid's clothing" @click="fetchBycategory('KIDS')">
              <input type="radio" name="item" id="jewelery" title="Jewelery" @click="fetchBycategory('JEWELERY')">
            </summary>
            <ul class="list">
              
              <li>
                <label for="men">Men's clothing</label>
              </li>
              <li>
                <label for="women">Women's clothing</label>
              </li>
              <li>
                <label for="kids">Kids's clothing</label>
              </li>
              <li>
                <label for="jewelery">Jewelery</label>
              </li>
            </ul>
          </details>
          <input type="text" placeholder="Search for your product.." v-model="search" />
          <i class="material-icons">search</i>
        </div>
      </div>
    </div>
  </header>




  
  <!------>
  <div class="title">
    <h2>Our Products</h2>
  </div>

  <!------>
  <div class="products-container" v-if="!search" v-show="!show">
    <div class="product-cart" v-for="product in productStore.products" :key="product.id">
      <ProductCart :product="product" />
    </div>
  </div>

  <div class="products-container" v-if="search">
    <div class="product-cart" v-for="product in productStore.searchProducts" :key="product.id">
      <ProductCart :product="product" />
    </div>
  </div>

  <div class="products-container" v-if="show">
    <div class="product-cart" v-for="product in productStore.products" :key="product.id">
      <ProductCart :product="product" />
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import ProductCart from "../components/ProductCart.vue";
import { useProducts } from "../stores/products";
import { ref, watchEffect } from "vue";
export default {
  components: {
    Navbar,
    Footer,
    Header,
    ProductCart,
    Carousel,
    Slide,
    Navigation,
  },
  setup() {
    const productStore = useProducts();
    productStore.GetProducts();

    const search = ref("")
    //search for item
    watchEffect(() => {
      productStore.SearchProducts(search.value);
      const results = useProducts().searchProducts;
    });

    //getbycatgeory
    let show = ref(false)
    const fetchBycategory = (params_c)=>{
      show.value = true
      let productStore = useProducts();
      productStore.GetByCategory(params_c)
      productStore.GetProducts();
    }
    return { productStore, search,fetchBycategory,show };
  },
};
</script>

<style scoped>
header {
  font-family: "Poppins", sans-serif;
  height: 90vh;
  background: url("../assets/heroo.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}

.intro-container {
  margin-top: 250px;
  display: block;
  color: #fff;
  padding: 50px;
  width: 100%;
  text-align: center;
  animation: animate 1s ease-in-out;

}

.intro-container > div {

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: translateX(80px);
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}

.intro-container p {
  margin: 15px 0;
  color: #ddd;
}
.intro-text{
  width: 70%;
}



/*search Bar */
.search-bar {
  padding: 5px 10px;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 10px;
  width: 90%;
  border: none;
  outline: none;
  font-size: 17px;
}

.search-bar i {
  vertical-align: middle;
  color: #000;
  font-weight: 700;
}

/**select ctgry */
details {
	position: relative;
	margin-right: 1rem;
}

details[open] {
	z-index: 1;
}

summary {
	padding: 10px;
	cursor: pointer;
	border-radius: 5px;
  border: 1px solid #ddd;
	background-color: #fff;
	list-style: none;
  color: #000;
 
  width: 150px;
  display: flex;
align-items: center;
}

summary::-webkit-details-marker {
	display: none;
}

details[open] summary:before {
	content: '';
	display: block;
	width: 100vw;
	height: 100vh;
	background: transparent;
	position: fixed;
	top: 0;
	left: 0;

}

summary:after {
	content: '';
	display: inline-block;
	width: .6rem;
	height: .6rem;
	border-bottom: 1px solid currentColor;
	border-left: 1px solid currentColor;
	border-bottom-left-radius: 2px;
	transform: rotate(45deg) translate(0%);
	transform-origin: center center;
	transition: transform ease-in-out 100ms;
  vertical-align: middle;
}

summary:focus {
	outline: none;
}

details[open] summary:after {
	transform: rotate(-45deg) translate(0%, 0%);
}

ul {
	width: 100%;
	background: #fff;
	position: absolute;
	top: calc(100% + .5rem);
	left: 0;
padding: 10px;
	margin: 0;
	box-sizing: border-box;
	border-radius: 5px;
	max-height: 200px;
	overflow-y: auto;
}

li {
	margin: 0 15px;
  padding: 1rem 0;
	border-bottom: 1px solid #ccc;
  color: #000;
}

li:first-child {
	padding-top: 0;
}

li:last-child {
	padding-bottom: 0;
	border-bottom: none;
}

/* FAKE SELECT */

summary.radios {
	counter-reset: radios;
}

summary.radios:before {
	content: var(--selection);
}

input[type=radio] {
	counter-increment: radios;
	appearance: none;
	display: none;
}

input[type=radio]:checked {
	display: inline;
	--display: block;
}

input[type=radio]:after {
	content: attr(title);
	display: inline;
	font-size: 1rem;
}

ul.list {
	counter-reset: labels;
}

label {
	width: 100%;
	display: flex;
	cursor: pointer;
	justify-content: space-between;
}

label span {
	--display: none;
	display: var(--display);
	width: 1rem;
	height: 1rem;
	border: 1px solid #727272;
	border-radius: 3px;
}

@media screen and (min-width: 900px) {
  .intro-container {
    margin-bottom: 250px;
    width: 90%;
    padding: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .intro-container > div {
    width: 65%;
  }
}
@media screen and (max-width: 810px) {
  .intro-container {
    margin-bottom: 250px;
    width: 90%;
    padding: 50px;
  }
}

@media screen and (max-width: 650px) {
  header {
    height: 70vh;
  }

  .intro-container {
    margin-top: 0;
    margin-bottom: 150px;
  }
}

@media screen and (max-width: 485px) {
  .intro-container {
    margin-bottom: 200px;
    width: 95%;
    text-align: center;
    padding: 10px;
  }
  summary {
    width: 120px;
    padding: 5px;
    font-size: 14px;
  }
  summary ul li{
    font-size: 14px;
  }
}

@media screen and (max-width: 375px) {
  .intro-container {
    margin-bottom: 180px;
    width: 100%;
    padding: 20px;
  }
}

/*products container */

.products-container {
  display: grid;
  grid-template-columns: repeat(4, 300px);
  justify-content: center;
  gap: 20px;
  margin: 50px 0;
}

.product-cart {
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0px 4px 15px 5px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  padding: 20px 0;
}



/*car */

@media screen and (max-width: 1295px) {
  .products-container {
    grid-template-columns: repeat(3, 300px);
    gap: 30px;
  }
}

@media screen and (max-width: 980px) {
  .products-container {
    grid-template-columns: repeat(2, 300px);
    gap: 50px;
  }
}

@media screen and (max-width: 660px) {
  .products-container {
    grid-template-columns: repeat(1, 300px);
    gap: 20px;
  }
}
</style>