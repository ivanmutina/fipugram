<template>
  <div class="row">
    <div class="col-8">
      <InstagramCard v-for="card in cards" :key="card" :info="card" />
    </div>
    <div class="col-4"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";

let cards = [];

cards = ["https://picsum.photos/id/1/800", "https://picsum.photos/id/2/800", "https://picsum.photos/id/3/800", "https://picsum.photos/id/4/800"];

export default {
  name: "home",
  data: function () {
    return {
      cards: cards,
    };
  },
  components: {
    InstagramCard,
  },
};
</script>

<style scoped></style>
