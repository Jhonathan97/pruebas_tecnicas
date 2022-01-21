const Sequelize = require("sequelize");
const sequelize = require("../../models/index").sequelize;
const FollowInfeted = require("../../models/follow_infeted")(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);

export async function registerFollowInfected(params) {
  try {
      let newFollowInfected = await FollowInfeted.create({
        params
      });
      if (newFollowInfected === undefined) {
        return {followInfected: newFollowInfected };
      }
      return {followInfected: undefined };
  } catch (error) {}
}
