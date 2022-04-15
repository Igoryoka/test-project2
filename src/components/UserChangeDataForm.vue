<!-- Universal component for changing/creating users -->
<template>
  <b-form>
    <!-- Name input -->
    <div
        v-for="(value, name, index) in userData"
        :key="index"
    >
    <!-- For objects need a different way of editing -->
    <b-form-group
        v-if="typeof value === 'string' || typeof value === 'number'"
        :label="`${name}:`"
    >
      <b-form-input
          v-model="userData[name]"
          :placeholder="`Enter ${name}`"
      ></b-form-input>
    </b-form-group>
    </div>

    <b-button variant="primary" @click="onSubmit">Submit</b-button>
  </b-form>
</template>

<script>
import { BButton, BForm, BFormGroup, BFormInput } from "bootstrap-vue";
import { mapState } from "vuex";

export default {
  name: "UserChangeDataForm",
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BButton
  },
  props: {
    createMode: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      userData: {
        id: "",
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
      }
    }
  },
  computed: {
    ...mapState({ users: state => state.users.users }),
  },
  methods: {
    onSubmit() {
      if (this.createMode) {
        this.$store.commit("ADD_USERS", this.userData);
        this.userData = { // Reset inputs
          id: "",
          name: "",
          username: "",
          email: "",
          phone: "",
          website: "",
        }

        return;
      }

      this.$store.commit("CHANGE_USER", { id: this.userId, newUser: this.userData });
      this.$router.push("/users");
    },
  },
  created() {
    if (this.createMode) return;

    // Finding user to edit
    const currentUser = this.users.find(user => user.id.toString() === (this.userId));
    // Creating a deep copy for not change a vuex state without mutations
    this.userData = Object.assign({}, currentUser);
  }
}
</script>

<style scoped>

</style>