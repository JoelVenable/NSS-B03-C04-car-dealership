module.exports.API = {
  fetchJson: function (url, optionsObject) {
    return fetch(url, optionsObject)
        .then(response => response.json());
  },
  getLocalData: function (endpoint) {
    return this.fetchJson(`http://localhost:8088/${endpoint}`);
  },
  saveLocalData: function (obj, endpoint) {
    return this.fetchJson(`http://localhost:8088/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });
  }
};
