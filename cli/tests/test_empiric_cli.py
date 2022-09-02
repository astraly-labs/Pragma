from typer.testing import CliRunner

from cli import __app_name__, __version__, empiric_cli

runner = CliRunner()


def test_version():
    result = runner.invoke(empiric_cli.app, ["--version"])
    assert result.exit_code == 0
    assert f"{__app_name__} v{__version__}\n" in result.stdout
