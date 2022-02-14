const getAll = require("./getAll")
const getById = require("./getById")
const create = require("./create")
const deleteById = require("./delete")
const update = require("./update")
const updateOne = require("./updateOne")

module.exports = {
    create,
    getAll,
    getById,
    update,
    updateOne,
    deleteById
}