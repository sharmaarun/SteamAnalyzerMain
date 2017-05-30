#! /bin/bash
echo '{"services":{"spark": ['`ps -aux | grep "java" | grep "org.apache.spark.deploy.master.Master" | awk '{printf "%s%s",sep,$2; sep=","} END{print ""}' `'],"hadoop": ['`ps -aux | grep "java" | grep "org.apache.hadoop.yarn" | awk '{printf "%s%s",sep,$2; sep=","} END{print ""}' `']}}'
