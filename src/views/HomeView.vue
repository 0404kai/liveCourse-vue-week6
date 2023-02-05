<template>
  <div class="m-5">
    <h1>前台列表</h1>
    <nav id="nav">
      <router-link to="/">首頁｜</router-link>
      <router-link to="/productsList">前台產品列表｜</router-link>
      <router-link to="/cart">購物車｜</router-link>
      <router-link to="/login">登入頁面</router-link>
    </nav>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {};
  },
};
</script>
