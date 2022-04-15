<template>
  <div>
    <b-form-select
        v-model="selectedKeys"
        :options="userKeys"
        multiple
        :select-size="8"
        class="w-50 pb-4">
    </b-form-select>

    <b-table
        selectable
        :select-mode="'single'"
        @row-selected="onRowSelected"
        striped
        hover
        :items="users"
        :fields="tableFields"
        :busy="!users.length"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <strong>Loading...</strong>
        </div>
      </template>

      <template #cell(edit)="data">
        <b-button variant="success" @click.stop="editUser(data.item.id)">
          Edit
        </b-button>
      </template>
    </b-table>

    <div class="w-100 mb-5 text-center">
      <a v-if="!allDataFetched && users.length" role="button" class="loadMoreButton mb-5" @click="loadMore">
        Load more...
      </a>
    </div>
    <hr/>
    <p class="h4"> Add new user: </p>
    <UserChangeDataForm create-mode />
  </div>
</template>

<script>
import { BTable, BFormSelect, BButton } from 'bootstrap-vue'; // optionally import only the necessary components
import { mapState } from "vuex";
import UserChangeDataForm from "@/components/UserChangeDataForm.vue";

export default {
  name: "UsersList",
  data() {
    return {
      allDataFetched: false, // For pagination button
      selectedKeys: [], // Keys to display in table
    };
  },
  components: {
    BTable,
    BFormSelect,
    BButton,
    UserChangeDataForm
  },
  computed: {
    ...mapState({
      users: state => state.users.users,
      userKeys: state => state.users.userKeys
    }),
    tableFields() {
      return this.selectedKeys.concat(["edit"]); // Adds one more col with edit button
    }
  },
  watch: {
    userKeys: function (newValue) {
      this.selectedKeys = newValue;
    }
  },
  methods: {
    async loadMore() {
      const usersLength = this.users.length;
      await this.$store.dispatch("fetchUsers", {start: this.users[usersLength - 1]?.id, limit: 2});

      window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);

      if (usersLength === this.users.length) this.allDataFetched = true;
    },
    onRowSelected(user) {
      this.$router.push(`/user/${user[0].id}`);
    },
    editUser(userId) {
      this.$router.push(`/edit/${userId}`);
    }
  },
  created() {
    this.selectedKeys = this.userKeys;
  },
}
</script>

<style scoped>
.loadMoreButton {
  color: #0d6efd;
  text-decoration: underline;
}
</style>