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

```

### Features

- Cookie based authentication
- Thoroughly tested with postman
- Role based authorization
- CSRF protection
- Filtering at server level (graphQL seems enticing)
- [Beautiful UI](https://taskcentral.netlify.app/) to complement the API
