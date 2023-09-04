// Inserción y actualización de usuario.

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

    // Actualización de registro.
    const [updatedRowsCount] = await User.update(
      { firstName: "Jorge", lastName: "Loiacono" },
      {
        where: {
          id: 5,
          firstName: "Nahuel",
          lastName: "Loiacono",
        },
      }
    );

    if (updatedRowsCount > 0) {
      console.log("Hecho");
    } else {
      console.log("No se encontraron registros para actualizar");
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();
