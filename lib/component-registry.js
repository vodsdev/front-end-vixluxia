import { CATEGORIES, PROMPTS } from '@/lib/prompts-data';

export const AUTHORS = [
  {
    id: 'vodsdev',
    name: 'Vodsenterprise',
    username: '@vodsdev',
    role: 'Owner & Lead Developer',
    avatar: 'VD',
    bio: 'Créateur de VixLuxia. Développeur full-stack.',
    links: { github: 'vodsdev', website: 'https://vods-info.tech', instagram: 'https://www.instagram.com/max_vods/' },
  },
  {
    id: 'vixluxia',
    name: 'VixLuxia Team',
    username: '@vixluxia',
    role: 'Core team',
    avatar: 'VX',
    bio: 'Maintains the official VixLuxia registry and premium templates.',
    links: { github: 'vodsdev', website: 'https://vixluxia.com' },
  },
];

const DIFFICULTIES = ['Easy', 'Medium', 'Advanced'];
const LICENSES = ['MIT', 'Commercial', 'Free for personal use'];

function hashString(value = '') {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function pick(list, seed) {
  return list[seed % list.length];
}

function extractDependencies(prompt = '') {
  const common = ['react', 'tailwindcss'];
  const deps = new Set(common);
  const known = ['framer-motion', 'lucide-react', 'class-variance-authority', '@radix-ui/react-slot', '@radix-ui/react-tooltip', 'cmdk', 'recharts'];

  known.forEach((dep) => {
    if (prompt.toLowerCase().includes(dep.toLowerCase())) deps.add(dep);
  });

  return Array.from(deps);
}

function extractPrimaryFileName(component) {
  const slug = component.id || component.name?.toLowerCase().replace(/\s+/g, '-');
  return `${slug}.tsx`;
}

export function extractPromptCode(prompt = '') {
  const match = prompt.match(/```tsx\s*([\s\S]*?)```/i);
  if (!match) return prompt;

  const lines = match[1].trim().split('\n');
  if (lines[0]?.endsWith('.tsx')) return lines.slice(1).join('\n').trim();
  return match[1].trim();
}

export function createInstallCommand(component) {
  const deps = component.dependencies?.filter((dep) => !['react', 'tailwindcss'].includes(dep)) || [];
  if (!deps.length) return 'npm install';
  return `npm install ${deps.join(' ')}`;
}

export function createImportPath(component) {
  const file = extractPrimaryFileName(component).replace(/\.tsx$/, '');
  const exportName = component.name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return `import { ${exportName || 'Component'} } from "@/components/ui/${file}";`;
}

export function enrichComponent(component, categorySlug, index = 0) {
  const seed = hashString(`${component.id}-${categorySlug}-${index}`);
  const author = pick(AUTHORS, seed);
  const category = CATEGORIES.find((item) => item.slug === categorySlug);
  const dependencies = extractDependencies(component.prompt);
  const isPremium = seed % 5 === 0;

  return {
    ...component,
    categorySlug,
    categoryName: category?.name || categorySlug,
    categoryEmoji: category?.emoji || '',
    author,
    dependencies,
    code: extractPromptCode(component.prompt),
    installCommand: createInstallCommand({ ...component, dependencies }),
    importSnippet: createImportPath(component),
    tags: [
      category?.name || categorySlug,
      pick(['Animated', 'Responsive', 'SaaS', 'Dashboard', 'Marketing', 'Accessible'], seed),
      pick(['Tailwind', 'Radix ready', 'Motion', 'Copy paste'], seed + 3),
    ],
    stats: {
      votes: 0,
      likes: 0,
      downloads: 0,
      comments: 0,
      copies: 0,
      rating: 5.0,
    },
    meta: {
      publishedAt: new Date(Date.now()).toISOString(),
      updatedAt: new Date(Date.now()).toISOString(),
      difficulty: pick(DIFFICULTIES, seed),
      license: pick(LICENSES, seed + 2),
      version: `1.0.0`,
      premium: isPremium,
      status: 'Stable',
      figmaReady: seed % 3 === 0,
    },
  };
}

export function getAllRegistryComponents() {
  return Object.entries(PROMPTS).flatMap(([slug, items]) =>
    items.map((item, index) => enrichComponent(item, slug, index))
  );
}

export function getRegistryComponentById(id) {
  return getAllRegistryComponents().find((component) => component.id === id) || null;
}

export function getAuthorsWithStats() {
  const components = getAllRegistryComponents();

  return AUTHORS.map((author) => {
    const owned = components.filter((component) => component.author.id === author.id);
    const totals = owned.reduce(
      (acc, component) => ({
        components: acc.components + 1,
        likes: acc.likes + component.stats.likes,
        downloads: acc.downloads + component.stats.downloads,
        votes: acc.votes + component.stats.votes,
      }),
      { components: 0, likes: 0, downloads: 0, votes: 0 }
    );

    return {
      ...author,
      stats: totals,
      tags: author.id === 'vodsdev' || author.id === 'vodsdev_alt' 
        ? ['Owner', ...Array.from(new Set(owned.flatMap((component) => component.tags).slice(0, 3)))]
        : Array.from(new Set(owned.flatMap((component) => component.tags).slice(0, 4))),
      featuredComponents: owned.slice(0, 3),
    };
  }).sort((a, b) => b.stats.likes - a.stats.likes);
}

export function getPublishedComponentsFromStorage() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('vixluxia-published-components') || '[]');
  } catch {
    return [];
  }
}
