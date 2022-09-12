from empiric.cli import __app_name__, empiric_cli


def main():
    empiric_cli.app(prog_name=__app_name__)


if __name__ == "__main__":
    main()
