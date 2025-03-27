import {ref} from "vue";

const Usersession = {
  loggedIn: ref(false),
  visit: ref(true),
  userName: "George Tremblay",
  dropdownOpen: ref(false),

  RestoVisited() {
    this.visit = true;
  },

  RestoNotVisited() {
    this.visit = false;
  },

  login() {
    this.loggedIn = true;
  },

  logout() {
    this.loggedIn = false;
  },

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  },
};
export default Usersession;
