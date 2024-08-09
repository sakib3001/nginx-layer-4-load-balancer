# Nginx-Layer-4-Load-Balancer

This project demonstrates how to set up an NGINX load balancer using Docker containers. It includes a configuration for Layer 4 (TCP) load balancing, enabling efficient traffic distribution across multiple backend servers. 

## Features
- **Layer 4 Load Balancing:** Route TCP traffic across multiple backend servers for applications like databases or other non-HTTP services.
- **Protocol Agnostic:** Works with any protocol (HTTP, HTTPS, FTP, etc.) since it doesn’t analyze the content of the request.

- **Faster Routing:** Because it only deals with IP addresses and ports, Layer 4 load balancing is generally faster and more efficient.

- **Lower Resource Usage:** Uses fewer CPU and memory resources since it doesn’t need to interpret higher-level protocols.

## Prerequisites
Before you begin, ensure you have the following tools installed on your machine:
- [Docker Engine](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Run The Project

- #### Clone the project

```bash
  https://github.com/sakib3001/nginx-layer-4-load-balancer.git

```

- #### Go to the project directory

```bash
 cd nginx-layer-4-load-balancer
```

- #### Creating the containers

```bash
  docker compose up -d --build
```

## Custom Configuration `nginx.conf`

``` nginx.cnf
events {}

    stream {

    upstream apps {
        server app1:3000;
        server app2:9999;
    }
    
    log_format layer4_format '$remote_addr [$time_local] "$proxy_protocol_addr" '
                             '"$proxy_protocol_port" "$upstream_addr" '
                             '$protocol $status $bytes_sent $bytes_received '    ;
                        
    server {
        listen 9000;
        proxy_pass apps;

        # If the backend server does not respond within 10 seconds, the connection will be closed.
        # For example, if a client request is being proxied to app1 and app1 takes more than 10 seconds to send data back, the connection will be terminated by Nginx.
        proxy_timeout 10s;

        # If Nginx cannot establish a connection to the backend server within 10 seconds, it will stop trying.
        # For example, if Nginx attempts to connect to app1 and it takes more than 10 seconds to establish the connection, Nginx will terminate the attempt and can try another backend server if configured to do so.
        proxy_connect_timeout 10s;

        # Error handling
        # If an error or timeout occurs, try the next upstream server.
        proxy_next_upstream on;

        # Enable Logging
        access_log /var/log/nginx/stream_access.log layer4_format;
        error_log /var/log/nginx/stream_error.log;
    }
  
}
```

## Observer Load Balancing on The Browser
 
#### Hit this and refresh 
```bash
  localhost:9000
```

## Destroy The Containers
 
#### Stop All the containers in the docker-compose.yml
```bash
  docker compose stop
```
#### To release all the resources 
```bash
  docker compose down
```

## My Blog
For your better understanding read my blog
- [Documentation](https://ikasakib.hashnode.dev/layer-4-load-balancing-using-nginx)
