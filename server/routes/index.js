const file = require('./fileRoutes');

module.exports = (route)=>{

    route.use('/api/files',file)
}