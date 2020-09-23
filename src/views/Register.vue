<template>
  <div class="main-register">
    <div class="container p-4">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-7">
              <img src="../assets/img/home.jpg" class="img-fluid img" alt />
            </div>

            <div class="col-lg-5 form-register">
              <form class="form-add" v-on:submit.prevent="onRegister()">
                <h5 class="modal-title mb-4 font-weight-bold">Form Register</h5>
                <hr />
                <div class="form-group">
                  <label for="email" class="font-weight-bold mt-3">Email</label>
                  <input
                    type="email"
                    class="form-control shadow-input"
                    id="email"
                    placeholder="Email" v-model="form.email"
                  />
                </div>
                <div class="form-group">
                  <label for="password" class="font-weight-bold">Password</label>
                  <input
                    type="password"
                    class="form-control shadow-input"
                    id="password"
                    placeholder="Password" v-model="form.password "
                  />
                </div>

                 <div class="form-group row">
                  <div class="col-sm-12 text-center">
                  <a href="/login" class="font-weight-bold" style="color: black">Login</a>
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-sm-12 text-center">
                    <button type="submit" class="btn btn-register font-weight-bold">Register</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    onRegister () {
      this.actionRegister(this.form)
        .then((response) => {
          alert('Check your email for activation...')
          // window.location = '/'
        }).catch((err) => {
          alert(err)
        })
    },
    ...mapActions({
      actionRegister: 'auth/register'
    })
  }
}
</script>

<style scoped>
.main-register {
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: rgba(253, 247, 247, 0.774);
}
.form-register {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}
.form-add {
  margin-top: 8%;
}
.btn-register {
  color: whitesmoke;

  background: #f24f8a;
  border-radius: 10px;
  width: 300px;
  margin-top: 20px;
}
.btn-register:hover {
  background: #57cad5;
  border-radius: 10px;
  /* background: #57cad5be;
  border-radius: 7px; */
  color: rgba(245, 245, 245, 0.822);
}
.img {
  border-radius: 15px;
}
.shadow-input {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

@media (max-width: 992px) {
  .main-register {
    height: 100vh;
    background-color: rgba(235, 229, 229, 0.774);
  }
}
/* style="box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25)" */
</style>
