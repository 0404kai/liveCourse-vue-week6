<template>
  <div class="container">
    <h1>產品列表</h1>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span :class="item.is_enabled ? 'text-success' : 'text-danger'">{{ item.is_enabled ? '啟用' : '未啟用' }}</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      pagination: {},
    }
  },
  methods: {
    getProducts(page = 1) {
      const url = `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}/admin/products?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getProducts();
  }
}
</script>