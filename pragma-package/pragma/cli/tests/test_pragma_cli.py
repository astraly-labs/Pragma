from cli import __app_name__, pragma_cli
from typer.testing import CliRunner

runner = CliRunner()


def test_version():
    result = runner.invoke(pragma_cli.app, ["--version"])
    assert result.exit_code == 0
    assert f"{__app_name__}\n" in result.stdout
