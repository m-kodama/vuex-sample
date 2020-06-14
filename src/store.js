import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // タスクのダミーデータ
    tasks: [
      {
        id: 1,
        name: "牛乳を買う",
        labelIds: [1, 2],
        done: false,
      },
      {
        id: 2,
        name: "Vue.jsの本を買う",
        labelIds: [1, 3],
        done: true,
      },
    ],
    nextTaskId: 3,

    // ラベルのダミーデータ
    labels: [
      {
        id: 1,
        text: "買い物",
      },
      {
        id: 2,
        text: "食料",
      },
      {
        id: 3,
        text: "本",
      },
    ],
    nextLabelId: 4,

    // フィルタするラベルのID
    filter: null,
  },

  getters: {
    // フィルタ後のタスクを返す
    filteredTasks(state) {
      // ラベルが選択されていない場合はフィルタを適用しない
      if (state.filter === null) {
        return state.tasks;
      }

      // 選択されているラベルでフィルタリングする
      return state.tasks.filter((task) => {
        return task.labelIds.indexOf(state.filter) >= 0;
      });
    },
  },

  mutations: {
    // タスクの追加
    addTask(state, { name, labelIds }) {
      state.tasks.push({
        id: state.nextTaskId,
        name,
        labelIds,
        done: false,
      });

      state.nextTaskId++;
    },

    // タスクの更新
    toggleTaskStatus(state, { id }) {
      for (const task of state.tasks) {
        if (task.id === id) {
          task.done = !task.done;
          break;
        }
      }
    },

    // ラベルを追加する
    addLabel(state, { text }) {
      state.labels.push({
        id: state.nextLabelId,
        text,
      });
      state.nextLabelId++;
    },

    // フィルタリング対象のラベルを変更する
    changeFilter(state, { filter }) {
      state.filter = filter;
    },

    // Stateを設定する
    restore(state, { tasks, labels, nextTaskId, nextLabelId }) {
      state.tasks = tasks;
      state.labels = labels;
      state.nextTaskId = nextTaskId;
      state.nextLabelId = nextLabelId;
    },
  },

  actions: {
    // ローカルストレージにStateを保存する
    save({ state }) {
      const data = {
        tasks: state.tasks,
        labels: state.labels,
        nextTaskId: state.nextTaskId,
        nextLabelId: state.nextLabelId,
      };
      localStorage.setItem("task-app-data", JSON.stringify(data));
    },

    // ローカルストレージからStateを復元する
    restore({ commit }) {
      const data = localStorage.getItem("task-app-data");
      if (data) {
        commit("restore", JSON.parse(data));
      }
    },
  },
});

export default store;
