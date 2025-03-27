<template>

  <div class="margin-container container">

    <!-- Image de fond -->
    <div class="app-background">

      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src="..\assets\ufood.png" alt="Logo" width="50" height="50" class="logo">
            <span class="brand-name">Ufood</span>
          </a>
        </div>
      </nav>

    <!-- Barre de recherche -->
    <div class="mb-3" id="square">
      <input type="text" class="form-control" placeholder="Search a restaurant..." v-model="searchTerm" @input="filterRestaurants">
    </div>

    <!-- Filtres -->
    <div class="filters row mb-3">
      <div class="col">
        <label for="priceMinSelect" class="form-label">Minimum price</label>
        <select id="priceMinSelect" class="form-select" v-model="selectedPriceMin" @change="filterRestaurants">
          <option value="0">0$</option>
          <option value="10">10$</option>
          <option value="20">20$</option>
          <option value="30">30$</option>
          <option value="40">40$</option>
        </select>
      </div>
      <div class="col">
        <label for="priceMaxSelect" class="form-label">Maximum price</label>
        <select id="priceMaxSelect" class="form-select" v-model="selectedPriceMax" @change="filterRestaurants">
          <option value="">No maximum</option>
          <option value="20">20$</option>
          <option value="30">30$</option>
          <option value="40">40$</option>
          <option value="50">50$</option>
          <option value="60">60$</option>
        </select>
      </div>
      <div class="col">
        <label for="genreSelect" class="form-label">Genre</label>
        <select id="genreSelect" class="form-select" v-model="selectedGenre" @change="filterRestaurants">
          <option value="">Genre</option>
          <option value="Canadian">Canadian</option>
          <option value="French">French</option>
          <option value="Asian">Asian</option>
        </select>
      </div>
    </div>

    <!-- Liste des restaurants -->
    <div class="row">
      <div class="col-md-4" v-for="restaurant in filteredRestaurants" :key="restaurant.id">
        <div class="card mb-3">
          <div class="card-body">
            <router-link @click="handleRestaurantClick(restaurant.id)" to="/Restaurant" class="Nom">{{ restaurant.name }}</router-link>
            <p class="card-text">{{ restaurant.description }}</p>
            <p class="card-text"><small class="text-muted">{{ restaurant.genre }} | {{ restaurant.priceMin }}$ - {{ restaurant.priceMax }}$</small></p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      restaurants: [
        { id: 1, name: "La Buche", description: "Breakfast", genre: "French", priceMin: 15, priceMax: 30 },
        { id: 2, name: "Buvette Scott", description: "Meat", genre: "Canadian", priceMin: 20, priceMax: 40 },
        { id: 3, name: "Le Lapin Saute", description: "Meat", genre: "French", priceMin: 10, priceMax: 25 },
        { id: 4, name: "Chez Tao", description: "Pork", genre: "Asian", priceMin: 5, priceMax: 15 },
        { id: 5, name: "Le Billig", description: "Crepe", genre: "French", priceMin: 5, priceMax: 15 },
        { id: 6, name: "Le Pape Georges", description: "Meat", genre: "Canadian", priceMin: 5, priceMax: 15 },
      ],
      filteredRestaurants: [],
      searchTerm: '',
      selectedPriceMin: 0,
      selectedPriceMax: '',
      selectedGenre: '',
    };
  },
  methods: {
    filterRestaurants() {
      this.filteredRestaurants = this.restaurants.filter(restaurant => {
        const meetsMinPrice = restaurant.priceMin >= this.selectedPriceMin;
        const meetsMaxPrice = this.selectedPriceMax ? restaurant.priceMax <= this.selectedPriceMax : true;
        return restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
          meetsMinPrice && meetsMaxPrice &&
          (this.selectedGenre ? restaurant.genre === this.selectedGenre : true);
      });
    },
    handleRestaurantClick(id) {
      localStorage.setItem('selected', id);
    }
  },
  mounted() {
    this.filteredRestaurants = this.restaurants;
    window.localStorage.clear();
  }
};
</script>

<style>
.app-background {
  background-image: url('../assets/resto.jpg');
  background-size: cover; 
  background-position: center; 
  min-height: 100vh;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  padding-right: 0;
  padding-left: 0;
  margin-right: auto;
  margin-left: auto;
  max-width: none;
}

.no-padding {
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.no-margin {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.brand-name {
  font-size: 2rem;
  font-weight: bold;
  color: #ffa500;
  margin-left: 0.5rem;
}

.form-label {
  font-weight: bold;
  color: white;
}

.form-select {
  border: none;
  background-color: #f8f9fa;
  color: #495057;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}





</style> 
