<template>
  <div class="row">
    <div class="col-8">
      <form @submit.prevent="postNewImage" class="form-inline mb-5">
        <div class="form-group">
          <label for="imageUrl">Image description</label>
          <input v-model="newImageDescription" type="text" class="form-control ml-2" placeholder="Enter the image description" id="imageDescription" />
          <p></p>
        </div>
        <div class="form-group">
          <croppa :width="400" :height="400" placeholder="Učitaj sliku..." v-model="imageReference"></croppa>
        </div>
        <p></p>
        <button type="submit" class="btn btn-primary ml-2">Post image</button>
      </form>
      <InstagramCard v-for="card in filteredCards" :key="card.id" :info="card" />
    </div>
    <div class="col-4">Sidebar</div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";
import store from "@/store";
import { initializeApp, db, getFirestore, getStorage, ref, uploadBytes, getDownloadURL } from "@/firebase.js";
import { doc, collection, addDoc, getDocs, orderBy, query, limit } from "firebase/firestore";

/*
cards = [
  { url: "https://picsum.photos/id/1/800", description: "laptop", time: "few minutes ago..." },
  { url: "https://picsum.photos/id/2/800", description: "laptop 2", time: "an hour ago..." },
  { url: "https://picsum.photos/id/3/800", description: "laptop 3", time: "few hours ago..." },
];
*/

export default {
  name: "home",
  data: function () {
    return {
      store,
      cards: [],
      newImageDescription: "",
      newImageUrl: "",
      imageReference: null,
    };
  },
  // javlja se kad nesto treba prikazat
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      console.log("Firebase dohvat...");

      // referenciram se na collection
      const docRef = collection(db, "posts");

      // prikazivanje svakog dijela collectiona (query je kao neki kursor)
      getDocs(query(docRef, orderBy("posted_at", "desc"), limit(10))).then((query) => {
        this.cards = []; // isprazni kartice
        query.forEach((doc) => {
          orderBy("posted_at", "desc"), limit(10);

          // da ne pozivamo data tri puta jer su ostali podaci u data, ne id
          const data = doc.data();

          this.cards.push({
            id: doc.id,
            time: data.posted_at,
            description: data.desc,
            url: data.url,
          });
        });
      });
    },
    // poziva se kada kliknemo send
    postNewImage() {
      console.log("OK");

      // pretvaranje bytova u pravu sliku
      this.imageReference.generateBlob((blobData) => {
        console.log(blobData);

        // putanja + ime korisnika + "/" + ime slike
        let imageName = "posts/" + store.currentUser + "/" + Date.now() + ".png";

        const storage = getStorage();
        const storageRef = ref(storage, imageName);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, blobData)
          .then((result) => {
            // uspjesno spremanje i dobijanje URL-a slike
            getDownloadURL(storageRef)
              .then((url) => {
                console.log("Javni url: ", url);

                const imageDescription = this.newImageDescription;

                // Add a new document with a generated id.
                const docRef = addDoc(collection(db, "posts"), {
                  url: url,
                  desc: imageDescription,
                  email: store.currentUser,
                  posted_at: Date.now(),
                })
                  .then(() => {
                    console.log("Spremljeno", doc);
                    this.newImageDescription = "";
                    this.imageReference.remove(); // makne kad uploadamo

                    this.getPosts();
                  })
                  .catch(() => {
                    console.error(e);
                  });
                console.log("Document written with ID: ", docRef.id);
              })
              .catch((e) => {
                console.error(e);
              });
          })
          .catch((e) => {
            console.error(e);
          });
      });
    },
  },
  computed: {
    filteredCards() {
      // logika koja filtrira cards
      let termin = this.store.searchTerm;

      // vraca samo one kartice koje imaju "termin" tj. true je
      return this.cards.filter((card) => card.description.includes(termin));
    },
  },
  components: {
    InstagramCard,
  },
};
</script>

<style scoped></style>
