<template>
  <div>
    <h3>LATIHAN VUEX</h3>

    <!-- {{AllProducts.data}} -->
    <div v-if="AllProducts.isLoading">Loading...</div>
    <div v-else>
      <div v-for="(item,index) in AllProducts.data" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      AllProducts: 'products/getAllProducts'
    })
  },
  methods: {
    ...mapActions({
      getAllProducts: 'products/getAllProducts'
    })
  },
  mounted () {
    this.getAllProducts()
  }
}
</script>
