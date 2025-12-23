---
title: Docker basics
date: 2026-01-01
description: Docker is a platform that allows you to develop, ship, and run applications in lightweight, portable containers...
summary: Docker is a platform that allows you to develop, ship, and run applications in lightweight, portable containers...
draft: false
tags:
  - Docker
categories:
  - DevOps
  - Containers
---
{{< lead >}}
**Docker** is a platform that allows you to develop, ship, and run applications in lightweight, portable **containers**. These containers package your application and its dependencies, ensuring it runs consistently across different environments, such as development, testing, and production.
{{< /lead >}}

| <font color=#EB4925>External Resources</font> »           |                                       |                                       |
| --------------------------------------------------------- | ------------------------------------- | ------------------------------------- |
| [Docker official Documentation](https://docs.docker.com/) | [Docker Hub](https://hub.docker.com/) | [Docker.com](https://www.docker.com/) |
## Why Containers?

- **Flexible** - Complex apps can be easily containerized.
- **Lightweight** - Containers use fewer resources than virtual machines.
- **Portable** - You can build locally, deploy to the cloud and run everywhere.
- **Loosely Coupled** - Replace or upgrade containers without affecting others.
- **Scalable** - Easily scale containers across data centers.
- **Secure** - Containers provide isolation out of he box.

{{< mermaid >}}

graph LR

%% -------------------------
%% Hardware + Hypervisor
%% -------------------------
subgraph HW[Hardware Layer]
    A[Hardware]
end

subgraph HV[Hypervisor Layer]
    B[Hypervisor]
end

A --> B

%% -------------------------
%% Virtual Machines Path
%% -------------------------
subgraph VMs[Virtual Machines]
    C1[VM 1]
    C2[VM 2]
    C3[VM 3]
end

B --> C1
B --> C2
B --> C3

subgraph OS1[Guest OS in VM 1]
    D1[Guest OS]
end
subgraph OS2[Guest OS in VM 2]
    D2[Guest OS]
end
subgraph OS3[Guest OS in VM 3]
    D3[Guest OS]
end

C1 --> D1
C2 --> D2
C3 --> D3

%% -------------------------
%% Docker Path
%% -------------------------
subgraph DOCKER[VM running Docker]
    E[Guest OS]
    F[Docker Engine]
end

B --> E
E --> F

subgraph CONTAINERS[Containers]
    G1[Container 1]
    G2[Container 2]
    G3[Container 3]
    G4[Container 4]
end

F --> G1
F --> G2
F --> G3
F --> G4

%% -------------------------
%% Styling
%% -------------------------
classDef hardware fill:#EB4925,color:#000;
classDef hypervisor fill:#C7EB25,color:#000;
classDef vm fill:#EBAC25,color:#000;
classDef guestos fill:#ffe9b3,color:#000;
classDef dockerhost fill:#2564EB,color:#000;
classDef container fill:#d6f0ff,color:#000;

%% New: border for Containers subgraph
classDef containerGroup stroke:#d6f0ff,stroke-width:2px;

class A hardware
class B hypervisor
class C1,C2,C3 vm
class D1,D2,D3 guestos
class E guestos
class F dockerhost
class G1,G2,G3,G4 container

%% Apply border to the Containers subgraph title
class CONTAINERS containerGroup

{{< /mermaid >}}
## Docker Terminology

- **Docker Daemon**
	- The Docker daemon (dockerd) listens for Docker API requests and manages Docker objects such as *images*, *containers*, *networks* and *volumes*.
- **Docker Client**
	- Docker client can be present on either Docker Host or any other machine (local desktop).
	- The Docker client (docker) is the primary way that many Docker users interact with Docker.
	- When you use commands such as `docker run`, the client sends commands to dockerd (Docker Daemon), which carries them out.
	- The docker command uses the Docker API.
	- The Docker client can communicate with more than one daemon.
- **Docker Images**
	- An `image` is a read-only template with instructions for creating the Docker container.
	- Often, and image is based on another image - with some additional customization.
- **Docker Containers**
	- A container isa runnable instance of an image.
	- We can *create*, *start*, *stop*, *move* or *delete* a container using the Docker API or CLI.
	- We can connect to a container to one or more networks, attach storage to it or even create a new image based on it's current state.
	- When a container is removed, any changes to its state that are not stored in the persistent storage will disappear.
- **Docker Registry** (Docker Hub)
	- A Docker Registry stores Docker Images.
	- Docker Hub is a public registry that anyone can use. Docker is configured to look for images on Docker Hub by default.
	- We can run own, private registry.
	- When we use the `docker pull` or `docker run` commands, the required images are pulled from our configured registry.
	- When we use the `docker push` command, our image is pushed to our configured registry.
## Essential Docker commands

https://cheatsheets.zip/docker



---
## >> Sources <<


## >> Disclaimer <<

{{< disclaimer_docker_25 >}}