<template>
  <div class="row">
    <div class="col-8">
      <InstagramCard v-for="card in filteredCards" :key="card" :info="card" />
    </div>
    <div class="col-4"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";

let cards = [];

cards = [
  { url: "https://picsum.photos/id/1/800", description: "laptop", time: "few minutes ago..." },
  { url: "https://picsum.photos/id/2/800", description: "laptop 2", time: "an hour ago..." },
  { url: "https://picsum.photos/id/3/800", description: "laptop 3", time: "few hours ago..." },
];

export default {
  name: "home",
  data: function () {
    return {
      cards,
      store,
    };
  },
  computed: {
    filteredCards() {
      // logika koja filtrira cards
      let termin = this.store.searchTerm;

      // vraca samo one kartice koje imaju "termin" tj. true je
      return cards.filter((card) => card.description.includes(termin));
    },
  },
  components: {
    InstagramCard,
  },
};
</script>

<style scoped></style>
