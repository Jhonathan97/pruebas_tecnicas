const Sequelize = require("sequelize");
const sequelize = require("../../models/index").sequelize;
const City = require("../../models/city")(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);

/**
 *
 * @param {*} parmas
 */
export async function registerCity(params) {
  //   console.log("llego");
  //   const params = req.body;
  try {
    const city = await getCityByCod(params.cod_ciudad);
    if (city === undefined) {
      let newCity = await City.create({
        cod_ciudad: params.cod_ciudad,
        nombre_ciudad: params.nombre_ciudad,
      });
      if (newCity) {
        return { city: newCity };
      }
      return undefined;
    }
    return { city: city };
  } catch (error) {}
}

export async function getCityByCod(cod_city) {
  try {
    const result = await City.findAll({
      where: {
        cod_ciudad: cod_city,
      },
    });
    if (result.length > 0) {
      return result[0];
    }
    return undefined;
  } catch (error) {}
}
