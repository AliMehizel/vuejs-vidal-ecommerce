<template>
  <div>
    <div class="cart-img">
        <img :src="'https://vidaldz.com/'+ product.image" :alt="product.name">
    </div>
    <div class="cart-content">
        <h3><router-link :to="{name: 'ProductDetails', params : {id: product.id}}">{{product.name}}</router-link></h3>
        <p>{{product.description.substring(0,20) + '...'}}</p>
        <strong>{{ product.price }}$</strong>
    </div>
  </div>
</template>

<script>
export default {
    props:['product']

}
</script>

<style >

h3 a{
    color: #000;
}
p{
    color: #555252;
}
strong{
    color: rgb(34, 69, 88);
}
.cart-img img{
    width: 280px;
    height: 280px;
}
</style>