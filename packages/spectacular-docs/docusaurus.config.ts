import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import type * as TypedocPlugin from 'docusaurus-plugin-typedoc';
import { themes as prismThemes } from 'prism-react-renderer';
import type { TypeDocOptions } from 'typedoc';

const organizationName = 'ngworker';
const projectName = 'ngworker';

const config: Config = {
  baseUrl: '/ngworker/',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  markdown: {
    format: 'detect',
    mdx1Compat: {
      admonitions: false,
      comments: false,
      headingIds: false,
    },
  },
  organizationName,
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../spectacular/src/index.ts'],
        excludeInternal: true,
        excludePrivate: true,
        sidebar: {
          pretty: true,
          typescript: true,
        },
        tsconfig: '../spectacular/tsconfig.lib.prod.json',
        out: './docs/api',
      } satisfies TypeDocOptions &
        Omit<TypedocPlugin.PluginOptions, 'sidebar'> & {
          sidebar: Partial<TypedocPlugin.PluginOptions['sidebar']>;
        },
    ],
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/ngworker/ngworker/edit/main/packages/spectacular-docs',
          lastVersion: '17.0',
          versions: {
            current: {
              label: '18.0 (next)',
            },
          },
        },
        blog: {
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/ngworker/ngworker/edit/main/packages/spectacular-docs/blog',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
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
      copyright: `© ${new Date().getFullYear()} ngworkers. Licensed under the MIT license. Logo by Felipe Zambrano. Artwork by vectorjuice.`,
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/ucZWfa2Tyb',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/spectacular',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/results?search_query=spectacular+ngworker',
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
          type: 'docsVersion',
          label: 'Docs',
          activeBaseRegex: '/docs/$',
          position: 'left',
        },
        {
          type: 'doc',
          label: 'Application',
          docId: 'application-testing/index',
          position: 'left',
        },
        {
          type: 'doc',
          label: 'Feature',
          docId: 'feature-testing/index',
          position: 'left',
        },
        {
          type: 'doc',
          label: 'Pipe',
          docId: 'pipe-testing/index',
          position: 'left',
        },
        {
          type: 'doc',
          label: 'API',
          docId: 'api/index',
          position: 'left',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
      ],
      logo: {
        alt: 'Spectacular logo',
        src: 'img/logo.png',
      },
      title: 'Spectacular',
    },
    prism: {
      darkTheme: prismThemes.shadesOfPurple,
      defaultLanguage: 'typescript',
      theme: prismThemes.shadesOfPurple,
    },
  } satisfies Preset.ThemeConfig,
  url: 'https://ngworker.github.io',
};

export default config;
