<template>
  <h1>後台列表</h1>
  <nav id="nav" class="gx-3">
    <router-link to="/admin/products">後台產品列表｜</router-link>
    <router-link to="/admin/orders">訂單列表</router-link>
  </nav>
  <Router-view />
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    checkAdmin() {
      const url = `${import.meta.env.VITE_API}/api/user/check`;
      this.$http
        .post(url)
        .then(() => {})
        .catch((err) => {
          alert(err);
          this.$router.push("/login");
        });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.$http.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  },
}
</script>