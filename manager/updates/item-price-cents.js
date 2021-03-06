// update the price-cents of an item
function(doc,req) {
    var Updates = require('lib/updateHelpers');

    if (! doc) {
        // Creating a new thing
        return [ null, { code: 404, json: { reason: 'No document with that id'}}];
    } else if (doc.type !== 'item') {
        return [ null, { code: 403, json: { reason: doc._id+' is not an item'}}];
    }

    var set_params = Updates.makeParamSetter(doc, req);
    set_params(['v'],
                Updates.integer,
                function() { return 'price-cents' });

    return [doc, JSON.stringify(doc)];
}
