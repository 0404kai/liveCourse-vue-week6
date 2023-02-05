<template>
  <div>
    <h1>前台產品列表</h1>
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td style="width: 200px">
            <div style="height: 100px; background-size: cover; background-position: center">
              <img :src="item.imageUrl" :alt="item.category">
            </div>
          </td>
          <td>
            {{ item.title }}
          </td>
          <td>
            <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
            <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
            <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-outline-secondary" @click="getProduct(item.id)"
                :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled">
                <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                查看更多
              </button>
              <button type="button" class="btn btn-outline-danger" @click="addToCart(item.id)"
                :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled">
                <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <user-product-modal ref="userProductModal" :product="product" @add-to-cart="addToCart"></user-product-modal>
  </div>
</template>

<script>
import UserProductModal from "@/components/UserProductModal.vue";
export default {
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      products: [],
      product: {},
    };
  },
  components: {
    UserProductModal,
  },
  methods: {
    getProducts() {
      const url = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/products`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    getProduct(id) {
      const url = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/product/${id}`;
      this.loadingStatus.loadingItem = id; // 顯示 loading 動畫
      this.$http
        .get(url)
        .then((res) => {
          this.loadingStatus.loadingItem = "";
          this.product = res.data.product;
          this.$refs.userProductModal.openModal();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    addToCart(id, qty = 1) {
      const url = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/cart`;
      this.loadingStatus.loadingItem = id;
      const cart = {
        data: {
          product_id: id,
          qty,
        },
      };
      this.$refs.userProductModal.hideModal();
      this.$http
        .post(url, cart)
        .then((res) => {
          alert(res.data.message);
          this.loadingStatus.loadingItem = "";
          this.getCart();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>