#! /bin/bash
/home/hadoop/hadoop/bin/hdfs dfs -cat `/home/hadoop/hadoop/bin/hdfs dfs -ls "$1" | awk  'BEGIN{FS=" ";lv=0}{ct=substr($7,4,2)+0;printf("%s %s\n",ct,$8)}' | sort -nr | awk 'BEGIN{FS=" ";lv=0}{ct=$1+0; if(lv==0 || lv==ct){lv=ct ;printf("%s ",$2)}}'`
