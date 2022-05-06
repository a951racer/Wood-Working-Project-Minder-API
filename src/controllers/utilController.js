const ObjectId = require('mongodb').ObjectId

exports.getDBId = async (req, res) => {
    const newId = new ObjectId()
    res.json({id: newId});
};
