<template>
  <div class="row">
    <div class="col-8">
      <form @submit.prevent="postNewImage" class="form-inline mb-5">
        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input v-model="newImageUrl" type="text" class="form-control ml-2" placeholder="Enter the image URL" id="imageUrl" />
        </div>
        <div class="form-group">
          <label for="imageDescription">Description</label>
          <input v-model="newImageDescription" type="text" class="form-control ml-2" placeholder="Enter the image description" id="imageDescription" />
        </div>
        <p></p>
        <button type="submit" class="btn btn-primary ml-2">Post image</button>
      </form>
      <InstagramCard v-for="card in filteredCards" :key="card.url" :info="card" />
    </div>
    <div class="col-4">Sidebar</div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";
import { db, getFirestore } from "@/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

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
      newImageDescription: "",
      newImageUrl: "",
    };
  },
  methods: {
    postNewImage() {
      console.log("OK");

      const imageUrl = this.newImageUrl;
      const imageDescription = this.newImageDescription;

      // Add a new document with a generated id.
      const docRef = addDoc(collection(db, "posts"), {
        url: imageUrl,
        desc: imageDescription,
        email: store.currentUser,
        posted_at: Date.now(),
      })
        .then(() => {
          console.log("Spremljeno", doc);
          this.newImageDescription = "";
          this.newImageUrl = "";
        })
        .catch(() => {
          console.error(e);
        });
      console.log("Document written with ID: ", docRef.id);

      /*
      setDoc(doc(db, "posts", "post"), {
        url: imageUrl,
        desc: imageDescription,
        email: store.currentUser,
        posted_at: Date.now(),
      })
        .then(() => {
          console.log("Spremljeno", doc);
          this.newImageDescription = "";
          this.newImageUrl = "";
        })
        .catch(() => {
          console.error(e);
        });
*/
      /* u koju tablicu zelim spremiti

      const cityRef = doc(db, 'cities', 'BJ');
      setDoc(cityRef, { capital: true }, { merge: true });

      db.collection("posts")
        .add({
          url: imageUrl,
          desc: imageDescription,
          email: store.currentUser,
          posted_at: Date.now(),
        })
        .then(() => {
          console.log("Spremljeno", doc);
        })
        .catch(() => {
          console.error(e);
        }); */
    },
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
