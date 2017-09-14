# platziverse

## MQTT NOTES
- Test the server from terminal:

```sh
npx mqtt pub -t 'agent/message' -h localhost -m 'Hello platziverse!'
```

- Always handle errors when use event emitters. This is a good practice in javacript projects.
- The `for of` is used because permit the use of await.


## AGENT NOTES
- You can use `utils.promisify` to convert a callback function to a promise.


## API NOTES
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


## WEB NOTES
- In utils the function pipe is used to transmit all events of agent event emitter trought events of socket event emitter.
- The proxy is used to avoid share the api keys between client and the API. This is used when client need connect to other services trought http.


### CLI NOTES
- With the property `bin` in package.json file the script is added to PATH when install de module.
- Write `#!/usr/bin/env node` in the begining of script file to use the script from command line.
- The package `minimist` is a parcer of `process.argv`.
- The package `args` is another module used to parce commands. Check it. Is very util to show helps.


## DEBUG NOTES

### longjohn package
- longjohn is used to log an expanded stacktrace.

### Inspect with chrome DevTools
- Use the flag --inspect to debug node with chrome DevTools.
- Use `chrome://inspect` to open in chrome.
- Use the profiler tab of DevTools to check performance of the running code.
- Use the memory tab to check memory leaks. Do this taking a snapshot by intervals and compare the memory in each interval.

## DEPLOY NOTES

### Prepare production
- Check if all servers (api, mqtt, web) run the `start` npm script with `NODE_ENV=production`.
- `envify` is a transform of browserify used to pass environment variables in web app.
- `ansible` is a tools to build deploy scripts.
- `build-essential` is a package to instal tools to install binaries in ubuntu.
- the `inventory.ini` is used by `ansible` to config the host to run the scripts.

In nginx use this header to enable websockets see platziverse-web/files/platzivers-web.service

``` sh
proxy_set_header      Upgrade $http_upgrade;
proxy_set_header      Connection "upgrade";
```

#### Vagrant
- Use `vagrant` to create virtual machines for development environments.

``` sh
vagrant init
# select the config.vm.box

vagrant up
```

- Create ssh keys in deploy folder and conect

``` sh
ssh-keygen -t rsa -C "nicolasmejiaco@gmail.com - deploy"

vagrant ssh
```

- Autorize the root user
``` sh
sudo su -

# Paste the public key in this file
vim .ssh/autorized_keys

exit
```

- Check the login:

``` sh
ssh root@127.0.0.1 -p 2222 -i ssh/deploy
```

To enable acces with root user in ubunt/xenial:

```sh
sudo sed -i 's/prohibit-password/yes/' /etc/ssh/sshd_config
sudo systemctl restart sshd
```

#### Deploy with ansible
``` sh
# Deploy backent playbook
ansible-playbook -i inventory.ini backend.yml --private-key ssh/deploy

# Deploy frontend playbook
ansible-playbook -i inventory.ini frontend.yml --private-key ssh/deploy
```
