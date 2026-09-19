# { skipy.dev }

My personal portfolio site — built with React, TypeScript, Vite and SCSS.
Live at [skipy.dev](https://skipy.dev).

## Open source

This site is open source. If you're building your own portfolio and see
something here you like — a component, an animation, the ASCII donut, the
whole layout — feel free to grab it. No need to ask, no need to credit,
just take what's useful and make it yours.

## Stack

- React 19 + TypeScript
- Vite
- SCSS (no component libraries, no Tailwind)
- Everything else (the terminal chrome, the marquee, the ASCII 3D donut) is
  hand-rolled, no extra dependencies

## Running locally

```bash
npm install
npm run dev      # dev server
npm run build    # production build
npm run lint     # eslint
```

## Structure

```
src/
  components/   one component per section (Hero, About, Stack, Experience, ...)
  data/         copy and content, kept separate from markup
  hooks/        the interactive bits (ASCII rendering, marquee, magnetic hover, ...)
```

## License

MIT — see [LICENSE](./LICENSE).
