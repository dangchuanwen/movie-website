const KEY = "search-history";

const local_storage = {
  getSearchHistoryList() {
    let res = [];
    try {
      res = JSON.parse(localStorage.getItem(KEY));
    } catch (err) {
      res = [];
    }
    return res;
  },
  addSearchHistory(new_search) {
    let list = this.getSearchHistoryList();
    if (!Array.isArray(list)) {
      list = [];
    }
    if (list.find(item => item === new_search) === undefined) {
      list.push(new_search);
    }
    this.setSearchHistoryList(list);
  },
  setSearchHistoryList(new_list) {
    localStorage.setItem(KEY, JSON.stringify(new_list));
  }
};

export default local_storage;
