# OMDO - Open MicroServices Discovery and Orchestration

OMDO is an open MicroServices discovery and orchestration system that allow semantical discovery and consumption of public MicroServices using simple URL patterns. Key benifits of OMDO include:

-	**Simplicity**. No Semantic Web knowledge is required to make service offers or to discover services. Service offers and requests are all based on standard URLs. OMDO has not mandatory components or services. 
-	**Flexibility**. A centralized service registry is not necessary. No data contract or service consumption negotiations are needed. No specical bindings or protocols are used. Everything is done through standard HTTP requests and optional JSON payloads.
-	**Efficiency**. Service discovery, delegation and consumption can be folded into a single HTTP request, with built-in QoS and authenticaiton/authorization requirement supports.

## Basic Concepts
OMDO has three basic concepts:

- **Well-Known Fields (WKF)**: A WKF is an entity whose meaning is implicitly understood by service providers and service requestors. OMDO provides a public dictionary where a number of WKFs are defined. A WKF dictionary is for human service designers only. It’s not used during service discovery or consumption processes. You don’t have to use OMDO’s dictionary – you don’t have to use a dictionary at all. All WKFs are implicitly defined in this case. 
- **Well-known Verbs (WKV)**: A WKV is an operation that can be carried out on a WKF. OMDO provides a public list of WKVs such as “create”, “read” and “delete”. Similar to WFK, you can implicitly define WKVs for your own purposes. 
- **Semantic URL (SURL)**: A SURL is a standard URL following a fixed routing scheme, in the format of _object_/_predicate_\[?_complement_\[&_complement_]] (_WKF_/_WKV_?\[_WKF_=value\[&_WKF=value_]]). A SURL can use used as both a discovery request and a service request, allowing discovery, delegation and consumption be folded into one HTTP request.

## Getting Started
The easiest way to run OMDO yourself is to use Docker to launch a number of OMDO MicroServices containers:

    sudo docker run -d -p 8180:8180 --name wkf omdo/wkf-dict node wkf-dict.js
    sudo docker run -d -p 8280:8280 --name samples omdo/samples node omdo-math/omdo-math.js
    sudo docker run -d -p 8190:8190 --name registry omdo/registry node registry.js
    [TBD] Sample delegate/gateway service

## Sample Discovery/Consumption requests

- **To read definition of a well-known field (WKF) named _p.geo.longitude_ (discover/conume)**:

    http://omdo.cloudapp.net:8180/f.wkf/v.read?f.wkf.name=p.geo.longitude
  
  The above query is both a discovery request and a service request. When a registry or broker handles this request, it can return a 200 status code with actual service address to indicate a matching service offer. Or, it can directly forward the request to a service provider based on service request constraints such as QoS requirements. When a service provider handles this request, it directly returns the service response. 

- **To calculate the sum of an array (discover/consume)**:
    
    http://omdo.cloudapp.net:8280/p.math.numberlist/v.math.sum?f.value=1,2,3

    This query calculates the sum of a number list. In this case, the _p.math.numberlist_ is a public WKF, and the _v.math.sum_ is a public WKV. _o.value_ is one of the few OMDO's reserved keywords that indicates the payload of a service call. 

- **To discover a service that can approve an order (discover)**:

    my.protocol://sales.contoso.com/contoso.order/contoso.approve&f.security=m.omb0404.3&f.qos=5-2000
    
    This query uses private WKFs and WKVs. It's seeking for a service that can approve (_contoso.approve_) an order (_contoso.order_). It also specifies that the service needs to have 99.999% availability with response time no longer than 2 seconds (_m.qos=5-2000_), and the service needs to mandate identity authentication assurance levels to be at least 3 (OMB 04-04). The sample also shows that OMDO can be used in other protocols in addition to HTTP(S).

- **To discover a service that can look up street address by a lat/long coordinate (discover/delegate/consume)**:

    my.protocol://omdo.cloudapp.net/o.geo.coordinate/v.recall?f.values=37,-122&f.expected=o.geo.address&f.delegate=true&f.directcall=true
    
    This request locates and invokes a service that can project a lat/long coordinate to a street address. The _m.delegate_ parameter informs the service handler that the request can be forwarded to other service providers. This parameter enables distributed registries, service delegations as well as service gateways that provide high-availability/failover capabilities.

## Reserved WKFs

   WKF  | meaning
--------|--------
f.delegate|All discovery/service call to be forwarded
f.directcall|Allow service to be directly invoked during discovery
f.qos | Quality of Service (QoS) requirements
f.security|Authentication/authorization requirements
f.expected|Expected return WKF
    
