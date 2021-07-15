// module.exports = {
//     /* Add Your Database URL */
//     database: process.env.database,
//     secret: process.env.secret || 882312
// }
export default {
    database: process.env.database,
    JWT_SECRET: process.env.secret || "882312"
}