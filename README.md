# Portfólio de Desenvolvedor - Memory Grace

✨ Um site de portfólio imersivo com fundo de vídeo, animações de scroll, e um carrossel de projetos infinito. Feito com HTML, CSS e JavaScript (ES6+).

[Ver Demo Ao Vivo](https://caua-rego.github.io/memory-grace/) <!-- Substitua pela URL correta se for diferente -->

## Features

- **Hero com Vídeo de Fundo:** Uma introdução visualmente cativante com um vídeo em loop.
- **Carrossel de Projetos Infinito:** Uma vitrine de projetos que rola suavemente e sem interrupções, com pausa ao passar o mouse.
- **Tema Escuro Profissional:** Paleta de cores moderna e elegante que valoriza o conteúdo.
- **Animações Interativas:**
    - Efeito de máquina de escrever no título principal.
    - Animações de "revelar" ao rolar a página.
    - Feedback de clique nos botões.
- **Lightbox para Imagens:** Visualização de imagens dos projetos em tela cheia.
- **Navegação Inteligente:** O menu de navegação destaca a seção visível na página.
- **Design Totalmente Responsivo:** Layout otimizado para uma experiência perfeita em desktops, tablets e celulares, incluindo um menu "hambúrguer".

## Como Executar

Este é um projeto front-end estático, sem necessidade de servidor ou dependências.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/caua-rego/memory-grace.git
    ```
2.  **Navegue até o diretório:**
    ```bash
    cd memory-grace
    ```
3.  **Abra o `index.html`:**
    Abra o arquivo `index.html` no seu navegador de preferência.

## Como Customizar os Projetos

Para adicionar ou alterar os projetos exibidos no carrossel e na seção de destaque, edite o arquivo `assets/js/script.js`.

### Carrossel de Projetos

No início do arquivo, você encontrará um array chamado `projects`. Cada objeto neste array representa um projeto no carrossel.

```javascript
const projects = [
    { name: 'NOME-DO-PROJETO', img: 'URL_DA_IMAGEM', lang: 'Linguagem', color: 'cor_de_fundo', url: 'URL_DO_PROJETO' },
    // ... outros projetos
];
```

- `name`: O nome do seu projeto.
- `img`: A URL da imagem de preview.
- `lang`: A linguagem ou tecnologia principal.
- `color`: Uma classe de cor do Tailwind CSS para a tag de linguagem (ex: `bg-blue-600`).
- `url`: O link para o repositório ou demo do projeto.

### Projetos em Destaque

Para alterar os projetos na seção "Projetos em Destaque", edite o HTML diretamente no arquivo `index.html` dentro da seção `id="featured-projects"`.

```html
<div class="bg-[#161b22] rounded-lg overflow-hidden shadow-lg border border-[#21262d] reveal">
    <img src="URL_DA_IMAGEM" alt="Nome do Projeto" class="w-full h-48 object-cover">
    <div class="p-6">
        <h3 class="text-xl font-bold text-white mb-2">NOME DO PROJETO</h3>
        <p class="text-gray-400 mb-4">Descrição do projeto.</p>
        <a href="URL_DO_PROJETO" target="_blank" class="text-green-400 hover:text-green-300 transition">Ver Projeto &rarr;</a>
    </div>
</div>
```

## Como Fazer o Deploy no GitHub Pages

Você pode hospedar este site gratuitamente usando o GitHub Pages.

1.  **Crie um repositório no GitHub:** Se você ainda não o fez, crie um novo repositório no GitHub para o seu projeto.

2.  **Envie os arquivos para o repositório:**

    ```bash
    # Adicione todos os arquivos
    git add .

    # Crie um commit com uma mensagem
    git commit -m "Versão inicial do portfólio"

    # Adicione o remote do seu repositório (substitua a URL)
    git remote add origin https://github.com/seu-usuario/seu-repositorio.git

    # Envie os arquivos para o branch principal (main)
    git push -u origin main
    ```

3.  **Ative o GitHub Pages:**

    - No seu repositório no GitHub, vá para **Settings** (Configurações).
    - No menu lateral, clique em **Pages**.
    - Em "Branch", selecione `main` e a pasta `/ (root)`. Clique em **Save**.

4.  **Acesse seu site:**

    Após alguns minutos, seu site estará disponível em `https://seu-usuario.github.io/seu-repositorio/`.

## Tecnologias Usadas

- **HTML5**
- **Tailwind CSS** (para a estrutura de layout principal)
- **CSS3** (para animações customizadas, carrossel e responsividade)
- **JavaScript (ES6+)**
    - **Intersection Observer API** para animações de scroll e navegação inteligente.

## Preparação para Uso Comercial

Este repositório foi desenhado como um portfólio pessoal, mas pode ser preparado para uso comercial com alguns passos importantes:

1. Licenciamento e direitos de imagem
    - Substitua todas as imagens de placeholder (picsum) por imagens próprias ou licenciadas (compradas ou de domínio público).
    - Mantenha registro das licenças (arquivos LICENSEs ou notas em uma pasta `legal/`) para qualquer ativo de terceiros.

2. Termos e privacidade
    - Se o site coletar dados (formulários, analytics), adicione uma página `privacy.html` com a política de privacidade e um consentimento claro para cookies/analytics.

3. Analytics e performance
    - Prefira soluções de analytics que respeitem privacidade (por exemplo Plausible, Fathom) para sites comerciais.
    - Configure build para gerar imagens otimizadas (WebP, diferentes resoluções) e um CDN para assets estáticos.

4. Contratos e presença legal
    - Forneça informações de contato comerciais e, se aplicável, termos de serviço e contratos para clientes.

5. Deploy & CI
    - Adicione um pipeline de CI (GitHub Actions) que rode lint, testes simples e o build, e que faça deploy automático para GitHub Pages ou para uma hospedagem comercial.

6. Checklist pré-lançamento comercial
    - [ ] Substituir imagens de placeholder por assets licenciados
    - [ ] Verificar acessibilidade (WCAG basics)
    - [ ] Políticas de privacidade e cookies publicadas
    - [ ] Testes de performance (Lighthouse) aprovados
    - [ ] Pipeline de build & deploy configurado
    - [ ] Backup / versionamento de assets críticos

Se quiser, eu posso:
- preparar um branch `feat/commercial-ready` que implemente esses passos básicos (README, pasta `legal/`, configuração inicial do GitHub Actions),
- ou começar simplesmente substituindo as imagens de placeholder por arquivos locais otimizados.