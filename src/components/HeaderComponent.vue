<template>
  <nav class="navbar navbar-dark bg-dark fixed-top shadow">
    <div class="container-fluid">
      <span class="navbar-brand fw-bold">Boolflix</span>
      <div class="d-flex align-items-center gap-2">
        <select class="form-select" v-model="store.categorySelected">
          <option value="">All Categories</option>
          <option v-for="item in store.genres" :value="item.id">{{ item.name }}</option>
        </select>
        <SearchComponent />
      </div>
    </div>
  </nav>
</template>

<script>
import { store } from '../store'
import SearchComponent from './SearchComponent.vue'
export default {
    name: 'HeaderComponent',
    components: {
        SearchComponent
    },
    data() {
        return {
            store
        }
    },
}
</script>

<style lang="scss" scoped>
.navbar {
  backdrop-filter: blur(5px);
}

.form-select {
  min-width: 200px;
}
</style>
