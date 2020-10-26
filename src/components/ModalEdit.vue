<template>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ModalEdit',
  props: ['updateid', 'updateindex'],
  data () {
    return {
      form: {
        productname: '',
        price: '',
        image: '',
        id_category: ''
      },
      oldproductname: ''
      // oldImage
    }
  },
  // watch: {
  //   updateid (value) {
  //     console.log(value)
  //   },
  //   updateindex (value) {
  //     console.log(value)
  //   }
  // },
  computed: {
    ...mapGetters({
      Category: 'category/getAllCategory'
    }),
    ...mapGetters({
      Products: 'products/getAllProducts'
    })
  },
  methods: {
    process (event) {
      this.form.image = event.target.files[0]
    },
    ...mapActions({
      getAllProducts: 'products/getAllProducts'
    }),
    ...mapActions({
      getAllCategory: 'category/getAllCategory'
    })
  },
  mounted () {
    this.getAllProducts()
    this.getAllCategory()
  }
}
</script>

<style scoped>
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
.btn-cancel {
  background: #f24f8a;
  color: #ffffff;
  width: 20%;
  font-weight: bold;
}
</style>
