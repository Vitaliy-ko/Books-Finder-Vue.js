<template>
  <div>
    <p
    class="error-title text-center"
      v-if="isBookFindError && books.length === 0"
    >По Вашему запросу ничего не найдено</p>
    <ul class="list-unstyled">
      <li
        class="listItem media mb-4"
        v-for="(book, bookIndex) in books"
        :key="book.id"
      >
        <img
          class="d-inline shadow-lg"
          alt="Изображение книги"
          :src="book.volumeInfo.imageLinks.thumbnail"
        />
        <div class="media-body ml-3">
          <div>
            <h5 class="mt-0 mb-3">{{book.volumeInfo.title}}</h5>
            <p
              v-if="book.volumeInfo.publishedDate"
            >Дата выпуска:&nbsp;{{book.volumeInfo.publishedDate | formatDate}}</p>
            <p v-else>Информация о дате выпуска отсутствует</p>
            <div>
              <ul class="list-unstyled list-group-horizontal">
                <span v-if="book.volumeInfo.authors === undefined">Информация об авторах отсутствует</span>
                <span v-else-if="book.volumeInfo.authors.length === 1">Автор:&nbsp;</span>
                <span v-else>Авторы:&nbsp;</span>
                <li
                  class="d-inline"
                  v-for="(author, index) in book.volumeInfo.authors"
                  :key="index"
                >
                  <span v-if="index === book.volumeInfo.authors.length-1">{{author}}</span>
                  <span v-else>{{author}},&nbsp;</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <add-to-cart
          class="m-3 h-100"
          :bookIndex="bookIndex"
        ></add-to-cart>
      </li>
    </ul>
  </div>
</template>

<script>
import addToCart from "./AddToCart";
import { eventEmitter } from "./../main";

export default {
  components: {
    addToCart
  },
  data() {
    return {
      isBookFindError: false
    };
  },
  computed: {
    books() {
      return this.$store.getters.booksData;
    }
  },
  filters: {
    formatDate: function(date) {
      return date
        .split("-")
        .reverse()
        .join(".");
    }
  },
  created() {
    eventEmitter.$on("bookFindError", () => {
      this.isBookFindError = true;
    });
  }
};
</script>

<style lang="scss" scoped>
.error-title {
  font-size: 1.5rem;
}
</style>