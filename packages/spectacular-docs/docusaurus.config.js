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
          editUrl:
            'https://github.com/ngworker/ngworker/edit/main/packages/spectacular-docs',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/ngworker/ngworker/edit/main/packages/spectacular-docs/blog',
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
      copyright: `© ${new Date().getFullYear()} ngworkers. Logo by Felipe Zambrano. Artwork by vectorjuice.`,
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Spectacular',
              to: 'docs/',
            },
            {
              label: 'Application testing',
              to: 'docs/application-testing/',
            },
            {
              label: 'Feature testing',
              to: 'docs/feature-testing/',
            },
            {
              label: 'Pipe testing',
              to: 'docs/pipe-testing/',
            },
            {
              label: 'API reference',
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
