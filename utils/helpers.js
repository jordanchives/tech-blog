const { format } = require("path");

module.exports = {
  formatDate: (date) => {
    return date.toLocaleDateString();
  },
};
