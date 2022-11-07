import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          size: newItem.size,
          quantity: 1,
        });
        state.totalPrice += newItem.price;
      } else {
        existingItem.quantity++;
        state.totalPrice += existingItem.price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
      state.totalPrice -= existingItem.price;
    },
    //when user clicks on minus or plus button in cart page this function will be called and it will update the quantity of the item in cart. If user clicks on minus button and quantity is 1 then it will remove the item from cart.
    updateCart(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity += quantity - existingItem.quantity;
      state.changed = true;
      if (quantity === 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity = quantity;
      }
      state.totalPrice +=
        (quantity - existingItem.quantity) * existingItem.price;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  updateCart,
  updateTotalQuantity,
  updateTotalAmount,
  decrementQuantity,
  incrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
