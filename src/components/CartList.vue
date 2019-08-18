<template>
  <div>
    <ul class="list-unstyled">
      <li
        class="listItem media d-flex flex-column mb-4"
        v-for="(orderData, phoneNumber) in cartData"
        :key="phoneNumber"
      >
        <div class="d-flex col-12 justify-content-between align-items-baseline p-0 pb-2">
          <p class="mb-0 font-weight-bold">Заказ оформлен с телефона: {{phoneNumber}}</p>
          <button
            class="btn btn-dark px-5"
            type="button"
            @click="makeOrder(phoneNumber)"
          >Заказать</button>
        </div>
        <ul class="list-unstyled">
          <li
            v-for="(book, index) in orderData.cart"
            :key="index"
            class="listItem-cart listItem-cart--border-bottom d-flex align-items-center py-2"
            :class="{'listItem-cart--border-top': index === 0}"
          >
            <div class="media-body">
              <img
                :src="book.volumeInfo.imageLinks.thumbnail"
                class="d-inline float-left shadow-lg mr-3"
                alt="Изображение книги"
              />
              <h5 class="mt-0 mb-1">{{book.volumeInfo.title}}</h5>
              <p class="mb-0">{{book.volumeInfo.description}}</p>
            </div>
            <p class="alert alert-warning ml-2">
              Цена:
              <br />
              {{book.saleInfo.retailPrice.amount}} UAH
            </p>
          </li>
        </ul>
        <p
          class="ml-auto alert alert-warning mb-0 text-right font-weight-bold"
        >Сумма итого: {{totalAmount(phoneNumber) | roundToTwo}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import roundToTwo from "./filters/roundToTwo";

export default {
  methods: {
    makeOrder(phoneNumber) {
      this.$store.dispatch("makeOrder", phoneNumber);
      this.$router.push("/");
    },
    totalAmount(phoneNumber) {
      if(this.cartData[phoneNumber].totalAmount !== undefined) {
        return this.cartData[phoneNumber].totalAmount;
      }
    }
  },
  computed: {
    cartData() {
      return this.$store.getters.customersOrders;
    }
  },
  filters: {
    roundToTwo
  }
};
</script>

<style lang="scss" scoped>
.listItem-cart--border-bottom {
  border-bottom: 1px solid #ffc107;
}
.listItem-cart--border-top {
  border-top: 1px solid #ffc107;
}
</style>