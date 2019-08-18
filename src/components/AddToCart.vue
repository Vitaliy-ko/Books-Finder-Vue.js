<template>
  <div>
    <button
      data-toggle="modal"
      :data-target="'#addToCart'+bookIndex"
      class="btn btn-dark btn--large"
      type="button"
      v-if="book.saleInfo.isEbook"
    >Заказать</button>
    <p
      v-else
      class="d-flex align-items-center alert alert-danger alert--large mb-0"
    >
      <span>Нет в наличии</span>
    </p>

    <div
      class="modal fade"
      :id="'addToCart'+bookIndex"
      ref="addToCartModal"
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
                  type="text"
                  id="name"
                  v-model.trim="inputData.name"
                  :class="{'is-invalid': $v.inputData.name.$error, 'is-valid': !$v.inputData.name.$invalid}"
                />
                <div
                  class="invalid-feedback"
                  v-if="!$v.inputData.name.alpha"
                >Введены не допустимые символы</div>
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
                  type="email"
                  id="email"
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
                  type="tel"
                  id="phoneNumber"
                  v-model="inputData.phoneNumber"
                  :masked="true"
                  :mask="['+38 (0##) ##-##-###']"
                  :class="{'is-invalid': $v.inputData.phoneNumber.$error, 'is-valid': !$v.inputData.phoneNumber.$invalid}"
                />
                <div
                  class="invalid-feedback"
                  v-if="!$v.inputData.phoneNumber.required"
                >Поле обязательно для заполнения</div>
                <div
                  class="invalid-feedback"
                  v-else-if="!$v.inputData.phoneNumber.minLength || !$v.inputData.phoneNumber.maxLength"
                >Данный номер телефона не существует</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-dark"
              type="button"
              @click="addToCard"
            >Отправить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TheMask } from "vue-the-mask";
import { helpers } from 'vuelidate/lib/validators'
import JQuery from "jquery";
import {
  required,
  minLength,
  maxLength,
  email,
  alpha
} from "vuelidate/lib/validators";

export default {
  comments: [TheMask],
  props: ["bookIndex"],
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
        alpha: helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ -]*$/),
        required,
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
    book() {
      return this.$store.getters.booksData[this.bookIndex];
    }
  },
  methods: {
    validationRun(input) {
      this.$v.inputData[input].$touch();
    },
    addToCard() {
      for (let input in this.$data.inputData) {
        this.validationRun(input);
      }
      if (!this.$v.inputData.$error) {
        let bookOrder = {
          customerInfo: this.inputData,
          book: this.book,
          bookAmount: this.book.saleInfo.retailPrice.amount
        };
        this.$store.dispatch("addBookToCard", bookOrder);
        this.closeModalWindow();
      }
    },
    closeModalWindow() {
      JQuery("#addToCart" + this.bookIndex).modal("hide");
    }
  }
};
</script>
<style lang="scss" scoped>
.btn--large,
.alert--large {
  display: block;
  min-width: 145px;
  min-height: 145px;
}
</style>