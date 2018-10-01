#!/bin/sh

if [ -z "$EAP_HOME" ]; then
 echo "Need to set EAP_HOME env"
 exit
fi
    mvn clean package
    cp ./target/addressbook-html5.war $EAP_HOME/standalone_oidc/deployments/
