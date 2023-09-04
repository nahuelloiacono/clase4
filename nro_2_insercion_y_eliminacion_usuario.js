// Inserción y eliminación de usuario.

const Sequelize = require("sequelize");
const sequelize = new Sequelize("clase4", "root", "", {
  host: "localhost",
  dialect: "mariadb" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

class User extends Sequelize.Model {}
User.init(
  {
    id: Sequelize.INTEGER,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
  },
  { sequelize, modelName: "users" }
);

// Inserción de registro.
(async () => {
  try {
    await sequelize.sync();
    const user1 = await User.create({
      id: 5,
      firstName: "Nahuel",
      lastName: "Loiacono",
    });
    console.log(user1.toJSON());

    // Eliminar registro con id 5.
    User.destroy({
      where: {
        id: 5,
      },
    })
      .then(() => {
        console.log("Registro eliminado");
      })
      .catch((err) => {
        console.error("Error al eliminar el registro:", err);
      });
  } catch (error) {
    console.error("Error:", error);
  }
})();
