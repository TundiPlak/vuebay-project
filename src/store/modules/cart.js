export default {
    state(){
        return {
            items: [], 
            total: 0, 
            qty: 0 ,
        };
    },
    mutations: {
        addProductToCart(state, payload) {
            const productData = payload.product;
            const productInCartIndex = state.items.findIndex( //this.cart.items changes to state.items everywhere
              (ci) => ci.productId === productData.id
            );
      
            if (productInCartIndex >= 0) {
              state.items[productInCartIndex].qty++;
            } else {
              const newItem = {
                productId: productData.id,
                title: productData.title,
                image: productData.image,
                price: productData.price,
                qty: 1,
              };
              state.items.push(newItem);
            }
            state.qty++;
            state.total += productData.price;
          },
          removeProductFromCart(state, payload) {
              const prodId = payload.productId;
            const productInCartIndex = state.items.findIndex(
              (cartItem) => cartItem.productId === prodId
            );
            const selectedProd = state.items[productInCartIndex];
            state.items.splice(productInCartIndex, 1);
            state.qty -= selectedProd.qty;
            state.total -= selectedProd.price * selectedProd.qty;
          },
    },
    actions: {
        addToCart(context, payload){
            context.commit('addProductToCart', payload);
        },
        removeFromCart(context,payload){
            context.commit('removeProductFromCart', payload);
        }
    },
    getters: {
        products(state) {
            return state.items;
        },
        totalSum(state) {
            return state.total;
        },
        quantity(state) {
            return state.qty;
        }
    }
}
