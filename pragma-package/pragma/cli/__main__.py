from pragma.cli import __app_name__, pragma_cli


def main():
    pragma_cli.app(prog_name=__app_name__)


if __name__ == "__main__":
    main()
