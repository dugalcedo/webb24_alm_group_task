const User = require('../models/User.js')
const Accommodation = require('../models/Accommodation.js')

function doAssociations() {
    User.hasMany(Accommodation, { onDelete: 'CASCADE', foreignKey: "userId" })
    Accommodation.belongsTo(User, { foreignKey: "userId" })
}

module.exports = {
    doAssociations
}