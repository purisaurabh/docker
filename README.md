# DOCKER

- Docker is a platform that makes it easier to create, deploy, and run applications using containers. Containers allow developers to package an application along with all its dependencies (libraries, tools, etc.) so that it can run consistently across different environments

# Docker Container

- What are Containers? Think of containers as lightweight, isolated environments where an application runs. They contain everything the app needs, so it works the same no matter where it runs (on your computer, on someone else’s, or on a cloud server).

- Example: Imagine you're developing a Python app that needs a specific version of Python and some libraries. You can package your app and everything it needs in a Docker container. This ensures that it will run exactly the same on your laptop or any server.

# Docker Images

- What is a Docker Image? An image is like a blueprint for a container. It contains the application code, system libraries, and everything needed to run the app.

- Example: If you’re building a web app in Node.js, your Docker image will have the Node.js runtime, your app code, and any modules your app uses.

# Dockerfile

- What is a Dockerfile? A Dockerfile is a simple text file where you write instructions on how to build your Docker image. It tells Docker what to include in the image, like which operating system, app files, and commands to run.

# Docker Hub

- What is Docker Hub? Docker Hub is like a public library where you can find pre-built Docker images. You can pull (download) these images to use in your own containers, or you can push (upload) your own images for others to use.

- Example: If you need a MySQL database, you can just pull a MySQL Docker image from Docker Hub with the command:
  - docker pull mysql

# Docker Compose

- What is Docker Compose? Docker Compose is a tool for defining and running multi-container Docker applications. It lets you define all your containers, networks, and volumes in a single YAML file.

- Example: Let’s say you have a web app and a database. With Docker Compose, you can define both services in one file (docker-compose.yml):

- To run the file
  - docker-compose up

# Volumes

- What is a Volume? Volumes are used to store data in Docker. They allow you to persist data even if the container is deleted.

- Example: If you’re running a database in a container, you’ll want to store its data somewhere outside the container. You can use a volume to do that:

- command in dockerfile :docker run -v /my/local/dir:/var/lib/mysql mysql

# Docker Networks

- What is Docker Networking? Docker allows multiple containers to communicate with each other using networks. By default, Docker gives each container its own internal IP address.

- Example: If you have a web app container and a database container, they can communicate with each other on the same Docker network:

- Command :
  - docker network create my-network
  - docker run --network=my-network --name=db mysql
  - docker run --network=my-network --name=web my-web-app

# Docker Registry

- What is a Docker Registry? A Docker registry is a place to store and distribute Docker images. Docker Hub is a public registry, but companies can also have private registries.

- Example: If you build an image of your app, you can push it to a private registry so your team can access it:

- Command
  - docker push my-private-registry/my-app

# Docker Swarm

- What is Docker Swarm? Docker Swarm is a tool for managing a group (or "swarm") of Docker engines. It helps you run containers across multiple machines in a coordinated way.

- Example: You can have several servers running Docker, and Docker Swarm helps distribute your containers across them, ensuring high availability and scalability.
