# platziverse-api

## NOTES
- Check the api with `httpie`:

``` sh
http http://localhost:3000/api/agents
```

- We use `express-asyncif` to enable async await in express middleware.

- We can pass permissions in payload of JWT.

- Read a JWT payload

``` js
const payload = Buffer.from(token.payload, 'base64').toString()

console.log(payload)
```

- Use `jq` (install with brew) to format json outputs in the console.
