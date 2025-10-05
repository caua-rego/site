# TODO — Memory Grace

Este arquivo centraliza melhorias, bugs e próximos passos para o site.

## Prioridade Imediata
 [x] Tornar a lista de linguagens dinâmica (ler `data-lang` dos cards e gerar botões automaticamente)
- [ ] Garantir que o `mobile-menu` tenha foco gerenciado (trap focus quando aberto)

## Curto Prazo (melhor UX / performance)
- [ ] Substituir imagens do picsum por imagens reais no repositório (WebP + thumbs)
- [ ] Gerar `srcset` a partir de imagens locais e remover dependência de picsum
- [ ] Implementar um job de GitHub Actions para otimizar imagens (imagemin / sharp)
- [ ] Adicionar `alt` descritivos mais ricos para imagens dos projetos

## Médio Prazo (arquitetura)
- [ ] Migrar partes interativas (carrossel, featured projects) para Preact/React com build (Vite)
- [ ] Criar um pequeno pipeline de build + deploy para GitHub Pages (npm scripts ou Actions)
- [ ] Adicionar testes rodando via GitHub Actions (lint + basic unit tests)

## Longo Prazo (polimento / observabilidade)
- [ ] Implementar analytics leve (eventos de clique, visão de projetos)
- [ ] A/B test de CTA do Hero (teste de cores/texto)
- [ ] Criar páginas de caso de uso/estudos de caso para projetos principais

## Bugs conhecidos / observações
- O carrossel atual usa animação CSS; para controles acessíveis é melhor migrar para um componente JS.
- Se você planeja usar React Router (BrowserRouter) no futuro, é preciso configurar fallback 404 para GitHub Pages ou usar HashRouter.

## Como testar localmente (servidor simples)
```bash
# a partir da raiz do projeto
# abre um servidor simples (Node.js) sem instalar nada permanentemente
npx http-server -c-1
# ou, se preferir Python 3
python3 -m http.server 8000
```

## Como contribuir (rapidamente)
1. Crie uma branch: `git checkout -b feat/<nome-da-feature>`
2. Faça mudanças, rode testes locais (abrir `index.html` ou rodar `npx http-server`).
3. Commit com mensagem descritiva e envie: `git push origin feat/<nome-da-feature>`
4. Abra PR e descreva o que foi feito.

---
Se quiser, eu já começo a implementar qualquer item desta lista — diga qual e eu implemento com commits pequenos e verificáveis.