import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetails from '../views/ProductDetails.vue'
import CartItems from '../views/CartItems.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import ShippingAddress from '../views/ShippingAddress.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/:id',
      name: 'ProductDetails',
      component: ProductDetails
    },{
      path: '/cart-items',
      name: 'CartItems',
      component: CartItems
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,

    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,

    },
    {
      path: '/shipping',
      name: 'Shipping',
      component: ShippingAddress,

    },
  
  ]
})

export default router
