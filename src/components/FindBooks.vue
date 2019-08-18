<template>
  <div>
    <form
      class="form-row d-flex justify-content-center mb-5"
      @submit.prevent="getBooksData"
    >
      <div class="form-row col-6 mb-2 px-3">
        <input
          class="form-control col-8 text-center"
          type="text"
          placeholder="Название книги"
          autofocus
          v-model="booksName"
        />
        <button
          class="btn btn-dark col-3 ml-auto"
          type="submit"
        >Найти</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      booksName: "node"
    };
  },
  methods: {
    getBooksData() {
      this.$store.dispatch("getBooksData", this.booksName);
    }
  }
};
</script>
