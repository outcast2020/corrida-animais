# Corrida do Zodíaco Chinês

Mini-game educativo em HTML, CSS e JavaScript puro para trabalhar a lenda da corrida dos 12 animais do zodíaco chinês.

## Como jogar em sala

1. O estudante digita o nome.
2. Opcionalmente, escolhe até 3 cartões para representar sua participação.
3. O narrador conta a história.
4. Os estudantes viram os cartões na ordem correta.
5. Se clicarem no animal errado, o jogo não avança.
6. Quando todos os 12 animais atravessam o rio, acontece a festa do Imperador de Jade.

## Ordem usada

A ordem está na sequência clássica do zodíaco chinês:

1. Rato — 鼠 — shǔ
2. Boi — 牛 — niú
3. Tigre — 虎 — hǔ
4. Coelho — 兔 — tù
5. Dragão — 龙 — lóng
6. Serpente — 蛇 — shé
7. Cavalo — 马 — mǎ
8. Cabra — 羊 — yáng
9. Macaco — 猴 — hóu
10. Galo — 鸡 — jī
11. Cão — 狗 — gǒu
12. Porco — 猪 — zhū

## Música

A música é gerada pelo próprio navegador com WebAudio usando uma melodia pentatônica original. Não há arquivo MP3 externo e não há dependência de direitos autorais.

## Deploy no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie estes arquivos para a raiz do repositório:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
3. Vá em **Settings > Pages**.
4. Em **Build and deployment**, selecione:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Salve e aguarde o link do GitHub Pages.

## Personalização rápida

- Para mudar os textos da história, edite o array `animals` em `app.js`.
- Para mudar cores, edite as variáveis no início do `styles.css`.
- Para substituir a música gerada por um arquivo próprio, adicione um `<audio>` no `index.html` e remova/ignore as funções de WebAudio no `app.js`.
