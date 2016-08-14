#! /bin/sh

# handle command 'start'
echo "SSA v1.0"
echo "========"
#check if argument is empty
if [ -z $1 ]; then 
	echo "Invalid argument!"
	echo "Usage : ./start-ui.sh start|stop"
	exit
fi
if [ $1 = "start" ]; then
	echo "Starting Web UI Interface..."
	cd '../webui'
	npm start 2>&1 >> './logs/ui.log' &
	echo "Done."
	echo "Logging the output to logs/ui.log"
fi
if [ $1 = "stop" ]; then
	echo "Stopping Web UI Interface..."
	cd '../webui'
	npm stop
	#ps -ef | grep lite-server | awk '{print $2}' | xargs kill -9 &
	echo "Done."
fi
ps -ef | grep lite-server | awk '{print $2}' | xargs kill -9
exit
