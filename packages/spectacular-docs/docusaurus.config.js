const shadesOfPurpleTheme = require('prism-react-renderer/themes/shadesOfPurple');

const organizationName = 'ngworker';
const projectName = 'ngworker';

module.exports = {
  baseUrl: '/ngworker/',
  favicon: 'img/favicon.ico',
  onBrokenLinks: 'error',
  onBrokenMarkdownLinks: 'warn',
  organizationName,
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['./packages/spectacular/src/index.ts'],
        tsconfig: './packages/spectacular/tsconfig.lib.prod.json',
      },
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  projectName,
  tagline: 'Spectacular Angular integration testing.',
  title: 'Spectacular',
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    image: 'img/logo.png',
    footer: {
      copyright: `© ${new Date().getFullYear()} ngworkers. Logo by Felipe Zambrano. Art by vectorjuice.`,
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
            {
              label: 'API',
              to: 'docs/api/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/spectacular',
            },
            {
              label: 'YouTube',
              href:
                'https://www.youtube.com/results?search_query=spectacular+ngworker',
            },
          ],
        },
        {
          title: 'Package',
          items: [
            {
              href: `https://github.com/${organizationName}/${projectName}`,
              label: 'GitHub',
            },
            {
              href: 'https://npmjs.com/package/@ngworker/spectacular',
              label: 'NPM',
            },
          ],
        },
      ],
      logo: {
        alt: 'Spectacular logo',
        href: '/',
        src: 'img/logo.png',
      },
      style: 'dark',
    },
    navbar: {
      items: [
        {
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
          to: 'docs/',
        },
        {
          label: 'Blog',
          position: 'left',
          to: 'blog',
        },
      ],
      logo: {
        alt: 'Spectacular logo',
        src: 'img/logo.png',
      },
      title: 'Spectacular',
    },
    prism: {
      darkTheme: shadesOfPurpleTheme,
      defaultLanguage: 'typescript',
      theme: shadesOfPurpleTheme,
    },
  },
  url: 'https://ngworker.github.io',
};
