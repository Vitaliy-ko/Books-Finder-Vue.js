<template>
  <div>
    <cart-list></cart-list>
  </div>
</template>

<script>
import cartList from "./../components/CartList";

export default {
  name: "home",
  components: {
    cartList
  }
};
</script>