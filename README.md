# ok-portal (OpenFlux script transport)

OK.ru portal Calls → WebRTC DataChannel carrier for [OpenFlux](https://github.com/p1neappleXpress/OpenFlux).

## Files
- `ok-portal.flux` — signed package (import in app / `--script-path`)
- `main.js` + `main.js.sig` — same script as bare JS

## Author pubkey (ed25519 hex)
```
f59795ccfb39e28ea98d0762519c1017ea9e1b9231948c74fbc2d800bba39d3c
```

## Params
- `url` — join link `https://ok.ru/joincall/...`
- `cookies` — full `Cookie` header from ok.ru (needs `getCallToken` → `token`)
- `exit` — `true` on exit node
- `relay` — optional

## Notes
- Before `getCallToken`, script GETs `ok.ru/` and merges `Set-Cookie` (AUTHCODE / JSESSIONID refresh).
- Two different OK accounts (exit + client); same uid usually cannot peer with itself.
- Encryption key is **not** in Params — use OpenFlux `EncryptionKeyFile` / session key.

Version: 0.2.1
