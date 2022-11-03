module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("category", {
		...require("./core")(Sequelize, DataTypes),
    name: {
      type: DataTypes.STRING(120),
      defaultValue: null,
    },
    image: {
      type: DataTypes.STRING(120),
      defaultValue: null,
     
    },
  },
  {
    tableName: "category",
    timestamps: true,
    paranoid: true,
    deletedAt: 'destroyTime'
  }
);
}