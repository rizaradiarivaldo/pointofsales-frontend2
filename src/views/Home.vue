<template>
  <div class="home">
    <ModalCheckout />
    <ModalAdd />
    <!-- <ModalEdit :updateid="updateId" :updateindex="updateIndex"/> -->
    <div>
        <div class="modal" id="edit-modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <form class="form-edit" @submit.prevent="edit()" enctype="multipart/form-data">
                  <h5 class="modal-title mb-4 font-weight-bold">Edit Item</h5>
                  <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control shadow-input" v-model="form.productname" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="image" class="col-sm-2 col-form-label">Image</label>
                    <div class="col-sm-10">
                      <input type="file" @change="process($event)"  class="form-control shadow-input"/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="price" class="col-sm-2 col-form-label">Price</label>
                    <div class="col-sm-7">
                      <input type="number" id="price" class="form-control shadow-input" v-model="form.price" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="category" class="col-sm-2 col-form-label">Category</label>
                    <div class="col-sm-5">
                      <select id="category" class="form-control shadow-input" v-model="form.id_category">
                        <option selected value disabled>Choose Category</option>
                        <option v-for="(item, index) in Category.data" :key="index" :value="item.id_category">{{item.category}}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-12 text-right btn-footer">
                      <button type="button" class="btn btn-cancel" data-dismiss="modal">Cancel</button>
                      <button type="submit" class="btn btn-edit">Edit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12 col-12">
            <div class="row main-item">
              <div class="col-lg-9 col-md-12">
                <div class="row navbar-item">
                  <div class="col-lg-1 col-md-1 col-2">
                    <img src="../assets/img/menu (1).png" alt />
                  </div>
                  <div class="col-lg-10 col-md-10 col-8">
                    <h3 class="font-weight-bold">Food Items</h3>
                  </div>
                  <div class="col-lg-1 col-md-1 col-2">
                    <a
                      class=""
                      data-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    ><img src="../assets/img/magnifying-glass.png" alt /></a>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-1 col-md-12 col-12 sidebar">
                    <Sidebar :newcart="newCart"/>
                  </div>
                  <div class="col-lg-11 content">
                    <Card @update="updateData" @addtocart="addToCart"/>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 main-cart">
                <Cart :newcart="newCart" @plus="plus"  @minus="minus"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import Sidebar from '@/components/Sidebar.vue'
import Card from '@/components/Card.vue'
import Cart from '@/components/Cart.vue'
import ModalAdd from '@/components/ModalAdd.vue'
import ModalCheckout from '@/components/ModalCheckout.vue'
// import ModalEdit from '@/components/ModalEdit.vue'

export default {
  name: 'Home',
  components: {
    Sidebar,
    Card,
    Cart,
    ModalAdd,
    ModalCheckout
    // ModalEdit
  },
  data () {
    return {
      form: {
        productname: null,
        price: null,
        image: null,
        id_category: null
      },
      updateId: null,
      updateIndex: null,
      idProduct: null,
      indexProduct: null,
      newCart: []
    }
  },
  methods: {
    addToCart (id, index) {
      this.idProduct = id
      this.indexProduct = index
      const carts = this.newCart.filter(e => e.id_product === id)
      if (carts.length <= 0) {
        const data = this.Products.data.filter(e => e.id_product === id)
        data[0].qty = 1
        this.newCart = [...this.newCart, data[0]]
      } else {
        const oldData = this.newCart.map((e) => {
          if (e.id_product === id) {
            e.qty += 1
          }
          return e
        })
        this.newCart = oldData
      }
    },
    minus (index) {
      console.log(index)
      const cart1 = this.newCart[index].id_product
      const datafilter = this.newCart.filter((e) => {
        if (e.id_product === cart1) {
          e.qty -= 1
          if (e.qty < 1) {
            e.qty = 1
          }
        }
        return e
      })
      this.newCart = datafilter
      // console.log(datafilter)
    },
    plus (index) {
      console.log(index)
      const cart1 = this.newCart[index].id_product
      const datafilter = this.newCart.filter((e) => {
        if (e.id_product === cart1) {
          e.qty += 1
        }
        return e
      })
      this.newCart = datafilter
      // console.log(datafilter)
    },
    process (event) {
      this.form.image = event.target.files[0]
    },
    updateData (id, index) {
      this.updateId = id
      // console.log(this.Products.data[index].productname)
      this.form.productname = this.Products.data[index].productname
      this.form.price = this.Products.data[index].price
      this.form.image = this.Products.data[index].image
      this.form.id_category = this.Products.data[index].id_category
    },
    edit () {
      const fd = new FormData()
      fd.append('productname', this.form.productname)
      fd.append('image', this.form.image)
      fd.append('price', this.form.price)
      fd.append('id_category', this.form.id_category)
      const data = {
        id: this.updateId,
        formdata: fd
      }
      this.actionupdateData(data).then((response) => {
        alert('Update data success')
        window.location = '/'
      }).catch((err) => {
        alert(err)
      })
    },
    ...mapActions({
      getAllCategory: 'category/getAllCategory',
      getAllProducts: 'products/getAllProducts',
      actionupdateData: 'products/updateData'
    })
  },
  computed: {
    ...mapGetters({
      Category: 'category/getAllCategory',
      Products: 'products/getAllProducts'
    })
  }
}
</script>

<style scoped>
.navbar-item {
  display: flex;
  align-items: center;
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.sidebar {
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.content {
  background: rgba(190, 195, 202, 0.3);
}

/* ////////// */
@media (max-width: 992px) {
  .main-cart {
    display: none;
  }
}
.form-edit {
  font-weight: bolder;
}
.btn-footer {
  margin-top: 20px;
  font-weight: bold;
}
.shadow-input {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
.btn-edit {
  margin-left: 7px;
  background: #57cad5;
  color: #ffffff;
  width: 20%;
  font-weight: bold;
}
.btn-edit:hover {
  margin-left: 7px;
  background: #46d1dd;
  color: #ffffff;
  width: 20%;
  font-weight: bold;
}
.btn-cancel {
  background: #f24f8a;
  color: #ffffff;
  width: 20%;
  font-weight: bold;
}
.btn-cancel:hover {
  background: #fa3a81;
  color: #ffffff;
  width: 20%;
  font-weight: bold;
}
</style>
