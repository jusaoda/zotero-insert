from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json

root = Path(__file__).resolve().parent
version = json.loads((root / "manifest.json").read_text())["version"]
output = root / "dist" / f"selection-zh-{version}.xpi"
output.parent.mkdir(exist_ok=True)
with ZipFile(output, "w", ZIP_DEFLATED) as archive:
    for name in ("manifest.json", "bootstrap.js", "preferences.xhtml", "preferences.js"):
        archive.write(root / name, name)
with ZipFile(output) as archive:
    assert archive.testzip() is None
print(output)
