// update item
function(doc,req) {
    var Updates = require('lib/updateHelpers');

    var set_params = Updates.makeParamSetter(doc, req);

    if (! doc) {
        // Creating a new thing
        doc = { _id: req.uuid, type: 'item' };
    } else if (doc.type !== 'item') {
        //return [null, 'error:'+doc._id+' is not an item'];
        throw({forbidden: doc._id+' is not an item'});
    }

    var param;

    // These are all strings
    set_params(['barcode', 'name', 'sku', 'description']);

    // These are integers
    set_params(['cost-cents', 'price-cents'], parseInt);
    // These are floats to convert to integer cents
    set_params(['cost','price'],
                Updates.dollars,
                function(name) {
                    return name+'-cents';
                });

    // These are boolean
    set_params(['is-obsolete'],
                Updates.boolean);
                

    return [doc, JSON.stringify(doc)];

}
