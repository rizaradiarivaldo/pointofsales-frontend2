<template>
<div>
  <div>
     <div class="collapse" id="collapseExample">
      <div class="card card-body">
        <form @submit.prevent="searching(search)">
          <div class="row">
            <div class="col-lg-10 col-10">
              <input type="text" name="search" v-model="search" id="search" class="form-control" placeholder="Search ...">
            </div>
            <div class="col-lg-2 col-2">
              <button type="submit" class="btn"><img src="../assets/img/magnifying-glass.png" alt /></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div>
    <!-- <div class="cont-pagination" @click="pagi()">
      <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          size="md"
          page-class=""
      ></b-pagination>
    </div> -->
    <div class="dropdown dropleft text-right mt-3">
      <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Sort by
      </button>
      <div class="dropdown-menu">
          <a class="dropdown-item" @click="sort('id_product','desc')" style="cursor: pointer;">Lates Products</a>
          <a class="dropdown-item" @click="sort('productname','asc')" style="cursor: pointer;">Product Name A-Z</a>
          <a class="dropdown-item" @click="sort('productname','desc')" style="cursor: pointer;">Product Name Z-A</a>
          <a class="dropdown-item" @click="sort('price','asc')" style="cursor: pointer;">Price A-Z</a>
          <a class="dropdown-item" @click="sort('price','desc')" style="cursor: pointer;">Price Z-A</a>
      </div>
    </div>
  </div>
  <div class="main-card">
    <div v-if="Products.isLoading">
      <div class="row" style="height: 45vw">
        <div class="col-lg-12">
          <b-icon icon="arrow-counterclockwise" animation="spin-reverse-pulse" font-scale="10"></b-icon>
        </div>
      </div>
    </div>
    <div v-else>
       <div v-if="Products.data.length === 0" style="height: 45vw">
          <div class="row">
            <div class="col-lg-12">
             <h3 v-textcolor="'red'">{{text}}</h3>
               <img src="../assets/img/notfound.jpg" class="img-fluid" alt="">
            </div>
          </div>
        </div>
            <div v-else>
              <div class="row text-center">
                <div class="col-md-4 col-6" v-for="(item, index) in Products.data" :key="index">
                  <div class="card-item">
                    <img
                      class="card-img-top"
                      :src="`${url}/${item.image}`"
                      alt="Expresso"
                    />
                  </div>
                  <div class="row">
                    <div class="col-lg-8 col-md-8 col-8 text-left">
                      <div class="card-bottom">
                        <p style="margin-bottom: -1px; text-align: left">{{ item.productname }}</p>
                        <p style="text-align: left">
                          <strong>Rp. {{ item.price }}</strong>
                        </p>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-4 text-right">
                      <div>
                        <b-dropdown  id="dropdown-dropleft" dropleft size="md" variant="black" toggle-class="text-decoration-none" no-caret>
                          <template v-slot:button-content>
                            <b-icon icon="three-dots" variant="black"></b-icon>
                          </template>
                           <b-dropdown-item data-toggle="modal" @click="$emit('addtocart',item.id_product,index)" style="cursor: pointer;">Add To Cart</b-dropdown-item>
                          <b-dropdown-item data-toggle="modal" data-target="#edit-modal" @click="$emit('update',item.id_product,index)" style="cursor: pointer;">Edit</b-dropdown-item>
                          <b-dropdown-item @click="deleteData(item.id_product)" style="cursor: pointer;">Delete</b-dropdown-item>
                        </b-dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  </div>

  <div>
    <button class="btn btn-primary" @click="paginationBack()">Back</button>
    <button class="ml-2 btn btn-primary">{{page}}</button>
    <button class="ml-2 btn btn-primary" @click="paginationNext()">Next</button>

  </div>
      </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mix from '../mixins/index'

export default {
  mixins: [mix],
  name: 'Card',
  data () {
    return {
      search: '',
      url: process.env.VUE_APP_URL,
      page: 1
    }
  },
  // directives: {
  //   textcolor: {
  //     bind (element, binding) {
  //       // console.log(binding.value)
  //       element.style.color = binding.value
  //     }
  //   }
  // },
  computed: {
    ...mapGetters({
      Products: 'products/getAllProducts'
    }),
    pagination () {
      return this.page
    }
  },
  methods: {
    ...mapActions({
      getAllProducts: 'products/getAllProducts'
      // sortLates: 'products/sortLates',
      // getAllProducts: 'products/getAllProducts',
      // sortingProducts: 'products/SortingData',
      // sortProductNameA: 'products/sortProductNameA',
      // sortProductNameZ: 'products/sortProductNameZ',
      // sortPriceA: 'products/sortPriceA',
      // sortPriceZ: 'products/sortPriceZ',
      // deleteData: 'products/deleteData'
    }),
    searching (search) {
      // this.sortingProducts(this.search)
      this.$router.push({
        query: {
          search
        }
      })
      const fd = {
        name: search
      }
      this.getAllProducts(fd)
      this.search = ''
    },
    sort (sortby, sorttype) {
      this.$router.push({
        query: {
          sortby,
          sorttype
        }
      })
      const fd = {
        sortby: sortby,
        sorttype: sorttype
      }
      this.getAllProducts(fd)
    },
    paginationNext () {
      if (this.page >= this.Products.meta.totalPage) {
        alert('Last Page')
      } else {
        this.page += 1
        const fd = {
          page: this.page
        }
        this.$router.push({
          query: {
            page: this.page
          }
        })
        this.getAllProducts(fd)
      }
    },
    paginationBack () {
      if (this.page <= 1) {
        alert('First Page')
      } else {
        this.page -= 1
        const fd = {
          page: this.page
        }
        this.$router.push({
          query: {
            page: this.page
          }
        })
        this.getAllProducts(fd)
      }
    }
  },

  mounted () {
    this.getAllProducts('')
  }
}
</script>

<style scoped>
.main-card {
  margin-top: 20px;
}
</style>
