#!/usr/bin/env zsh

start() {
    cd packages/cns-app-web
    npm run start
}

cd "$(dirname "${ZSH_ARGZERO:A:h}")"
"$@"

