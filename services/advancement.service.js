var Advancement = require('../models/advancement.model');

exports.getUserAdvancements = async function (query, page, limit) {

    try {
        var adv = await Advancement.find(query).populate("chunks");
        return adv;
    } catch (e) {
        throw Error('Erreur')
    }
}
