
import Usersession from './Usersession';
<template>
  <nav class="navbar navbar-expand-md navbar-padding">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarToggler">
      <div class="px-sm-2 px-0 bg-dark min-vh-100 d-flex flex-column">
        <div class="flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
          <a href="/"
            class="d-flex align-items-center justify-content-center mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-3 text-center d-sm-inline">Menu</span>
          </a>
          <hr>
          <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start fs-5" id="menu">
            <li class="nav-item">
              <router-link class="nav-link text-white" :class="{ 'active': $route.path === '/' }" aria-current="page"
                to="/"><i class="bi bi-house pe-2"></i>Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" :class="{ 'active': $route.path === '/restaurant' }"
                to="/restaurant"><i class="bi bi-egg-fried pe-2"></i>Restaurant</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" :class="{ 'active': $route.path === '/user' }" to="/user"><i
                  class="bi bi-person pe-2"></i>User Profile</router-link>
            </li>
          </ul>
          <hr>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search (non fonctionnel)</button>
          </form>
        </div>

        <!-- user info -->
        <!-- user logged-in -->
        <div v-if="Usersession.loggedIn" id="lastitem" class="mt-auto" style="position: relative; top: -30px">
          <div class="dropdown dropup">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false" style="position: relative; top: -20px;">
              <img src="../assets/PrisonMike.png" alt="" width="60" height="60" class="rounded-circle me-2">
              <strong>{{ Usersession.userName }}</strong>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser1">
              <!-- Dropdown items -->
               <li><a class="dropdown-item" @click="Usersession.logout"  href="#">Logout</a></li>
            </ul>
          </div>
        </div>
          <!-- user logged out -->
        <div v-else id="lastitem" class="mt-auto" style="position: relative; top: -30px">
          <div class="dropdown dropup">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false" style="position: relative; top: -20px;">
              <strong>:( You are not connected</strong>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser1">
              <!-- Dropdown items -->
               <li><a class="dropdown-item" @click="Usersession.login"  href="#">Login</a></li>
            </ul>
          </div>
        </div>
        <!-- end user info -->


      </div>
    </div>
  </nav>
</template>



<script>
import Usersession from "@/components/Usersession";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      Usersession: Usersession,
    };
  }
})

</script>

<style>
@media (min-width: 768px) {
  .navbar-padding {
    padding-top: 0px;
    padding-bottom: 0px;
  }
}</style>
