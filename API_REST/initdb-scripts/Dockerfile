FROM mcr.microsoft.com/mssql/server:2022-latest

ENV ACCEPT_EULA=Y

COPY sqlinit.sql /usr/config/sqlinit.sql
COPY entrypoint.sh /usr/config/entrypoint.sh

USER root 
RUN chmod +x /usr/config/entrypoint.sh

CMD ["bash", "/usr/config/entrypoint.sh"]