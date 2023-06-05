const path = require("path");
const { execSync } = require("child_process");
const tmpPath = "./tmp";

const repos = {
  "cns-app-runtime": "https://github.com/nmshd/cns-app-runtime",
  "cns-app-web": "https://github.com/nmshd/cns-app-web",
  "cns-connector": "https://github.com/nmshd/cns-connector",
  "cns-consumption": "https://github.com/nmshd/cns-consumption",
  "cns-content": "https://github.com/nmshd/cns-content",
  "cns-crypto": "https://github.com/nmshd/cns-crypto",
  "cns-transport": "https://github.com/nmshd/cns-transport",
  "connector-tui": "https://github.com/nmshd/connector-tui",
  "cns-runtime": "https://github.com/nmshd/cns-runtime",
};

const cloneRepo = (repo) => {
  execSync(`rm -rf ${path.resolve(tmpPath)}`);

  execSync(`git clone ${repos[repo]} ${path.resolve(tmpPath, repo)}`, {
    stdio: [0, 1, 2],
    shell: "/bin/zsh",
  });

  execSync(`rm -rf ${path.resolve(tmpPath, repo, ".git")}`, {
    stdio: [0, 1, 2],
    shell: "/bin/zsh",
  });

  execSync(
    `cp -rnf ${
      path.resolve(tmpPath, repo, "*") + " " + path.resolve("packages", repo)
    }`,
    { stdio: [0, 1, 2], shell: "/bin/zsh" }
  );

  execSync(
    `cp -rnf ${
      path.resolve(tmpPath, repo, ".*") + " " + path.resolve("packages", repo)
    }`,
    { stdio: [0, 1, 2], shell: "/bin/zsh" }
  );

  execSync(`rm -rf ${path.resolve(tmpPath)}`, {
    stdio: [0, 1, 2],
    shell: "/bin/zsh",
  });
};

for (repo in repos) {
  console.log(`# Cloning repo ${repo}`);
  cloneRepo(repo);
}
