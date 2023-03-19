## PRAGMA CLI

TO run the CLI, please use:

```bash
pip3 install pragma
alias pragma-cli="python3 -m pragma.cli"
pragma-cli init
```

The cli is able to do a variety of commands. To list run:

```bash
pragma-cli --help
```

You can also initialize your project using:

```
pragma-cli devnet &  # or run in a separate terminal
pragma-cli init
```

This creates an init file in the local directory ./cli-config.ini

or you can use the quickstart command to create a config with a generated private key and deployed account contract, as well as pulling from the devnet faucet.

```
pragma-cli quickstart -f
```

In order to deploy contracts, you can run:

```
pragma-cli contracts deploy
```
