---
title: "EKS: Kubernetes PODs"
date: 2026-02-03
description: A Kubernetes Pod is the smallest deployable unit in Kubernetes, consisting of one or more containers that share storage and network resources.
summary: A Kubernetes Pod is the smallest deployable unit in Kubernetes, consisting of one or more containers that share storage and network resources.
draft: true
tags:
  - Terraform
  - EKS
categories:
  - DevOps
  - AWS
  - Containers
series: AWS EKS
---
{{< alert "circle-info" >}}

`kubectl` quick reference: [https://kubernetes.io/docs/reference/kubectl/quick-reference/](https://kubernetes.io/docs/reference/kubectl/quick-reference/)

{{< /alert >}}

{{< lead >}}

**PODs** are the smallest deployable units of computing that you can create and manage in Kubernetes.

A **POD** (as in a pod of whales or pea pod) is a group of one or more containers, with shared storage and network resources, and a specification for how to run the containers. 

A **POD**'s contents are always co-located and co-scheduled, and run in a shared context. A **POD** models an application-specific "logical host": it contains one or more application containers which are relatively tightly coupled. 

{{< /lead >}}

{{< alert "circle-info" >}}

**Kubernetes** does not deploy containers directly on the worker nodes. Container is encapsulated into a Kubernetes Object, named **POD**. A **POD** is a single instance of an application.

{{< /alert >}}
## PODs Demo

### Get Worker Nodes Status

- Verify if kubernetes worker nodes are ready.

```
# Get Worker Node Status
kubectl get nodes

# Get Worker Node Status with wide option
kubectl get nodes -o wide
```
### Create a Pod

- Create a Pod

```
kubectl run nginx --image=nginx #--port 80
```
### List Pods with wide option

- List pods with wide option which also provide Node information on which Pod is running

```
kubectl get pods -o wide
```
### Describe Pod

- Describe the POD, primarily required during troubleshooting.
- Events shown will be of a great help during troubleshooting.

```
# To get list of pod names
kubectl get pods

# Describe the Pod
kubectl describe pod nginx
```
## Expose Pod with a Service

- Expose pod with a service (NodePort Service) to access the application externally (from internet)
- **Ports**
    - **port:** Port on which node port service listens in Kubernetes cluster internally
    - **targetPort:** We define container port here on which our application is running.
    - **NodePort:** Worker Node port on which we can access our application.

```
# Expose Pod as a Service
kubectl expose pod nginx  --type=NodePort --port=80 --target-port=80 --name=nginx-service

# Get Service Info
kubectl get service
kubectl get svc

# Get Public IP of Worker Nodes
kubectl get nodes -o wide
```

- Access the Application using Public IP

```
http://<node1-public-ip>:<Node-Port>
```
## Interact with a Pod

### Verify Pod Logs

```
# Get Pod Name
kubectl get po

# Dump Pod logs
kubectl logs nginx

# Stream pod logs with -f option and access application to see logs
kubectl logs -f nginx
```

- **Important Notes**
    - Refer below link and search for **Interacting with running Pods** for additional log options
    - Troubleshooting skills are very important. So please go through all logging options available and master them.
    - **Reference:** [https://kubernetes.io/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
### Connect to Container in a POD

- **Connect to a Container in POD and execute commands**

```
# Connect to Nginx Container in a POD
kubectl exec -it nginx -- /bin/bash

# Execute some commands in Nginx container
ls
cd /usr/share/nginx/html
cat index.html
exit
```

- **Running individual commands in a Container**

```
kubectl exec -it nginx env

# Sample Commands
kubectl exec -it nginx -- env
kubectl exec -it nginx -- ls
kubectl exec -it nginx -- cat /usr/share/nginx/html/index.html
```
## Get YAML Output of Pod & Service

```
# Get pod definition YAML output
kubectl get pod nginx -o yaml   

# Get service definition YAML output
kubectl get service nginx -o yaml   
```
## Clean-Up

```
# Get all Objects in default namespace
kubectl get all

# Delete Services
kubectl delete svc nginx-service

# Delete Pod
kubectl delete pod nginx

# Get all Objects in default namespace
kubectl get all
```

---
## >> Sources <<

`kubectl` quick reference: https://kubernetes.io/docs/reference/kubectl/quick-reference/

Instructor's repo: https://github.com/stacksimplify/kubernetes-fundamentals/tree/master/02-PODs-with-kubectl
## >> Disclaimer <<

{{< disclaimer_terraform_on_AWS_EKS_26 >}}