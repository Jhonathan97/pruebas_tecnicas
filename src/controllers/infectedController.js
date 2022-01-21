const Sequelize = require("sequelize");
const sequelize = require("../../models/index").sequelize;
import { registerCity } from "./cityController";
import { registerFollowInfected } from "./follow_infetedController";
const Infected = require("../../models/infected")(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);

/**
 * Metodo utilizado para acceder a la data del servicio
 * @returns
 */
async function getData() {
  const fetch = require("node-fetch");
  const url = "https://www.datos.gov.co/resource/gt2j-8ykr.json";
  const contend = await fetch(url)
    .then((promFetch) => promFetch.json())
    .then((result) => {
      return result;
    });
  return contend;
}

/**
 * Metodo encardado principal encargado de devolver al cliente
 * los datos de manera discriminada por genero y edades
 * @param {*} req
 * @param {*} res
 */
export async function getInfectedPool(req, res) {
  let contendData = await getData();
  let contentResponse = groupByGenderAndAgeData(contendData);
  res.json({
    messaje: "list infected",
    data: contentResponse,
  });
}

/**
 *
 * @param {*} data
 * @returns
 */
function groupByGenderAndAgeData(data) {
  // obtener dos arreglos separados por genero
  let filteredWomen = data.filter(function (element) {
    return element.sexo === "F";
  });
  let filteredMen = data.filter(function (element) {
    return element.sexo === "M";
  });

  let arrayWomanLess20 = filteredWomen.filter(function (element) {
    return parseInt(element.edad) > 0 && parseInt(element.edad) <= 20;
  });
  let arrayWomanOver20 = filteredWomen.filter(function (element) {
    return parseInt(element.edad) > 20 && parseInt(element.edad) <= 40;
  });
  let arrayWomanOver40 = filteredWomen.filter(function (element) {
    return parseInt(element.edad) > 40;
  });

  let arrayMenLess20 = filteredMen.filter(function (element) {
    return parseInt(element.edad) > 0 && parseInt(element.edad) <= 20;
  });
  let arrayMenOver20 = filteredMen.filter(function (element) {
    return parseInt(element.edad) > 20 && parseInt(element.edad) <= 40;
  });
  let arrayMenOver40 = filteredMen.filter(function (element) {
    return parseInt(element.edad) > 40;
  });

  let dataGroup = {
    Women: {
      Women_Less_20: arrayWomanLess20,
      Women_Over_20: arrayWomanOver20,
      Women_Over_40: arrayWomanOver40,
    },
    Men: {
      Men_Less_20: arrayMenLess20,
      Men_Over_20: arrayMenOver20,
      Men_Over_40: arrayMenOver40,
    },
  };
  return dataGroup;
}

/**
 *
 * @param {*} req
 * @param {*} res
 */
export async function registerInfectedAuto(req, res) {
  try {
    let contendData = await getData();
    contendData.forEach(function (element) {
      registerInfected(element);
    });
    
  } catch (error) {
    res.status(500).json({
      message: "error",
      data: {},
    });
  }
}

/**
 * 
 * @param {*} element 
 */
export async function registerInfected(element){
  try {
    let infected = await searchInfectedByIdCaso(element.id_de_caso);
    if (infected.length === 0) {
      let paramasCity = {
        cod_ciudad: element.ciudad_municipio,
        nombre_ciudad: element.ciudad_municipio_nom,
      };
      let city = await registerCity(paramasCity);
      let paramasFollowInfected = {
        fecha_reporte: new Date(element.fecha_reporte_web),
        fecha_notificacion: new Date(element.fecha_de_notificaci_n),
        fecha_sintomas: new Date(element.fecha_inicio_sintomas),
        fecha_diagnostico: new Date(element.fecha_diagnostico),
        fecha_recuperacion: new Date(element.fecha_recuperado),
      };
      let followInfected = await registerFollowInfected(paramasFollowInfected);
      let newInfected = await Infected.create({
        id_caso: element.id_de_caso,
        sexo: element.sexo,
        estado: element.estado,
        ubicacion: element.ubicacion,
        ciudadId: city.id,
        follow_infetedId: followInfected.id,
      });
    }
  } catch (error) {
    
  }
}
/**
 *
 * @param {*} id_caso
 */
export async function searchInfectedByIdCaso(id) {
  try {
    const infected = await Infected.findAll({
      where: {
        id_caso: id,
      },
    });
    console.log(infected);
    if (infected.length > 0) {
      console.log("al if");
      return infected;
    }
    return infected;
  } catch (error) {}
}
