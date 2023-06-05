#!/usr/bin/env zsh

start() {
    cd packages/cns-connector
    SYNC_ENABLED=true docker compose \
        -f .dev/docker-compose.local.debug.yml \
        -f .dev/docker-compose.debug.stage.yml \
        up bc-1
}

cd "$(dirname "${ZSH_ARGZERO:A:h}")"
"$@"