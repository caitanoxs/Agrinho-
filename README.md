# Sucessão Rural Sustentável | Pesquisa 2026

Site de pesquisa escolar desenvolvido para o **Concurso Agrinho 2026** — categoria Programação.

## Objetivo do Tema

O projeto investiga a **Sucessão Rural Sustentável** no Brasil e no mundo, com foco em:
- Os desafios do envelhecimento do produtor rural e do êxodo para as cidades
- As teorias científicas que explicam a migração juvenil (Push-Pull, NELM, Wallerstein, Fatores Sociais)
- O panorama global: dados da FAO, IFAD e revisão sistemática de 87 artigos
- A distribuição geográfica desbalanceada das pesquisas brasileiras
- A importância da educação no campo (Pedagogia da Alternância)
- Políticas públicas que incentivam os jovens a permanecerem e inovarem no campo
- O paradoxo estrutural: a educação como vetor tanto de fortalecimento quanto de migração
- Recomendações estratégicas para pesquisadores, gestores e sociedade civil
- O protagonismo da nova geração rural com tecnologia, bioeconomia e agroecologia

O site apresenta dados, projeções, análises acadêmicas e informações sobre como a sucessão familiar pode ser viabilizada de forma sustentável, unindo tradição e inovação no campo brasileiro.

## Tecnologias Utilizadas

- **HTML5** — estrutura semântica e acessível
- **CSS3** — layout com Flexbox e Grid, animações 3D, transições, acordeão com `max-height`, efeito glow pulse, Media Queries para responsividade
- **JavaScript (Vanilla)** — manipulação do DOM, tradução PT/EN, tema, contraste, gráficos interativos em Canvas, slider, cursor customizado, efeito typewriter, acordeão com rotação de ícone, conexões entre partículas e indicador de progresso circular no scroll
- **Canvas API** — renderização dos gráficos de evolução da população rural e distribuição geográfica das pesquisas

Não foram utilizadas bibliotecas ou frameworks externos.

## Estrutura de Arquivos

```
buiu 2.0/
├── index.html          — Página principal (estrutura e conteúdo)
├── style.css           — Estilos visuais, animações e responsividade
├── script.js           — Lógica de interação, tradução, gráficos e animações
├── img/                — Pasta com imagens locais
│   ├── hero-campo.jpg
│   ├── slide-trabalhador.jpg
│   ├── slide-drone.jpg
│   ├── slide-credito.jpg
│   ├── educacao-estudantes.jpg
│   ├── prot-trator.jpg
│   ├── teoria-migracao.jpg
│   ├── global-panorama.jpg
│   ├── paradoxo-campo.jpg
│   └── recomendacoes.jpg
└── README.md           — Este arquivo
```

## Seções do Site

1. **Hero** — Título com efeito 3D de profundidade por palavra (sem estilos inline) + partículas de folhas flutuando no Canvas com conexões sutis
2. **Stats** — 4 contadores animados com partículas e brilho pulsante (glow pulse)
3. **Desafios** — Slider full-screen com transição de "abertura de porta"
4. **Teorias da Migração** — 4 cards com entrada alternada da esquerda/direita + inclinação 3D no hover
5. **Educação** — Layout split com imagem sticky e timeline 3D
6. **Panorama Global** — 4 novos contadores com dados da pesquisa aprofundada
7. **Políticas** — 6 cards dinâmicos com inclinação 3D no hover
8. **Ciclo da Sucessão** — Simulador interativo com 5 etapas clicáveis (Jovem → Educação → Crédito → Produção → Retorno)
9. **Revisão Sistemática** — Gráfico de barras em Canvas com distribuição geográfica
10. **Protagonismo** — Badges flutuantes em diferentes profundidades Z
11. **O Paradoxo** — Efeito typewriter (máquina de escrever) com cursor piscante
12. **Dados** — Gráfico de linha interativo com tooltip e separação real/projeção
13. **Recomendações** — 3 acordeões com animação suave de max-height e rotação de ícone (+ → ×)
14. **Referências Acadêmicas** — Tabela com 5 artigos científicos e animação stagger

