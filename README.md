# Accelo API Documentation

Powering the documentation at [api.accelo.com/docs/](https://api.accelo.com/docs/)

## Getting Started

### Prerequisites

You're going to need:

 - **Linux or macOS** — Windows may work, but is unsupported.
 - **Ruby, version 2.3.1 or newer**
 - **Bundler** — If Ruby is already installed, but the `bundle` command doesn't work, just run `gem install bundler` in a terminal.

### Running Preview

```shell
# either run this to run locally
bundle install
bundle exec middleman server

# OR run this to run with vagrant
vagrant up
```

You can now see the docs at http://localhost:4567.

### Deploying

The Accelo Public API Docs are now automatically deployed via a github action `.github/workflows/deploy.yml` which triggers
when changes are applied to main.

If you wish to manually deploy the documentation, it can be done via the `deploy.sh` script.

### Note on JavaScript Runtime

For those who don't have JavaScript runtime or are experiencing JavaScript runtime issues with ExecJS, it is recommended to add the [rubyracer gem](https://github.com/cowboyd/therubyracer) to your gemfile and run `bundle` again.

## Need help?

To report problems or ask questions please post to our [community forum](https://community.accelo.com/) and someone will be happy to help :smiley:

If you see issues or would like to make an improvement in the documentation please don't hesitate to contribute with a pull request.

## Special Thanks

- A big thanks to all the contributors and maintainers of [Slate](https://github.com/lord/slate) :heart: ; and
- Even **bigger** thanks to [Matthew H](https://github.com/matthewhughes112) - the primary author of these docs! :tada:

## Maintenance

### Upgrading Slate

To upgrade slate, please merge the upstream main into a new branch off of main. As this process may result in conflicts and breaking changes, it should go through the usual pull request process before being deployed on main.

```shell
git checkout main
git checkout -b slate-upgrade
git fetch upstream
git merge upstream/main
```


