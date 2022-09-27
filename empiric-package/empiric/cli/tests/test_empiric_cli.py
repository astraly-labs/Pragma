from cli import __app_name__, empiric_cli
from typer.testing import CliRunner

runner = CliRunner()


def test_version():
    result = runner.invoke(empiric_cli.app, ["--version"])
    assert result.exit_code == 0
    assert f"{__app_name__}\n" in result.stdout
