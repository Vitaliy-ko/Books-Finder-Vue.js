<template>
  <div>
    <ul class="list-unstyled">
      <li
        class="media"
        v-for="book in books"
        :key="book.id"
      >
        <img
          :src="book.volumeInfo.imageLinks.thumbnail"
          class="d-inline mr-3"
          alt="..."
        />
        <div class="media-body">
          <h5 class="mt-0 mb-1">{{book.volumeInfo.title}}</h5>
          <p>{{book.volumeInfo.publishedDate}}</p>
          <div class>
            <p>Авторы:</p>
            <span
              v-for="(author, index) in book.volumeInfo.authors"
              :key="index"
            >{{author}}</span>
          </div>
          <add-to-cart :book="book"></add-to-cart>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import addToCart from "./AddToCart";
import {eventEmitter} from './../main';

export default {
  components: {
    addToCart
  },
  data() {
    return {};
  },
  computed: {
    books() {
      return this.$store.getters.booksData;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>