<template>
  <HeaderComponent />
  <ListComponent :array="filteredMovie" :titolo="titoloMovie" />
  <ListComponent :array="filteredSeries" :titolo="titoloSeries" />
  <ListComponent :array="store.popularTV" :titolo="populartv" />

</template>

<script>
import { store } from './store';
import HeaderComponent from './components/HeaderComponent.vue';
import ListComponent from './components/ListComponent.vue';

export default {
  components: { HeaderComponent, ListComponent },
  data() {
    return {
      store,
      titoloSeries: 'SeriesTV',
      titoloMovie: 'Movie',
      populartv: 'Trend Movies',


    }
  },
  computed: {
    filteredMovie() {
      return store.categorySelected
        ? store.ListMovie.filter((item) => {
          return item.genre_ids.includes(store.categorySelected);
        })
        : store.ListMovie;

    },
    filteredSeries() {

      return store.categorySelected
        ? store.ListSeries.filter((item) => {
          return item.genre_ids.includes(store.categorySelected);
        })
        : store.ListSeries;

    }
  },
  created() {
    store.getPopular();
    store.getGenres();

    // store.getCharacters();
    //this.getCharacters()
  },
  mounted() {
  },
  updated() {
  }
}
</script>

<style lang="scss" scoped>

</style>
