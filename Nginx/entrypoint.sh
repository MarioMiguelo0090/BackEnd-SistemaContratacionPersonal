#!/bin/sh

if [ ! -f /etc/nginx/cert.pem ]; then
    openssl req -x509 -newkey rsa:4096 -nodes \
        -keyout /etc/nginx/key.pem \
        -out /etc/nginx/cert.pem \
        -days 365 \
        -subj "/CN=rysuv.com"
    chmod 644 /etc/nginx/cert.pem /etc/nginx/key.pem
fi

mkdir -p /var/log/nginx
mkdir -p /var/run/fail2ban

rm -f /var/log/nginx/access.log
touch /var/log/nginx/access.log

fail2ban-server -b -x

sleep 2

fail2ban-client status

exec /docker-entrypoint.sh "$@"