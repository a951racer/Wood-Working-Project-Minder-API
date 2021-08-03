const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const Library = mongoose.model('LibraryItem')

exports.getItem = (req, res) => {
    const today = moment().utcOffset('America/Chicago').startOf('day').toDate()
    Library.find()
        .sort({name: 1})
        .exec((err, libraryItems) => {
        if (err) {
            res.send(err)
        }
        res.json(libraryItems)
    })
}

exports.getItemWithID = (req, res) => {
    Library.findById(req.params.itemId)
        .exec(function(err, item) {
        if (err) {
            res.send(err)
        }
        res.json(item)
    })
}

exports.addNewItem = (req, res) => {
    Library.create(req.body, (err, item) => {
        if (err) {
            res.send(err)
        }
        res.json(item)
    })
}

exports.updateItem = (req, res) => {
    let item = req.body
    Library.findOneAndUpdate({ _id: req.params.itemId}, item, { new: true }, (err, item) => {
        if (err) {
            res.send(err)
        }
        res.json(item)
    })
}

exports.deleteItem = (req, res) => {
    Library.remove({ _id: req.params.itemId }, (err, item) => {
        if (err) {
            res.send(err)
        }
        res.json({ message: 'Successfully deleted Library Item'})
    })
}
