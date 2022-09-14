## EMPIRIC CLI

TO run the CLI, please use:

```bash
pip3 install empiric
alias empiric-cli="python3 -m empiric.cli"
empiric-cli init
```

The cli is able to do a variety of commands.  To list run:
```bash
empiric-cli --help
```

You can also initialize your project using:
```
empiric-cli devnet &  # or run in a separate terminal
empiric-cli init
```

This creates an init file in the local directory ./cli-config.ini

or you can use the quickstart command to create a config with a generated private key and deployed account contract, as well as pulling from the devnet faucet.
```
empiric-cli quickstart -f
```

In order to deploy contracts, you can run:

```
empiric-cli contracts deploy
```
