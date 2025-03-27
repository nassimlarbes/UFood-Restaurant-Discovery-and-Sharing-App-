<template>
  <div class="restaurant-container">
    <div class="restaurant-header">
      <h1>{{ restaurant.name }}</h1>
      <div class="restaurant-info">
        <button v-if="Usersession.loggedIn" @click="addToFavorites" class="favorite-button">
          {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
        </button>
        <p><i class="fas fa-map-marker-alt"></i> Address: {{ restaurant.address }}</p>
        <p><i class="fas fa-phone"></i> Phone number: {{ restaurant.tel }}</p>
        <p><i class="fas fa-clock"></i> Business hours: {{ restaurant.opening_hours }}</p>
        <p><i class="fas fa-utensils"></i> Genre: {{ restaurant.genres }}</p>
        <p><i class="fas fa-wallet"></i> Price range: {{ restaurant.price_range }}</p>
        <p><i class="fas fa-star"></i> Rating: {{ restaurant.rating }}</p>
        <button v-if="Usersession.loggedIn" @click="() => { updateStore(restaurant.name, restaurant.id); ToggleModalVisite('buttonTrigger') }">Open Popup</button>
      </div>
    </div>
    <div class="restaurant-media">
      <h2>Photo(s) of the restaurant</h2>
      <div v-if="restaurant.pictures && restaurant.pictures.length > 0">
        <img class="restaurant-image" v-for="(picture, index) in restaurant.pictures" :key="index" :src="picture" :alt="'Photo ' + (index + 1) + ' of the restaurant'">
      </div>
      <div v-else>
        <p>No photos available</p>
      </div>
      <button id='getDirections' @click="getDirections" class="directions-button">Get Directions</button>
      <div id='map' class="map-container"></div>
    </div>
  </div>
</template>


<script>
import Usersession from "@/components/Usersession";
import { store } from "@/store.js";
import {inject} from "vue";
import axios from 'axios';
import L from 'leaflet';
import 'leaflet-routing-machine';


export default {
  data() {
    return {
      Usersession: Usersession,
      restaurant: {
        id: '',
        name: '',
        address: '',
        tel: '',
        opening_hours: '',
        genres: '',
        price_range: '',
        rating: '',
        pictures: [],
        location: []
      },
      map: null,
    };
  },

  methods: {
    async verifierRestaurantSelectionne() {
      try {
        let selectedId = localStorage.getItem('selected');
        console.log(selectedId)
        if (selectedId === null) {
          console.log("NAHHHH")
          selectedId = "5f31fc6155d7790550c08afe";
        }
        const response = await axios.get(`https://ufoodapi.herokuapp.com/unsecure/restaurants/${selectedId}`);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération du restaurant sélectionné:", error);
        return null;
      }
    },

    async addToFavorites() {
      try {
        const response = await axios.post(`https://ufoodapi.herokuapp.com/favorites`, {
          restaurantId: this.restaurant.id
        });
        console.log('Restaurant added to favorites:', response.data);
        // Mettez à jour l'état pour indiquer que le restaurant est maintenant favori
        this.isFavorite = true;
      } catch (error) {
        console.error('Error adding restaurant to favorites:', error);
        // Gérer les erreurs ici
      }
    },

    async getDirections() {
      try {
        const location = await this.getCurrentLocation();
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    },

    async updateStore(name, id) {
      // Update properties in the store
      store.ActiveRestaurantName = name;
      store.ActiveRestaurantId = id;
    },

    async updateSelectedRestaurant() {
      let restaurantSelectionne = await this.verifierRestaurantSelectionne();
      if (restaurantSelectionne) {
        this.restaurant = {
          id: restaurantSelectionne.id,
          name: restaurantSelectionne.name,
          address: restaurantSelectionne.address,
          tel: restaurantSelectionne.tel,
          opening_hours: restaurantSelectionne.opening_hours,
          genres: restaurantSelectionne.genres.join(', '), // Assuming genres is an array
          price_range: restaurantSelectionne.price_range,
          rating: restaurantSelectionne.rating,
          pictures: restaurantSelectionne.pictures, // Assuming pictures is an array of URLs
          location: restaurantSelectionne.location.coordinates
        };
      }
    },

    getCurrentLocation() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              resolve({latitude, longitude});
              let source = L.latLng(latitude, longitude);
              let destination = L.latLng(this.restaurant.location[1], this.restaurant.location[0]);
              L.marker(source).addTo(this.map);
              L.marker(destination).addTo(this.map);

              L.Routing.control({
                waypoints: [source, destination],
                routeWhileDragging: true,
                router: new L.Routing.OSRMv1({
                  serviceUrl: 'https://router.project-osrm.org/route/v1'
                })
              }).addTo(this.map);
            },
            error => {
              reject(error);
            }
          );
        }
      });
    }
  },

  mounted() {
    this.updateSelectedRestaurant();
    window.localStorage.clear();
    this.map = L.map('map').setView([46.8112, -71.2106], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  },

  created() {
    this.updateSelectedRestaurant();
  },

  beforeDestroy() {
    window.removeEventListener('storage', this.updateSelectedRestaurant);
  },

  setup() {
    const ToggleModalVisite = inject('ToggleModalVisite');
    return {
      ToggleModalVisite
    };
  }
};
</script>

<style>
.restaurant-image{
  max-height: 150px;
}

@media (max-width: 768px) {
  .container {
    padding-left: 20px;
  }
}

@media (max-width: 576px) {
  .container {
    padding-left: 20px;
  }
}
.map-container {
  width: 50%;
  height: 400px;
}
</style>
