#!/bin/sh

result=${PWD##*/}          # to assign to a variable
now=$(date +"%m_%d_%Y")

tar -zcvf ../"${PWD##*/}"-"$now".tar.gz ../"${PWD##*/}"