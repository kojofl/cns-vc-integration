#!/usr/bin/env zsh

setopt nullglob # no error on empty globs

build() {
    build_target="${1:-"build:notest"}"

    # Load nx build targets from nx.json in to array and check whether selected
    # build target exists.
    nx_build_targets=("${(@f)$(jq -r '.targetDefaults | keys[]' ./nx.json)}")
    if (($nx_build_targets[(Ie)${build_target}])); then
        npx nx run-many --target=$build_target
    else
        echo "Invalid nx build target '$build_target' (allowed: $nx_build_targets)." >&2
        exit 1
    fi
}

clean() {
    # TODO: Implement and use clean "target" for every package.
    rm -rf pnpm-lock.yaml
    rm -rf ./**/node_modules
    rm -rf ./**/dist
    rm -rf ./**/dist-test
    rm -rf ./**/lib-web
}

depgraph() {
    npx nx dep-graph
}

cd "$(dirname "${ZSH_ARGZERO:A:h}")"
case "$1" in
clean)
    clean
    ;;
depgraph)
    depgraph
    ;;
build*)
    build "$1"
    ;;
*)
    "$@"
    ;;
esac