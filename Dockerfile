# ZA Mobility Intelligence — zero-dependency deploy image
FROM node:22-alpine

WORKDIR /srv/za-mobility-intel

COPY server.js ./
COPY deploy/entrypoint.sh ./entrypoint.sh
COPY public ./public
COPY data ./data

# Ingest snapshots land here; must survive container upgrades.
VOLUME /srv/za-mobility-intel/data/uploads

ENV PORT=4173
EXPOSE 4173

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:4173/api/alerts >/dev/null || exit 1

USER root
ENTRYPOINT ["/bin/sh", "/srv/za-mobility-intel/entrypoint.sh"]