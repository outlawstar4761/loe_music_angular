#!/bin/sh

CONFIG_PATH=/app/dist/assets/config/config.json

mkdir -p "$(dirname $CONFIG_PATH)"

cat <<EOF > $CONFIG_PATH
{
  "API_ENDPOINT": "${API_ENDPOINT}",
  "LOE_DOMAIN": "${LOE_DOMAIN}",
  "AUTH_CLIENT_ID": "${AUTH_CLIENT_ID}",
  "AUTH_DISCOVERY_URI": "${AUTH_DISCOVERY_URI}",
  "AUTH_REDIRECT_URL": "${AUTH_REDIRECT_URL}",
  "AUTH_LOGOUT_URL": "${AUTH_LOGOUT_URL}",
  "AUTH_SCOPE": "${AUTH_SCOPE}"
}
EOF

exec "$@"
