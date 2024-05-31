#!/bin/sh

# wait create config.yaml
sleep 5s

# secret-key
secret_key=$(grep '^secret:' /root/.config/mihomo/config.yaml | awk '{print $2}' | tr -d '\n')
regex='secret="[^"]*"'
new_secret="secret=\"$secret_key\""
sed -i "s|$regex|$new_secret|g" /usr/share/nginx/html/index.html

# start nginx
/usr/sbin/nginx

# start mihomo
/mihomo
