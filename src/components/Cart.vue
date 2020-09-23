<template>
  <div>
    <div class="row navbar-cart">
      <div class="col-lg-12">
        <h3 class="font-weight-bold">Cart</h3>
      </div>
    </div>
    <div v-if="newcart.length === 0">
      <div class="row mt-5">
        <div class="col-lg-12">
          <img src="../assets/img/food-and-restaurant.png" alt />
          <h4>Your cart is empty</h4>
          <h6>Please add some items from the menu</h6>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row mt-5">
        <div class="col-md-12">
          <div v-for="(item, index) in newcart" :key="index">
            <div class="row">
              <div class="col-md-4 col-4 text-center">
                <img :src="`${url}/${item.image}`" class="img-fluid" />
              </div>
              <div class="col-md-8 col-8">
                <div class="row">
                  <div class="col-md-12 col-12 text-left">
                    <p>
                      <strong>{{item.productname}}</strong>
                    </p>
                  </div>
                  <div class="col-md-6 col-6">
                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                      <button
                        type="button"
                        @click="$emit('minus', index)"
                        class="btn btn-outline-success"
                      >-</button>
                      <button type="button" disabled class="btn btn-outline-success">{{item.qty}}</button>
                      <button
                        type="button"
                        @click="$emit('plus', index)"
                        class="btn btn-outline-success"
                      >+</button>
                    </div>
                  </div>
                  <div class="col-md-6 col-6">
                    <p>
                      <strong>Rp. {{item.price}}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12" style="margin-top: 140px">
          <div class="row">
            <div class="col-md-6 text-left">
              <strong>Total :</strong>
            </div>
            <div class="col-md-6 text-right">
              <strong>Rp. 105.000*</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 text-left" style="margin-bottom: 15px">*Belum termasuk ppn</div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center">
          <button
            class="btn btn-block btn-checkout text-center"
            data-toggle="modal"
            data-target="#checkout-modal"
          >
            <strong>Checkout</strong>
          </button>

          <button class="btn btn-block btn-cancel text-center">
            <strong>Cancel</strong>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: ['newcart'],
  data () {
    return {
      url: process.env.VUE_APP_URL
    }
  }
}
</script>

<style scoped>
.navbar-cart {
  display: flex;
  align-items: center;
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.25);
}
.btn-checkout {
  background: #4accd8;
  color: #ffffff;
}
.btn-checkout:hover {
  background: #57cad5d0;
  color: #ffffff;
}

.btn-cancel {
  background: #f24f8a;
  color: #ffffff;
}

.btn-cancel:hover {
  background: #f24f8bb6;
  color: #ffffff;
}
</style>
