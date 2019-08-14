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
          <add-to-cart></add-to-cart>
        </div>
        <button
          class="btn d-none"
          data-target="#addToCart"
          data-toggle="modal"
          type="button"
          ref="addToCardModal"
        >Заказать</button>

        <div
          class="modal fade"
          id="addToCart"
          role="dialog"
          aria-hidden="true"
          tabindex="-1"
        >
          <div
            class="modal-dialog"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5
                  class="modal-title"
                  id="exampleModalLabel"
                >{{book.volumeInfo.title}}</h5>
                <button
                  class="close"
                  data-dismiss="modal"
                  type="button"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body d-flex flex-column">
                <div>
                  <img
                    class="float-left mr-3"
                    alt="Изображение книги"
                    :src="book.volumeInfo.imageLinks.thumbnail"
                  />
                  <p>{{book.volumeInfo.description}}</p>
                </div>
                <form @submit.prevent="submit">
                  <div class="form-group">
                    <label
                      class="col-form-label"
                      for="name"
                    >Имя:</label>
                    <input
                      class="form-control"
                      id="name"
                      type="text"
                      v-model.trim="inputData.name"
                      :class="{'is-invalid': $v.inputData.name.$error, 'is-valid': !$v.inputData.name.$invalid}"
                    />
                    <div
                      class="invalid-feedback"
                      v-if="!$v.inputData.name.required"
                    >Поле обязательно для заполнения</div>
                    <div
                      class="invalid-feedback"
                      v-if="!$v.inputData.name.minLength"
                    >Имя должно состоять как минимум из {{$v.inputData.name.$params.minLength.min}} букв</div>
                  </div>
                  <div class="form-group">
                    <label
                      class="col-form-label"
                      for="email"
                    >Email:</label>
                    <input
                      class="form-control"
                      id="email"
                      type="email"
                      v-model="inputData.email"
                      :class="{'is-invalid': $v.inputData.email.$error, 'is-valid': !$v.inputData.email.$invalid}"
                    />
                    <div
                      class="invalid-feedback"
                      v-if="!$v.inputData.email.required"
                    >Поле обязательно для заполнения</div>
                    <div
                      class="invalid-feedback"
                      v-if="!$v.inputData.email.email"
                    >Данный email не существует</div>
                  </div>
                  <div class="form-group">
                    <label
                      class="col-form-label"
                      for="phoneNumber"
                    >Номер телефона:</label>
                    <the-mask
                      class="form-control"
                      id="phoneNumber"
                      type="tel"
                      v-model="inputData.phoneNumber"
                      :masked="true"
                      :mask="['+38 (0##) ##-##-###']"
                      :class="{'is-invalid': $v.inputData.phoneNumber.$error, 'is-valid': !$v.inputData.phoneNumber.$invalid}"
                    >
                      <div
                        class="invalid-feedback"
                        v-if="!$v.inputData.phoneNumber.required"
                      >Поле обязательно для заполнения</div>
                      <div
                        class="invalid-feedback"
                        v-else-if="!$v.inputData.phoneNumber.minLength || !$v.inputData.phoneNumber.maxLength"
                      >Данный номер телефона не существует</div>
                    </the-mask>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="addToCard"
                >Отправить</button>
              </div>
            </div>
          </div>
        </div>
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
      inputData: {
        name: "",
        email: "",
        phoneNumber: "+380"
      }
    };
  },
  validations: {
    inputData: {
      name: {
        minLength: minLength(2),
        required
      },
      email: {
        email,
        required
      },
      phoneNumber: {
        minLength: minLength(19),
        maxLength: maxLength(19),
        required
      }
    }
  },
  computed: {
    openModal(book) {
      eventEmitter.$emit("showModal", book);
    },
    books() {
      return this.$store.getters.booksData;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>