# platziverse-mqtt

## `agent/connected`

``` js
{
  agent: {
    uuid, // auto generar
    username, // definir por configuración
    name, // definir por configuración
    hostname, // obtener del sistema operativo
    pid // obtener del proceso
  }
}
```

## `agent/disconnected`

``` js
{
  agent: {
    uuid
  }
}
```

## `agent/message`

``` js
{
  agent,
  metrics: [
    {
      type,
      value
    }
  ],
  timestamp // generar cuando creamos el mensaje
}
```

## NOTES
- Test the server from terminal:

```sh
npx mqtt pub -t 'agent/message' -h localhost -m 'Hello platziverse!'
```

- Always handle errors when use event emitters. This is a good practice in javacript projects.
- The `for of` is used because permit the use of await.
