const Sequelize = require("sequelize");
const sequelize = new Sequelize("clase4", "root", "", {
  host: "localhost",
  dialect: "mariadb",
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

(async () => {
  try {
    await sequelize.sync();

    // Array de registros a insertar.
    const registrosAInsertar = [
      { id: 1, firstName: "Nahuel", lastName: "Loiacono" },
      { id: 2, firstName: "Noelia", lastName: "Loiacono" },
      { id: 3, firstName: "Jorge", lastName: "Loiacono" },
      { id: 4, firstName: "Miriam", lastName: "Calomeni" },
    ];

    // Insertar registros.
    const inserciones = registrosAInsertar.map(async (registro) => {
      return await User.create(registro);
    });

    // Esperar a que todas las inserciones se completen.
    await Promise.all(inserciones);

    console.log("Registros insertados exitosamente");

    // Eliminar los registros con apellido Loiacono.
    await User.destroy({
      where: {
        lastName: ["Loiacono"],
      },
    });

    console.log("Los registros con el apellido Loiacono han sido eliminados");
  } catch (error) {
    console.error("Error:", error);
  }
})();
