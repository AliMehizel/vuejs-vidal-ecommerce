import { defineStore } from "pinia";
import axios from 'axios'





export const useProducts = defineStore('products',{
    state: ()=>{
        return{
            products: [],
            product:[],
            searchProducts: [],
            loading:false,
            error:null
        }
    },
    actions:{
        SearchProducts(input){
            if(input !== ''){
                const result = this.products.filter(product => product.description.toLowerCase().includes(input))
            this.searchProducts = result
            }
        },
        async GetProduct(id){
            this.loading = true 
            const res = await fetch("http://127.0.0.1:8000/products/" + id);
            const data = await res.json();
            this.product = data 
            this.loading = false 

        },
        async GetProducts(){
            this.loading = true 
            const res = await fetch('http://127.0.0.1:8000/products/',);
            const data = await res.json();
            this.products = data 
            this.loading = false 

        },
        async GetByCategory(category){
            this.loading = true 
            const res = await fetch("http://127.0.0.1:8000/products/" + category);
            const data = await res.json();
            this.products = data 
            this.loading = false 
        }
    }
})