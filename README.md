# cowlick-export-electron-bootstrap

## Install

```bash
npm i -D cowlick-export-electron-bootstrap
```

## Usage

Rewrite `package.json`:

```diff
    "scripts": {
+       "bootstrap": "cowlick-export-electron-bootstrap",
+       "bundle": "npm run bootstrap && cowlick-export-electron .",
```
