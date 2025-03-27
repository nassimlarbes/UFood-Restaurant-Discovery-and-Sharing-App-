<template>
  <div>
    <h1>User profile</h1>
    <div>
      <div v-if="Usersession.loggedIn" class="user-profile">
        <div class="username">
          <div class="score">Score : 3000</div>
          <div @click="Usersession.toggleDropdown">Welcome, {{ Usersession.userName }}!</div>
          <div v-if="Usersession.dropdownOpen">
            <button @click="Usersession.logout">Disconnection</button>
          </div>
        </div>
      </div>
      <div v-else class="user-profile">
        <div>Connect here!</div>
        <button @click="Usersession.login">Connection</button>
      </div>
    </div>
    <div class="RestoList">
      <h2>Restaurant recently visited</h2>
      <div v-if="Usersession.loggedIn">
        <div v-if="Usersession.visit">
          <div class="RestoList">
            <div>La Buche</div>
            <div>Number of visits : 3</div>
            <div></div>
          </div>

          <div class="RestoList">
            <div>Le Lapin Saute</div>
            <div>Number of visits : 2</div>
            <div></div>
          </div>

          <button @click="Usersession.RestoNotVisited">
            I did not visit this restaurant
          </button>
        </div>
        <div v-else>
          <button @click="Usersession.RestoVisited">I visited this restaurant</button>
          <div>You have not visited any restaurants.</div>
          <router-link to="/">Click here to return on home page.</router-link>
        </div>
      </div>
      <div v-else>Please connect!</div>
    </div>
  </div>
</template>

<script>
import Usersession from "@/components/Usersession";
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      Usersession: Usersession,
    };
  }
})

</script>

<style>
.user-profile {
  display: flex;
  justify-content: flex-end;
  padding-right: 60px;
  position: relative;
  margin-bottom: 60px;
}

.username {
  position: absolute;
  top: 100%;
}

.score {
  padding-right: 30px;
}

.RestoList {
  padding-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
