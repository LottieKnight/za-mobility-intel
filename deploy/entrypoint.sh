#!/bin/sh
set -e
# Ingest snapshots land in /data/uploads; a fresh named volume is root-owned,
# so claim it for the runtime user before handing over.
mkdir -p /srv/za-mobility-intel/data/uploads
chown -R node:node /srv/za-mobility-intel/data/uploads
exec su node -s /bin/sh -c 'exec node /srv/za-mobility-intel/server.js'