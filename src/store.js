import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: [],
    cart: [],
  },
  mutations: {
    setBooksData(state, payload) {
      state.books = [];
      state.books.push(...payload.items);
    },
  },
  actions: {
    getBooksData({ commit }, booksName) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${booksName}`)
        .then(response => response.json())
        .then(json => commit("setBooksData", json));
    }

  },
  getters: {
    booksData: state => {
      return state.books
    }
  }
});
