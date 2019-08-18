<template>
  <div class="d-flex align-items-center">
    <p
      v-if="showMessage"
      class="mb-0"
    >Ваш заказ на сумму {{totalAmountOrder}} {{currencyCode}} успешно оформлен</p>

    <p
      class="mb-0"
      v-if="numberOfBooks !== 0 && !showMessage"
    >
      <span v-if="numberOfBooks === 1">Добавлен {{numberOfBooks}} товар</span>
      <span v-if="numberOfBooks > 1 && numberOfBooks < 5">Добавлено {{numberOfBooks}} товара</span>
      <span v-if="numberOfBooks > 4">Добавлено {{numberOfBooks}} товаров</span>
      на сумму {{totalPrice | roundToTwo}} {{currencyCode}}
    </p>
  </div>
</template>

<script>
import { eventEmitter } from "./../main";
import roundToTwo from "./filters/roundToTwo";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      numberOfBooks: 0,
      totalPrice: 0,
      currencyCode: "UAH",
      totalAmountOrder: 0,
      showMessage: false
    };
  },
  computed: {
    customersOrders() {
      return this.$store.getters.customersOrders;
    },
  },
  filters: {
    roundToTwo
  },
  created() {
    eventEmitter.$on("cartListUpdated", customerPhoneNumber => {
      this.numberOfBooks = 0;
      this.totalPrice = 0;
      for (let key in this.customersOrders) {
        this.numberOfBooks += this.customersOrders[key].cart.length;
        this.totalPrice += this.customersOrders[key].totalAmount;
      }
    });
    eventEmitter.$on("madeOrder", customerPhoneNumber => {
      this.totalAmountOrder = this.$store.getters.customersOrders[
        customerPhoneNumber
      ].totalAmount;
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 15000);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>