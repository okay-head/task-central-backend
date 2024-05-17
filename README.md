Node and express backend for the taskcentral app

Hosted on Render aka 50 seconds cold start bummer

<a href='https://task-central-backend.onrender.com/'>Ping here while you read readme</a>

### Routes roundup

```js
// AUTHENTICATION
.post('/signup')
.post('/signin')
.post('/logout')

```

```js
// TASKS
.get('tasks')
.get('tasks/:id')

.post('tasks')

.patch('tasks/:id')

.delete('tasks/:id')
// it is mandatory to send a payload with each of the methods post patch and delete or set the content type header to application/json

```

### Features

- Cookie based authentication
- Thoroughly tested with postman
- Role based authorization
- CSRF protection (see more below)
- Filtering at server level (graphQL seems enticing)
- [Beautiful UI](https://taskcentral.netlify.app/) to complement the API

For CSRF protection, three things have been implemented-

- CHIPS or cookies having independent partitioned state. This prevents other sites to even access your cookies, be it formdata or anything else. If the attacker redirects the user to any to other site, the cookie jar would be empty

- Say this fails, or maybe my understanding of it is incorrect, I implemented anti-CSRF tokens, both in my backend as well as frontend.

- But let's say, this could still be vulnerable, or maybe you want to use my API's for your own app and don't want to make changes to your user-facing app, already in deployment, that's why I've restricted the requests to only AJAX requests, which are protected by the browsers.
  The type of requests that are disallowed are known as `simple` requests. For a request to be deemed simple, it must have one of the following content types - `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`

Read more-
https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
