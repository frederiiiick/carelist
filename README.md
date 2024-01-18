# **CareList**

A simple tasks list web application

## Installation / Setup

The project is running on [docker](https://www.docker.com/get-started/) so you need to set it up on your computer.

>After installing docker to your computer you can now build and run the project.

**Build Command**
```bash
docker-compose build
```
>Then after the packages and dependencies are installed successfully. You can now up the project.

**Up Command**
```bash
docker-compose up
```
>It should have 3 containers running:
- **client (frontend)**
- **server (backend)**
- **mysqldb (database)**

>The client and server will wait for the **mysqldb** container to finish the bootup, so it may take a while before the project can be viewed on the browser.

The client runs on [http://localhost:3000](http://localhost:3000) and the server on [http://localhost:3001/graphql](http://localhost:3001/graphql).

## License

[MIT](https://choosealicense.com/licenses/mit/)
