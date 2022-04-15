<template>
  <div>
    <UserChangeDataForm :user-id="id" />
  </div>
</template>

<script>

import UserChangeDataForm from "@/components/UserChangeDataForm.vue";

export default {
  name: "UserEdit",
  components: {
    UserChangeDataForm,
  },
  data() {
    return {
      id: ""
    }
  },
  created() {
    this.id = this.$route.params?.id;
  }
}
</script>

<style scoped>

</style>