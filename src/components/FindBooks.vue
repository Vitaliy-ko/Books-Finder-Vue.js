<template>
  <div>
    <form
      class="form-inline"
      @submit.prevent="getBooksData"
    >
      <div class="form-group mx-sm-3 mb-2">
        <input
          class="form-control mr-2"
          type="text"
          placeholder="Название книги"
          autofocus
          v-model="$v.booksName.$model"
          :class="{'is-invalid': $v.booksName.$error}"
        />
        <button
          class="btn btn-primary"
          type="submit"
          :disabled="$v.booksName.$invalid"
        >Найти</button>
        <div
          class="invalid-feedback"
          v-if="!$v.booksName.required"
        >Поле обязательно для заполнения</div>
        <div
          class="invalid-feedback"
          v-if="!$v.booksName.minLength"
        >Имя должно состоять как минимум из {{$v.booksName.$params.minLength.min}} букв</div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      booksName: ""
    };
  },
  methods: {
    getBooksData() {
      this.$store.dispatch("getBooksData", this.booksName);
    }
  },
  validations: {
    booksName: {
      minLength: minLength(2),
      required
    }
  }
};
</script>

<style lang="scss" scoped>
</style>