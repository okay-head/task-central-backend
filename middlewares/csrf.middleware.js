// CSRF can happen in a lot of ways
// but if we can bring CORS into the picture, most of these won't happen
// requests using formdata and urlEncoded streams is the most common cause for CORS attack
// disallow 'simple requests' as outlined by the OWASP
// For a request to be deemed simple, it must have one of the following content types - application/x-www-form-urlencoded, multipart/form-data or text/plain

// restrict the requests to use JSON API's
const csrf = (req, res, next) => {
	console.log({
		header: req.get('Content-Type'),
		xhr: req.xhr,
		method: req.method,
	})
	if (
		req.get('Content-Type') === 'application/json' ||
		req.xhr ||
		req.method === 'GET'
	) {
		next()
		return
	}
	return res
		.status(400)
		.json({ message: 'Only JSON AJAX requests are allowed.' })
}

module.exports = csrf

/* Methods */
// req.get(field)
// Returns the specified HTTP request header field (case-insensitive match).

// req.xhr
// A Boolean property that is true if the request’s X-Requested-With header field is “XMLHttpRequest”, indicating that the request was issued by a client library such as jQuery.
