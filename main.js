Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: `
    <div class="product">
    <div class="product-image">
        <img v-bind:src="image" alt="">
    </div>  
    
    <div class="product-info">

        <h1> {{ title }} </h1>
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{outOfStock: !inStock}">Out of Stock</p>
        <p>{{ sale }}</p>

        <p>Shipping: {{ shipping }}</p>

        <product-details :details="details"></product-details>

        <ul>
            <li v-for="size in sizes">{{ size }}</li>
        </ul>

         <div v-for="(variant, index) in variants" 
              :key="variant.variantId"
              class="color-box"
              :style=" {backgroundColor: variant.variantColor} "
              @mouseover="updateProduct(index)"
              >
            
         </div>
         
         <button v-on:click="addToCart" 
                 :disabled="!inStock"
                 :class="{ disabledButton: !inStock }"
                 >Add to Cart</button>
         <button v-on:click="removeFromCart"
                 :disabled="cart <= 0"
                 :class="{ disabledButton: cart <= 0 }">Remove</button>

         <div class="cart">
             <p>Cart({{cart}})</p>
         </div> 

    </div>

</div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,       
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [{
                variantId: 2234,
                variantColor: 'green',
                variantImage: 'green-socks.jpg',
                variantQuantity: 10
            },{
                variantId: 2235,
                variantColor: 'blue',
                variantImage: 'blue-socks.jpg',
                variantQuantity: 0
            }],
            sizes: ['XS','S','M','L','XL','XXL','XXXL'],
            cart: 0,
            onSale: true,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        removeFromCart() {
            if (this.cart > 0) {
                this.cart--;
            }
        }
    },
    computed: {
        title() {
            return `${this.brand} ${this.product}`;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale() {
            return `${this.brand} ${this.product} are ${this.onSale ? '' : 'not'} on sale`;
        },
        shipping() {
            return this.premium ? 'Free' : 2.99;
        }
    },

});


Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
});


let app = new Vue({
    el: '#app',
    data: {
        premium: true,
    }
})