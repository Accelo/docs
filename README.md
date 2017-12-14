# Accelo API Documentation

Powering the documentation at [api.accelo.com/docs](https://api.accelo.com/docs)

## Getting Started

### Prerequisites

You're going to need:

 - **Linux or OS X** — Windows may work, but is unsupported.
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

### Note on JavaScript Runtime

For those who don't have JavaScript runtime or are experiencing JavaScript runtime issues with ExecJS, it is recommended to add the [rubyracer gem](https://github.com/cowboyd/therubyracer) to your gemfile and run `bundle` again.

## For errors in our documentation

Please [submit an issue](https://github.com/Accelo/docs/issues) to the Accelo Docs GitHub and, of course, feel free to submit pull requests with fixes and improvements.

## Need API help?

[Post a question](https://groups.google.com/forum/#!forum/accelo-devs) on our forum and someone will be happy to help.

## Special Thanks

- A big thanks to all the contributors and maintainers of [Slate](https://github.com/lord/slate) :heart: ; and
- Even **bigger** thanks to [Matthew H](https://github.com/matthewhughes112) - the primary author of these docs! :tada:

## Maintenance

### Upgrading Slate

To upgrade slate, please merge the upstream master into a new branch off of master. As this process may result in conflicts and breaking changes, it should go through the usual pull request process before being deployed on master.

```shell
git checkout master
git checkout -b slate-upgrade
git fetch upstream
git merge upstream/master
```


