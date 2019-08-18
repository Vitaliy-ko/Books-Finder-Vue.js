import Vue from "vue";
import Vuex from "vuex";
import { eventEmitter } from "./main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    customers: {
      // phoneNumber: {
      //   customerInfo:{
      //     email,
      //     name,
      //     phoneNumber
      //   },
      //   cart: [],
      //   totalAmount: ''
      // }
    }
  },
  mutations: {
    setBooksData(state, booksData) {
      state.books = [];
      state.books.push(...booksData.items);
    },
    addBookToCard(state, bookOrder) {
      const phoneNumber = bookOrder.customerInfo.phoneNumber;
      if (!state.customers[phoneNumber]) {
        state.customers[phoneNumber] = {};
      }
      state.customers[phoneNumber].customerInfo =
        bookOrder.customerInfo;

      if (!state.customers[phoneNumber].cart) {
        state.customers[phoneNumber].cart = [];
      }
      state.customers[phoneNumber].cart.push(
        bookOrder.book
      );

      if (!state.customers[phoneNumber].totalAmount) {
        state.customers[phoneNumber].totalAmount =
          bookOrder.bookAmount;
      } else {
        state.customers[phoneNumber].totalAmount +=
          bookOrder.bookAmount;
      }
    },
    removeCustomerData(state, phoneNumber) {
      let isRemoved = delete state.customers[phoneNumber];
      if (isRemoved) {
      }
    }
  },
  actions: {
    getBooksData({ commit }, booksName) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${booksName}`)
        .then(response => {
          console.dir(response);
          return response.json()})
        .then(json => commit("setBooksData", json))
        .catch(() => {
          eventEmitter.$emit("bookFindError")
        })
    },
    addBookToCard({ commit }, bookOrder) {
      commit("addBookToCard", bookOrder);
      eventEmitter.$emit("cartListUpdated", bookOrder.customerInfo.phoneNumber);
    },
    makeOrder({ commit }, phoneNumber) {
      eventEmitter.$emit("madeOrder", phoneNumber);
      commit("removeCustomerData", phoneNumber);
      eventEmitter.$emit("cartListUpdated", phoneNumber);
    }
  },
  getters: {
    booksData: state => {
      return state.books;
    },
    customersOrders: state => {
      return state.customers;
    }
  }
});
