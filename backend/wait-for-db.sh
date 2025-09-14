set -e

host="$1"
shift

echo "Aguardando PostgreSQL em $host..."

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "$POSTGRES_USER" -c '\q'; do
  echo "PostgreSQL não está pronto, aguardando 2s..."
  sleep 2
done

echo "PostgreSQL pronto! Iniciando comando: $@"
exec "$@"