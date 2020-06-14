import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  // コンポーネントからStoreを利用できるようにする
  store,
  render: (h) => h(App),
}).$mount("#app");

/*

// ストアを作成
const store = new Vuex.Store({
  // State: 状態
  state: {
    count: 0,
  },

  // Getter: Stateの値を変化させる
  getters: {
    squared: (state) => state.count * state.count,
    // 他のゲッタも使う場合
    cubed: (state, getters) => state.count * getters.squared,
  },

  // Mutation: Stateを更新する（Mutations以外ではStateを更新しちゃダメ）
  // 非同期処理を含めちゃダメ
  mutations: {
    increment(state, payload) {
      state.count += payload.amount;
    },
  },

  // Action: 非同期処理や外部APIとの通信を行い、最終的にMutationを呼び出す
  actions: {
    incrementAsync(ctx, payload) {
      // ctx に含まれるもの
      // state: 現在のState
      // getters: 定義されているGetter
      // dispatch: 他のActionを実行するメソッド
      // commit: Mutationを実行するメソッド
      ctx.commit("increment", payload);
    },
    async incrementDelay({ commit }, payload) {
      const data = await getCountNum(payload.type);
      console.log(data);
      commit("increment", { amount: data.amount });
    },
  },
});


*/