## Animações e Interatividade

- **Canvas Particles no Hero** — Folhas/grama flutuando lentamente para cima com conexões sutis entre partículas próximas; pausam automaticamente quando o hero sai da tela
- **Ondas SVG** — 3 divisores de onda entre seções-chave (Hero→Stats, Revisão→Protagonismo, Paradoxo→Dados)
- **Simulador de Ciclo** — Clique nas 5 etapas para ver a explicação de cada fase da sucessão rural
- **Parallax 3D** — Hero responde ao movimento do mouse com rotação em profundidade
- **Cursor Customizado** — Forma de semente com anel pulsante, cresce em elementos interativos
- **Scroll Reveal** — Elementos aparecem suavemente ao entrar na viewport, com delays em cascata (stagger) em grupos
- **Contadores Animados** — Números contam de 0 até o valor com partículas explosivas e brilho pulsante (glow)
- **Indicador de Progresso Circular** — Botão "Voltar ao início" com anel SVG que preenche conforme o scroll da página
- **Inclinação 3D nos Cards** — Cards de políticas e teorias inclinam-se suavemente seguindo a posição do mouse

## Instruções de Uso

1. **Abrir localmente:**
   - Faça o download ou clone este repositório.
   - Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox).
   - Não é necessário servidor — o site funciona diretamente do arquivo local.

2. **Navegação:**
   - Use o menu superior para saltar entre as 13 seções.
   - No desktop, o site possui cursor customizado (formato de semente) e efeitos 3D de parallax no hero.
   - O slider de "Desafios" avança automaticamente — passe o mouse para pausar.

3. **Acessibilidade e preferências:**
   - Clique no botão **👤** (canto superior direito) para abrir o painel.
   - Alterne entre **modo escuro / claro** e **alto contraste**.
   - Aumente ou diminua o tamanho da fonte com **A+** e **A-**.
   - Troque o idioma para **Inglês (EN)** ou volte para **Português (PT)**.
   - Todas as preferências são salvas automaticamente no navegador.
   - O site respeita `prefers-reduced-motion`: se o usuário desativar animações no sistema, todas as animações 3D, partículas e cursor customizado são desabilitados.

4. **Gráficos interativos:**
   - Na seção "Dados", passe o mouse sobre os pontos do gráfico para ver os valores exatos.
   - Na seção "Revisão Sistemática", o gráfico de barras mostra a distribuição geográfica das pesquisas.
   - A linha pontilhada no gráfico de linha separa dados reais (2012-2021) das projeções (2024-2030).

5. **Responsividade:**
   - O site se adapta a celulares, tablets e desktops por meio de Media Queries CSS.
   - No mobile, o menu hambúrguer clona automaticamente os links do desktop.

## Créditos

- **Aluno:** Davi Caitano
- **Colégio:** Colégio Estadual Padre Cláudio Morelli
- **Orientador:** Rafael Biano

## Conformidade com as Regras do Concurso Agrinho

- **Zero frameworks/bibliotecas externas** — Apenas HTML, CSS e JavaScript puro
- **Zero estilos inline** — Nenhum atributo `style="..."` ou `onclick="..."` no HTML; toda a estilização está em `style.css`
- **Zero scripts internos** — Nenhuma tag `<script>` ou `<style>` dentro do HTML; toda a lógica está em `script.js`
- **Imagens locais** — Todas as 10 imagens estão na pasta `img/`, sem dependência de CDNs externas
- **Acessibilidade** — Tema escuro/claro, alto contraste, controle de tamanho de fonte, navegação por teclado, atributos ARIA e respeito a `prefers-reduced-motion`
- **Código comentado e identado** — Todo o JavaScript possui comentários explicativos em português
- **Responsivo** — Layout adaptável a mobile, tablet e desktop
- **Conteúdo autoral e adequado** — Pesquisa baseada em dados reais e referências acadêmicas, sem conteúdo inadequado

© 2026 — Pesquisa Escolar para o Concurso Agrinho
