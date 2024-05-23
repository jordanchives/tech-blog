const sequelize = require("../config/connection");
const { Users, Posts, Comments } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await Users.bulkCreate(userData, {
      individualHooks: true,
    });

    await Posts.bulkCreate(postData);

    await Comments.bulkCreate(commentData);

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDatabase();
