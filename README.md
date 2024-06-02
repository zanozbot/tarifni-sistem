# Vizualizacija novega tarifnega sistema

## Uvod

S 1. julijem 2024 bo stopil v veljavo novi tarifni sistem. Cilj naj bi bil spodbuditi uporabnike, da s prilagajanjem odjema prispevajo k optimizaciji distribucijskega in tudi širše elektroenergetskega sistema [1].

Zaradi lažje predstave in razumevanja novega tarifnega sistema za gospodinjstva sem se odločil, da naredim enostavno vizualizacijo časovnih blokov.
Vsak časovni blok ima določeno tudi ceno električne energije, ki se meri v EUR / kWh [3]. To omogoči uporabnikom, da lažje optimiziramo svoj odjem električne energije.

## Vizualizacija

Vizualizacija je sestavljena iz dveh delov:

1. Pripravljanje podatkov za vizualizacijo.

   - Podatke se gradi za 14 dni od trenutnega dneva v preteklost in 14 dni v prihodnost.

2. Uporaba knjižnice [vis.js](https://visjs.github.io/vis-timeline/docs/timeline/) za prikaz časovnih blokov.

## Uporaba

Za uporabo je potrebno imeti nameščen [Node.js](https://nodejs.org/en/).

1. Kloniraj repozitorij

```bash
git clone https://github.com/zanozbot/tarifni-sistem.git
```

2. Namesti potrebne knjižnice

```bash
npm install
```

3. Poženi aplikacijo

```bash
npm run dev
```

## Prispevki

Vesel bom vsakega prispevka, ki bo izboljšal to vizualizacijo.

Več informacij o prispevanju je na voljo na [povezavi](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project).

## Reference

- (1): https://www.zps.si/nasveti-in-vodniki/nov-sistem-obracuna-omreznine-za-elektricno-energijo-2023-11-16
- (2): https://www.elektro-ljubljana.si/novi-tarifni-sistem
- (3): https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina/2023-01-3431/akt-o-dolocitvi-tarifnih-postavk-za-omreznine-elektrooperaterjev
