<template>
  <Navbar />
  <!---you can add product/men's/shoes -->

  <div class="product-details-container">
    <div class="product-details">
      <div class="details-img">
        <img :src="'https://vidaldz.com'+product.product.image" :alt="product.product.name" />
      </div>
      <div class="details-content">
        <h1>{{product.product.name}}</h1>
        <p>{{product.product.description}}</p>
        <strong>{{product.product.price}}$</strong>

        <div class="search-option">
          <label for="option">Color : </label>
          <select id="option" v-model="color" required>
            <option disabled value="">Select a color</option>
            <option value="WHITE">WHITE</option>
            <option value="BLACK">BLACK</option>
            <option value="GRAY">GRAY</option>
          </select>
        </div>

        <div class="search-option">
          <label for="option" >Size : </label>
          <select id="option" v-model="size" required>
            <option disabled value="">Select a size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="2XL">2XL</option>
            <option value="3XL">3XL</option>
            <option disabled value="">SHOES</option>
            <option value="EU 39">EU 39</option>
            <option value="EU 40">EU 40</option>
            <option value="EU 41">EU 41</option>
            <option value="EU 42">EU 42</option>
            <option value="EU 43">EU 43</option>
            <option value="EU 44">EU 44</option>
          </select>
        </div>

        <button @click="addProduct"><i class="material-icons">shopping_cart</i>Add to cart</button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import {useRoute} from 'vue-router'
import { onMounted, ref } from 'vue';
import { useProducts } from '../stores/products';
import { useCarts } from '../stores/carts';
export default {
  components: { Navbar, Footer },
  setup(){
    const route = useRoute().params.id
    const product = useProducts()
    product.GetProduct(route)
    const color = ref('')
    const size = ref('')
    const cartStore = useCarts()
    cartStore.GetCarts()
    const addProduct = ()=>{
      if(color.value === '' || size.value === ''){
        alert('Please, choose color and size')
      }else{
        cartStore.addToCart({
        'name': product.product.name,
        'size': size.value,
        'color': color.value
      })
      }
    }
   return {product,color,size,addProduct}
  }
};
</script>

<style scoped>

.product-details-container{
  width: 100%;
  margin: 100px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-details{
    padding: 20px;
  width: 90%;
  height: 60vh;
  display: grid;
  grid-template-columns: 420px 1fr 1fr;
  grid-template-rows: 420px;
  gap: 30px;
}


.details-content{
  grid-column: 2 / span 3;
}

.details-img{
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
  text-align: center;
}
.details-img img{
  width: 400px;
  height: 400px;
}

.search-option{
padding: 5px 0;
}
label {
  font-family: "Poppins", sans-serif;
  color: #000;
}
select {
  font-size: 16px;
  border-radius: 4px;
  padding: 5px;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  width: 150px;
  cursor: pointer;
}


button{
  border: none;
  border-radius: 4px;
  background: #2e5266ff;
  color: #fff;
width: 150px;
  font-size: 18px;
  cursor: pointer;
}

button i{
  vertical-align: middle;
  margin: 7px;
}
input{text-align: center;}
@media screen and (max-width :875px) {
  .details-content h1{
    font-size:1.2em;
  }

  .details-content p{
    font-size: 0.7em;
  }
  label {
  font-size: 0.7em;
}
select {
  border-radius: 4px;
  padding: 5px;
}
button{
  width: 120px;
  cursor: pointer;
}
button,button i{
  font-size: 1em;
}
}


@media screen and (max-width :738px) {
  .product-details{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

}

@media screen and (max-width :498px) {
  .details-img img{
  width: 300px;
  height: 300px;
}


}

@media screen and (max-width :385px) {
  .details-img img{
  width: 220px;
  height: 220px;
}


}
</style>