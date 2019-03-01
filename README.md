# Time app Frontend

Esta aplicación se encarga de mostrar la hora, temperatura, latitude, longitude de algunas ciudades.

### Prerequisitos:

Node v8

npm 5.6.0 ó yarn 1.6.0

### Comandos:

Para levantar la aplicación en local:

    yarn install && yarn start

Para levantarla con Docker:

    docker build -t time-app-frontend .

    docker run -d -p=3000:3000 --name container-time-app-frontend time-app-frontend

La aplicación se expone en el puerto 3000.

### Variables de entorno

    SERVERSOCKET: Define a donde el cliente socket se debe conectar

### Link de inspiración

https://codepen.io/dervondenbergen/pen/dVPOwB
