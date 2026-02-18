#!/bin/bash

# Este script inicia SQL Server y espera a que esté listo antes de ejecutar la inicialización de la BD.

/opt/mssql/bin/sqlservr & # Inicia SQL Server en segundo plano

# Bucle para esperar que el servidor SQL esté listo
echo "Esperando que SQL Server inicie..."
# Intentar conectar con sqlcmd. $SA_PASSWORD viene de docker-compose.yml/.env
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -Q "SELECT 1" -C -h -1 > /dev/null 2>&1
STATUS=$?
while [ $STATUS -ne 0 ]; do
    sleep 5s
    echo "SQL Server aún no está listo. Reintentando..."
    /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -Q "SELECT 1" -C -h -1 > /dev/null 2>&1
    STATUS=$?
done

echo "SQL Server iniciado. Ejecutando script de inicialización de BD..."

# Ejecuta el script de inicialización (crea BD, usuario, tablas, SPs)
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -i /usr/config/sqlinit.sql -C

echo "Base de datos SistemaServicioSocial inicializada correctamente."

# Mantén el proceso principal de SQL Server en ejecución para que el contenedor no se detenga
wait