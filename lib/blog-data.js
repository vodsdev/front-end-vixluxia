export const blogPosts = [
  {
    id: 1,
    title: 'The Future of Frontend Development in 2026',
    slug: 'future-frontend-development',
    excerpt: 'Explore the emerging trends, tools, and paradigms that are shaping the next generation of web applications and changing how developers work.',
    description: 'Explore the emerging trends, tools, and paradigms that are shaping the next generation of web applications and changing how developers work.',
    author: {
      name: 'Sarah Drasner',
      role: 'VP of Engineering',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      bio: 'Sarah is an award-winning speaker, Vue core team member, and author.',
    },
    date: 'Jun 4, 2026',
    publishDate: 'Jun 4, 2026',
    category: 'Trends',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80',
    tags: ['Frontend', 'Trends', '2026'],
    readTime: '5 min',
    toc: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'frameworks', title: 'The Evolution of Frameworks' },
      { id: 'tooling', title: 'Next-Gen Tooling' },
      { id: 'conclusion', title: 'Conclusion' }
    ],
    content: `
      <h2 id="introduction" class="text-3xl font-bold text-foreground mt-12 mb-6 scroll-mt-24">Introduction</h2>
      <p>Frontend development is moving faster than ever. In 2026, we are seeing a shift towards more intelligent tooling, edge-first rendering, and highly optimized build processes.</p>
      <p>Let's dive into what makes this year special.</p>

      <blockquote class="border-l-4 border-primary pl-6 py-2 italic text-xl text-foreground bg-secondary/30 rounded-r-lg my-10">
        "The web is no longer just a document viewer, it's a fully-fledged operating system."
      </blockquote>

      <h2 id="frameworks" class="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">The Evolution of Frameworks</h2>
      <p>React, Vue, and Svelte have all evolved significantly. Server Components are now the standard, bringing unprecedented performance gains by shipping less JavaScript to the client.</p>

      <h2 id="tooling" class="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">Next-Gen Tooling</h2>
      <p>Tools like Vite and Turbopack have redefined the developer experience with instant HMR and incredibly fast builds.</p>

      <h2 id="conclusion" class="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">Conclusion</h2>
      <p>As we look forward, the boundaries between frontend and backend will continue to blur, making full-stack development more accessible than ever.</p>
    `
  },
  {
    id: 2,
    title: 'Mastering Server Components in Next.js',
    slug: 'mastering-server-components',
    excerpt: 'A deep dive into React Server Components, how they work under the hood, and practical patterns for building high-performance applications.',
    description: 'A deep dive into React Server Components, how they work under the hood, and practical patterns for building high-performance applications.',
    author: {
      name: 'Dan Abramov',
      role: 'Software Engineer',
      avatar: 'https://i.pravatar.cc/150?u=dan',
      bio: 'Dan is a software engineer and co-author of Redux and Create React App.',
    },
    date: 'May 28, 2026',
    publishDate: 'May 28, 2026',
    category: 'Tutorial',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80',
    tags: ['React', 'Next.js', 'Tutorial'],
    readTime: '10 min',
    toc: [
      { id: 'intro', title: 'Introduction to Server Components' },
      { id: 'patterns', title: 'Practical Patterns' },
      { id: 'perf', title: 'Performance Improvements' },
    ],
    content: `
      <h2 id="intro" class="text-3xl font-bold text-foreground mt-12 mb-6 scroll-mt-24">Introduction to Server Components</h2>
      <p>Server components allow you to render components on the server and stream the result to the client, reducing the JavaScript bundle size.</p>
      
      <h2 id="patterns" class="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">Practical Patterns</h2>
      <p>Here are some patterns to effectively use server components in your Next.js applications...</p>

      <h2 id="perf" class="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">Performance Improvements</h2>
      <p>By moving data fetching to the server, you eliminate client-side waterfalls and improve the Time to First Byte (TTFB).</p>
    `
  },
  {
    id: 3,
    title: 'Design Systems at Scale',
    slug: 'design-systems-scale',
    excerpt: 'How to build and maintain a robust design system that works across multiple products, teams, and platforms without losing consistency.',
    description: 'How to build and maintain a robust design system that works across multiple products, teams, and platforms without losing consistency.',
    author: {
      name: 'Diana Mounter',
      role: 'Design Systems Lead',
      avatar: 'https://i.pravatar.cc/150?u=diana',
      bio: 'Diana leads design systems at scale, helping teams build consistent and accessible UI.',
    },
    date: 'May 15, 2026',
    publishDate: 'May 15, 2026',
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80',
    tags: ['Design Systems', 'UI/UX', 'Scale'],
    readTime: '7 min',
    toc: [
      { id: 'foundation', title: 'Building the Foundation' },
      { id: 'components', title: 'Component Library' },
      { id: 'adoption', title: 'Driving Adoption' },
    ],
    content: `
      <h2 id="foundation" class="text-3xl font-bold text-foreground mt-12 mb-6 scroll-mt-24">Building the Foundation</h2>
      <p>A solid foundation starts with a clear set of design tokens and principles.</p>
      
      <h2 id="components" class="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">Component Library</h2>
      <p>Creating flexible and reusable components is key to a successful design system.</p>

      <h2 id="adoption" class="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">Driving Adoption</h2>
      <p>Getting buy-in from multiple teams requires excellent documentation and support.</p>
    `
  },
  {
    id: 4,
    title: 'Optimizing Web Vitals for E-commerce',
    slug: 'optimizing-web-vitals',
    excerpt: 'Learn strategies to improve your LCP, INP, and CLS scores specifically tailored for complex e-commerce storefronts and high-traffic sites.',
    description: 'Learn strategies to improve your LCP, INP, and CLS scores specifically tailored for complex e-commerce storefronts and high-traffic sites.',
    author: {
      name: 'Addy Osmani',
      role: 'Engineering Manager',
      avatar: 'https://i.pravatar.cc/150?u=addy',
      bio: 'Addy focuses on web performance and building fast experiences for users globally.',
    },
    date: 'May 2, 2026',
    publishDate: 'May 2, 2026',
    category: 'Performance',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80',
    tags: ['Performance', 'Web Vitals', 'E-commerce'],
    readTime: '8 min',
    toc: [
      { id: 'lcp', title: 'Improving LCP' },
      { id: 'inp', title: 'Optimizing INP' },
      { id: 'cls', title: 'Minimizing CLS' },
    ],
    content: `
      <h2 id="lcp" class="text-3xl font-bold text-foreground mt-12 mb-6 scroll-mt-24">Improving LCP</h2>
      <p>Largest Contentful Paint is crucial for perceived load speed. Optimize your hero images and server response times.</p>
      
      <h2 id="inp" class="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">Optimizing INP</h2>
      <p>Interaction to Next Paint measures responsiveness. Reduce long tasks and break up your JavaScript.</p>

      <h2 id="cls" class="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">Minimizing CLS</h2>
      <p>Cumulative Layout Shift ensures visual stability. Always reserve space for images and ads.</p>
    `
  },
  {
    id: 5,
    title: 'State Management in 2026',
    slug: 'state-management-2026',
    excerpt: 'Evaluating the current ecosystem of state management libraries from Zustand to Jotai, and when to choose which tool for your project.',
    description: 'Evaluating the current ecosystem of state management libraries from Zustand to Jotai, and when to choose which tool for your project.',
    author: {
      name: 'Lee Robinson',
      role: 'VP of Developer Experience',
      avatar: 'https://i.pravatar.cc/150?u=lee',
      bio: 'Lee is a developer, writer, and creator focusing on React and Next.js.',
    },
    date: 'Apr 20, 2026',
    publishDate: 'Apr 20, 2026',
    category: 'Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&q=80',
    tags: ['State Management', 'React', 'Architecture'],
    readTime: '6 min',
    toc: [
      { id: 'overview', title: 'Overview of State Management' },
      { id: 'zustand', title: 'Zustand' },
      { id: 'jotai', title: 'Jotai' },
    ],
    content: `
      <h2 id="overview" class="text-3xl font-bold text-foreground mt-12 mb-6 scroll-mt-24">Overview of State Management</h2>
      <p>State management has evolved from complex boilerplate to simpler, more atomic solutions.</p>
      
      <h2 id="zustand" class="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">Zustand</h2>
      <p>Zustand provides a minimal API for global state management.</p>

      <h2 id="jotai" class="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">Jotai</h2>
      <p>Jotai offers an atomic approach to state, ideal for complex, deeply nested component trees.</p>
    `
  },
  {
    id: 6,
    title: 'Building Accessible Data Visualizations',
    slug: 'accessible-data-visualizations',
    excerpt: 'Practical techniques for ensuring your charts, graphs, and complex data representations are fully accessible to screen readers and keyboard users.',
    description: 'Practical techniques for ensuring your charts, graphs, and complex data representations are fully accessible to screen readers and keyboard users.',
    author: {
      name: 'Marcy Sutton',
      role: 'Accessibility Advocate',
      avatar: 'https://i.pravatar.cc/150?u=marcy',
      bio: 'Marcy is an independent web developer and accessibility advocate.',
    },
    date: 'Apr 10, 2026',
    publishDate: 'Apr 10, 2026',
    category: 'Accessibility',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
    tags: ['Accessibility', 'Data Viz'],
    readTime: '6 min',
    toc: [
      { id: 'importance', title: 'Why Accessibility Matters' },
      { id: 'techniques', title: 'Techniques for Charts' },
    ],
    content: `
      <h2 id="importance" class="text-3xl font-bold text-foreground mt-12 mb-6 scroll-mt-24">Why Accessibility Matters</h2>
      <p>Data visualization is often visual-first, but we must ensure screen readers can parse the data.</p>
      
      <h2 id="techniques" class="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">Techniques for Charts</h2>
      <p>Use aria-labels, describe your data, and always provide an accessible table alternative.</p>
    `
  }
];

export function getAllPosts() {
  return blogPosts;
}

export function getPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug);
}
