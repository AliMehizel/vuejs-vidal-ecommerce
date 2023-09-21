import { defineStore } from "pinia";





export const useCarts = defineStore('carts', {
    state: () => {
        return {
            carts: [],
            loading: false,
            error: null
        }
    },

    getters: {
        TotalProducts() {
            var sum = 0
            this.carts.forEach(cart => {

                sum += cart.get_total


            })

            return sum
        },
        getLength(){
            return this.carts.length
        }
    },
 
    actions: {
        async GetCarts() {
            this.loading = true
            const res = await fetch('http://127.0.0.1:8000/carts/')
            const data = await res.json()
            this.carts = data
            this.loading = false
        },
        async addToCart(data) {
            const { name, color, size } = data
            try {
                const res = await fetch('http://127.0.0.1:8000/add-to-cart/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'name': name,
                        'size': size,
                        'color': color
                    })
                });

                if (res.ok) {
                    const data = await res.json()
                    this.carts.push(data)
                    console.log('POST request successful:', data);

                } else {
                    throw new Error('Network response was not ok.');
                }

            } catch (error) {
                console.error('Error during POST request:', error.message);
            }
        },
        async updateCart(data) {
            const { action, name, id } = data
            try {
                const res = await fetch('http://127.0.0.1:8000/update-qte/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'name': name,
                        'action': action
                    })
                });

                if (res.ok) {
                
                    const data = await res.json()
                    const carts = this.carts.filter(cart => cart.id != id)
                    //this.carts = [...carts, data]

                } else {
                    throw new Error('Network response was not ok.');
                }

            } catch (error) {
                console.error('Error during POST request:', error.message);
            }
        },
        async deletFromCart(data) {
            const { id } = data
            try {
                const res = await fetch(`http://127.0.0.1:8000/delete/${id}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    console.log('succes')
                    const carts = this.carts.filter(cart => cart.id != id)
                    this.carts = carts
                }
                else {
                    throw new Error('Network response was not ok.');
                }


            } catch (error) {
                console.error('Error during DELETE request:', error.message);
            }
        }
    }

})