# OMDO - Open MicroServices Discovery and Orchestration

OMDO is an open MicroServices discovery and orchestration system that allow semantical discovery and consumption of public MicroServices using simple URL patterns. Key benifits of OMDO include:

-	**Simplicity**. No Semantic Web knowledge is required to make service offers or to discover services. Service offers and requests are all based on standard URLs. OMDO has not mandatory components or services. 
-	**Flexibility**. A centralized service registry is not necessary. No data contract or service consumption negotiations are needed. No specical bindings or protocols are used. Everything is done through standard HTTP requests and optional JSON payloads.
-	**Efficiency**. Service discovery, delegation and consumption can be folded into a single HTTP request.

## Basic Concepts
OMDO has three basic concepts:

- **Well-Known Fields (WKF)**: A WKF is an entity whose meaning is implicitly understood by service providers and service requestors. OMDO provides a public dictionary where a number of WKFs are defined. A WKF dictionary is for human service designers only. It’s not used during service discovery or consumption processes. You don’t have to use OMDO’s dictionary – you don’t have to use a dictionary at all. All WKFs are implicitly defined in this case. 
- **Well-known Verbs (WKV)**: A WKV is an operation that can be carried out on a WKF. OMDO provides a public list of WKVs such as “create”, “read” and “delete”. Similar to WFK, you can implicitly define WKVs for your own purposes. 
- **Semantic URL (SURL)**: A SURL is a standard URL following a fixed routing scheme, in the format of _object_/_predicate_?_complement_ (_WKF_/_WKV_?_WKF_=value). A SURL can use used as both a discovery request and a service request, allowing discovery, delegation and consumption be folded into one HTTP request.

## Getting Started
The easiest way to run OMDO yourself is to use Docker to launch a number of OMDO MicroServices containers:

    sudo docker run -d -p 8180:8180 --name wkf omdo/wkf-dict node wkf-dict.js
    [TBD] Sample registry service
    [TBD] Sample delegation service
    [TBD] Sample MicroServices

## Sample Discovery requests

- To read definition of a well-known field (WKF) named _p.geo.longitude_:
    http://omdo.cloudapp.net:8180/o.wkf/read?o.wkf.name=p.geo.longitude
  
  The above query is both a discovery request and a service request. When a registry or broker handles this request, it can return a 200 status code with actual service address to indicate a matching service offer. Or, it can directly forward the request to a service provider based on service request constraints such as QoS requirements. When a service provider handles this request, it directly returns the service response. 
