#!/bin/bash
set -e

# Arranca SQL Server en segundo plano
/opt/mssql/bin/sqlservr &

# Espera hasta que esté listo
until /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -Q "SELECT 1" -C -h -1 > /dev/null 2>&1; do
  echo "Esperando SQL Server..."
  sleep 5
done

echo "SQL Server listo. Ejecutando inicialización..."

run_sql() {
  local file=$1
  echo "  Ejecutando $file"
  /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P $SA_PASSWORD -i "$file" -C || {
    echo "Error al ejecutar $file"
    exit 1
  }
}

for script in /usr/config/*.sql; do
  run_sql "$script"
done

echo "Inicialización finalizada"

wait
