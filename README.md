# cowlick-export-electron-bootstrap

## Install

```bash
npm i -D cowlick-export-electron-bootstrap
```

## Usage

Rewrite `package.json`:

```diff
    "scripts": {
+       "prepare:": "cowlick-export-electron-bootstrap",
        "publish": "cowlick-export-electron .",
```
