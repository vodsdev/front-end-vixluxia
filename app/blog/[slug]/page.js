import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, ChevronRight, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';

// Mock data
const mockArticle = {
  title: "L'impact de l'Intelligence Artificielle sur le Design UI/UX en 2024",
  description: "Découvrez comment l'IA redéfinit la création d'interfaces et l'expérience utilisateur, avec des cas concrets et des outils de nouvelle génération.",
  publishDate: "15 Oct 2024",
  author: {
    name: "Alexandre Martin",
    role: "Lead UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    bio: "Passionné par l'innovation numérique, Alexandre explore les ponts entre le design centré utilisateur et les nouvelles technologies.",
  },
  coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600&h=800",
  tags: ["Design", "Intelligence Artificielle", "Innovation"],
  readTime: "8 min",
  toc: [
    { id: "introduction", title: "Introduction" },
    { id: "generative-design", title: "Le Design Génératif" },
    { id: "automation", title: "L'Automatisation des Tâches" },
    { id: "personalization", title: "Personnalisation Hyper-Ciblée" },
    { id: "conclusion", title: "Conclusion" }
  ]
};

export default function BlogPost({ params }) {
  const { slug } = params;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour au blog
        </Link>
      </div>

      {/* Hero Section */}
      <article className="container mx-auto px-4">
        <header className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {mockArticle.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            {mockArticle.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {mockArticle.description}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-y border-border">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border">
                <Image
                  src={mockArticle.author.avatar}
                  alt={mockArticle.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-foreground">{mockArticle.author.name}</div>
                <div className="text-sm text-muted-foreground">{mockArticle.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{mockArticle.publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{mockArticle.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] rounded-2xl overflow-hidden mb-16 shadow-2xl">
          <Image
            src={mockArticle.coverImage}
            alt="Article cover"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Layout */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Table of Contents */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Dans cet article</h3>
              <nav className="flex flex-col gap-3">
                {mockArticle.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.title}
                  </a>
                ))}
              </nav>

              <div className="mt-12">
                <h3 className="font-semibold text-sm mb-4 text-muted-foreground uppercase tracking-wider">Partager</h3>
                <div className="flex gap-4">
                  <button className="p-2 bg-secondary rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-secondary rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-secondary rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4 max-w-3xl">
            {/* Simulated Prose Formatting */}
            <div className="prose-custom text-lg text-muted-foreground leading-relaxed space-y-8">
              
              <h2 id="introduction" className="text-3xl font-bold text-foreground mt-12 mb-6 scroll-mt-24">Introduction</h2>
              <p>
                L'intelligence artificielle (IA) n'est plus une promesse lointaine ; elle est désormais au cœur de nos processus de création. En 2024, les designers UI/UX intègrent de plus en plus ces technologies pour accélérer la recherche, l'idéation et la production.
              </p>
              <p>
                Cette évolution soulève de nombreuses questions quant à l'avenir du métier. L'IA va-t-elle remplacer les designers ou, au contraire, décupler leur potentiel créatif ?
              </p>

              <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-xl text-foreground bg-secondary/30 rounded-r-lg my-10">
                "L'IA ne remplacera pas les designers, mais les designers qui utilisent l'IA remplaceront ceux qui ne le font pas."
              </blockquote>

              <h2 id="generative-design" className="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">Le Design Génératif</h2>
              <p>
                Des outils comme Midjourney, DALL-E ou encore les fonctionnalités d'IA générative intégrées à Figma (comme Magician ou Wireframe Designer) permettent de générer des concepts d'interface en quelques secondes à partir de simples prompts textuels.
              </p>
              
              <ul className="list-disc pl-6 space-y-3 my-6">
                <li><strong className="text-foreground">Exploration rapide :</strong> Possibilité de tester des dizaines de directions visuelles en un temps record.</li>
                <li><strong className="text-foreground">Génération d'assets :</strong> Création d'icônes, d'illustrations et d'images de placeholder sur mesure.</li>
                <li><strong className="text-foreground">Variations de layout :</strong> Proposition automatique de différentes dispositions d'éléments selon le contexte.</li>
              </ul>

              <div className="relative w-full aspect-video rounded-xl overflow-hidden my-10 bg-secondary">
                <Image 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" 
                  alt="Design Interface"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 id="automation" className="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">L'Automatisation des Tâches</h2>
              <p>
                L'une des plus grandes valeurs ajoutées de l'IA aujourd'tui réside dans sa capacité à prendre en charge les tâches répétitives et chronophages. 
              </p>
              <p>
                La création de <em>Design Systems</em>, la déclinaison de composants, ou même la génération de textes factices pertinents (finis les Lorem Ipsum génériques) peuvent désormais être largement automatisées. Cela permet aux équipes de se concentrer sur la stratégie, l'empathie utilisateur et la résolution de problèmes complexes.
              </p>

              <h2 id="personalization" className="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">Personnalisation Hyper-Ciblée</h2>
              <p>
                Au-delà de la phase de conception, l'IA transforme l'expérience utilisateur finale en permettant une personnalisation en temps réel. En analysant les comportements des utilisateurs, les algorithmes peuvent adapter dynamiquement l'interface (couleurs, disposition, contenu mis en avant) pour répondre précisément aux besoins de chaque individu.
              </p>

              <h2 id="conclusion" className="text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24">Conclusion</h2>
              <p>
                L'année 2024 marque un tournant décisif. L'intégration de l'IA dans les processus de design UI/UX représente une formidable opportunité d'améliorer la qualité et la pertinence de nos créations. Le rôle du designer évolue : de simple exécutant graphique, il devient un véritable chef d'orchestre, guidant l'IA pour créer des expériences toujours plus exceptionnelles.
              </p>

            </div>

            {/* Author Bio Footer */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="bg-secondary/50 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                  <Image
                    src={mockArticle.author.avatar}
                    alt={mockArticle.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Écrit par {mockArticle.author.name}</h3>
                  <p className="text-primary font-medium text-sm mb-4">{mockArticle.author.role}</p>
                  <p className="text-muted-foreground">
                    {mockArticle.author.bio}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Mobile Share */}
            <div className="mt-12 lg:hidden flex justify-center gap-4">
              <span className="text-sm text-muted-foreground font-medium self-center mr-2">Partager :</span>
              <button className="p-3 bg-secondary rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-3 bg-secondary rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="p-3 bg-secondary rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
            </div>
            
          </div>
        </div>
      </article>
    </div>
  );
}
