# Image du lecteur de relecture FME001 sur Railway.
# Construit chaque leçon studio du dépôt (modules/*/L*/lecon) et une page d'accueil qui
# les liste, puis les sert avec reader/server.mjs (mot de passe : ACCESS_PASSWORD,
# ACCESS_USER, comme le lecteur de relecture de CER001).
FROM node:22-bookworm-slim

WORKDIR /repo
COPY . .

RUN node reader/build.mjs \
 && rm -rf modules/*/L*/lecon/node_modules

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "reader/server.mjs"]
