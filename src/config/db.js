const { Sequelize } = require("sequelize");


const sequelize = new Sequelize('simple_app_react_node', 'root','',{
    host:'localhost',
    dialect:'mysql',
    // pool:{max:5,min:0,idel:10000}
});
(async()=>{
    await sequelize.sync({force: false});
})();
// (async()=>{
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// })()

module.exports = sequelize;