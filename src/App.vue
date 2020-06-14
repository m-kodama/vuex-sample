<template>
  <div id="app">
    <h2>タスク一覧</h2>
    <div>
      <h3>フィルタ</h3>
      <span v-for="label in labels" :key="label.id">
        <input type="radio" :checked="label.id === filter" @change="changeFilter(label.id)" />
        {{label.text}}
      </span>
    </div>
    <form @submit.prevent="addTask">
      <input type="text" v-model="newTaskName" placeholder="新しいタスクを入力してください..." />
    </form>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" :checked="task.done" @change="toggleTaskStatus(task)" />
        {{ task.name }}
        <span
          v-for="labelId in task.labelIds"
          :key="labelId"
        >{{ getLabelText(labelId) }}</span>
      </li>
    </ul>

    <h2>ラベル一覧</h2>
    <form @submit.prevent="addLabel">
      <input type="text" v-model="newLabelText" placeholder="新しいラベル名を入力してください..." />
    </form>
    <ul>
      <li v-for="label in labels" :key="label.id">
        <input type="checkbox" :value="label.id" v-model="newTaskLabelIds" />
        {{ label.text }}
      </li>
    </ul>

    <h2>保存と復元</h2>
    <button type="button" @click="save">保存</button>
    <button type="button" @click="restore">復元</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      newTaskName: "",
      newTaskLabelIds: [],
      newLabelText: ""
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.filteredTasks;
    },
    labels() {
      return this.$store.state.labels;
    },
    filter() {
      return this.$store.state.filter;
    }
  },
  methods: {
    // タスクを追加する
    addTask() {
      this.$store.commit("addTask", {
        name: this.newTaskName,
        labelIds: this.newTaskLabelIds
      });
      this.newTaskName = "";
      this.newTaskLabelIds = [];
    },

    // タスクの完了状態を更新する
    toggleTaskStatus(task) {
      this.$store.commit("toggleTaskStatus", { id: task.id });
    },

    // ラベルを追加する
    addLabel() {
      this.$store.commit("addLabel", { text: this.newLabelText });
      this.newLabelText = "";
    },

    // ラベルのIDからそのラベルのテキストを返す
    getLabelText(id) {
      const label = this.labels.filter(label => label.id == id)[0];
      return label ? label.text : "";
    },

    // フィルタする対象のラベルを変更する
    changeFilter(labelId) {
      this.$store.commit("changeFilter", { filter: labelId });
    },

    // 保存
    save() {
      this.$store.dispatch("save");
    },

    // 復元
    restore() {
      this.$store.dispatch("restore");
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
