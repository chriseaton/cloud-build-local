import functions from '@google-cloud/functions-framework';

/**
 * The name of the registered GCP Function.
 */
const GCP_FUNCTION = 'my-sample-function';

/**
 * Processes the GCP HTTP request.
 * @param {Request} req
 * @param {Response} res
 */
const handler = async (req, res) => {
    //CORS
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        return;
    }
    //do stuff
    if (req.method === 'GET') {
        res.send('Hello Mars! ԅ(≖‿≖ԅ)');
        return;
    }
    res.status(400).send();
};

//startup
functions.http(GCP_FUNCTION, handler);

