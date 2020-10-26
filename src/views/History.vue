<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="row navbar-history">
            <div class="col-lg-1">
              <img src="../assets/img/menu (1).png" alt />
            </div>
            <div class="col-lg-11">
              <h3 class="font-weight-bold">History</h3>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-1 sidebar">
              <!-- <img src="../assets/img/fork.png" alt />
              <img src="../assets/img/clipboard.png" alt />
              <img src="../assets/img/add.png" alt /> -->
              <Sidebar/>
            </div>
            <div class="col-lg-11">
              <div class="row">
                <div class="col-lg-4 col-md-4 col-12">
                  <div class="card text-white bg-primary">
                    <div class="card-body">
                      <h5 class="card-title">Primary card title</h5>
                      <p
                        class="card-text"
                      >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-4 col-12">
                  <div class="card text-white bg-primary">
                    <div class="card-body">
                      <h5 class="card-title">Primary card title</h5>
                      <p
                        class="card-text"
                      >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-4 col-12">
                  <div class="card text-white bg-primary">
                    <div class="card-body">
                      <h5 class="card-title">Primary card title</h5>
                      <p
                        class="card-text"
                      >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'About',
  components: {
    Sidebar
  }
}
</script>

<style scoped>
.navbar-history {
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
</style>
