# Local internal APK download

The file `../LIMBUZZ-v1.0.1.apk` was inspected on 25 November 2026. Android SDK `apksigner verify --verbose --print-certs` reported a valid v2 signature with signer `CN=Android Debug` and certificate SHA-256 `fac61745dc0903786fb9ede62a962b399f7348f0bb6f899b8332667591033b9c`. `aapt dump badging` reported package `com.limbuzz.app`, version `1.0.1`, versionCode `2`, minimum API 24 (Android 7.0), and `arm64-v8a`. The file is 48,380,192 bytes with SHA-256 `817434b477dbde030aacd5a9af8ddce11668c8f16fc3dae2e73d6525c940d5e4`.

This is a **debug-signed internal test build**. It has not passed the release signing and physical-device checks needed for public distribution. The regular `src/config/release.ts` gate stays disabled.

The `/download` page offers a separate internal test link only when `pnpm dev` is running on `127.0.0.1`. The APK stays outside `public/`. The server checks the exact file size and SHA-256 before streaming it from `/api/internal-build`. The route refuses production mode, non-loopback hosts, and cross-site browser requests. It responds with attachment headers and `no-store`. A production build returns 404 at this route and omits the internal card.

Run the site locally from `limbuzz-web` with `pnpm dev`. If the APK is missing or its bytes change, the internal card disappears and the route returns 404. Do not copy this debug artifact into `public/` or set it as the public release URL. A release-signed APK still needs certificate, package/update, device, checksum, and hosting verification before the public gate can be enabled.
