FROM nginx:alpine

RUN apk add --no-cache openssl dos2unix fail2ban iptables ip6tables

COPY entrypoint.sh /entrypoint.sh
COPY nginx.conf /etc/nginx/nginx.conf
COPY jail.local /etc/fail2ban/jail.local
COPY nginx-429.conf /etc/fail2ban/filter.d/nginx-429.conf

RUN rm -f /etc/fail2ban/jail.d/*.conf

RUN dos2unix /entrypoint.sh && chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]