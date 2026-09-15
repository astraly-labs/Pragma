<!-- markdownlint-disable -->

![image](https://github.com/Astraly-Labs/Pragma/assets/12902455/45243fd4-5a1d-4b85-864f-2ceca50c7f79)

<!-- markdownlint-restore -->

[![Project license](https://img.shields.io/github/license/Astraly-Labs/Pragma.svg?style=flat-square)](LICENSE)
[![Pull Requests welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/Astraly-Labs/Pragma/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
<a href="https://twitter.com/PragmaOracle">
<img src="https://img.shields.io/twitter/follow/PragmaOracle?style=social"/>
</a> <a href="https://github.com/Astraly-Labs/Pragma">
<img src="https://img.shields.io/github/stars/Astraly-Labs/Pragma?style=social"/>
</a> <a href="https://docs.pragma.build/">
<img src="https://img.shields.io/badge/Documentation-Website-yellow"/> </a>

# 🧩 Pragma: Provable Oracle 💚

Welcome to **Pragma**, a modular provable oracle 🧩 leveraging [Starknet](https://www.starknet.io/)
to enable computational data feeds at scale!

## 🌟 Features

- Built on Starknet 🐺
- Fully Modular 🌐
- Track-record of accuracy and resilience 🏎️
- Comprehensive documentation 📚
- Active development and community support 🤝

## 🤝 Contribute

We're always looking for passionate developers to join our community.

## Explorer networks

`/assets` defaults to Starknet mainnet. `/assets?source=miden` shows Miden
testnet medians from `miden.pragma.build`; feed links retain `network=miden`.
The same-origin `/api/miden` proxy polls the existing batch prices endpoint.
Observation times, source counts and publisher activity are unavailable from
that endpoint, so the explorer does not infer them or substitute exchange stats.

When Miden mainnet is ready, update **all** fields of `MIDEN_DEPLOYMENT` in
`src/lib/explorer-networks.ts` with the verified network, API base, block explorer
and oracle/publisher accounts. The labels and account links follow that config;
the existing Miden feed URLs stay valid. Keep testnet configured until the mainnet
API is verified to return the same already-scaled `{ symbol, price }[]` contract.
Run `bun scripts/check-miden-explorer.ts`, `bun run type-check`, `bun run build`,
and check network switching and a feed detail against the new deployment.

## Sharing and search metadata

Page titles, descriptions, canonical URLs and social text use `src/lib/metadata.ts`.
Sharing cards use the current brand assets and the shared `src/lib/og.tsx` renderer.
Explorer cards include the selected network; Miden labels and image URLs follow
the deployment configuration when mainnet becomes available.

After changing card artwork, bump the `v` value in explicitly configured image
URLs so sharing services fetch a new image. Existing messages may retain cached
previews. Verify a running production build with
`bun scripts/check-metadata.ts http://localhost:3000`.

## 📖 License

This project is licensed under the **MIT license**.

See [LICENSE](LICENSE) for more information.

Happy coding! 🎉
