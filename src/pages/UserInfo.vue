<template>
  <div>
    <p>
      {{ user }}
    </p>

    <b-button @click="editUser" variant="success">
      Edit
    </b-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {BButton} from "bootstrap-vue";

export default {
  name: "UserInfo",
  components: {
    BButton
  },
  data() {
    return {
      user: {},
    }
  },
  computed: {
    ...mapState({ users: state => state.users.users }),
  },
  methods: {
    editUser() {
      this.$router.push(`/edit/${this.user.id}`);
    }
  },
  created() {
    const id = this.$route.params?.id;
    this.user = this.users.find(user => user.id.toString() === id);
  }
}
</script>

<style scoped>

</style>