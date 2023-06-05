#!/usr/bin/env zsh

start() {
    cd packages/connector-tui
    npm run start
}

cd "$(dirname "${ZSH_ARGZERO:A:h}")"
"$@"
