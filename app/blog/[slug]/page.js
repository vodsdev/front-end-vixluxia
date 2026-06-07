import fs from 'fs';
import path from 'path';

export default async function BlogPost({ params }) {
  const { slug } = params;
  
  const contentDir = path.join(process.cwd(), 'content', 'blog');
  const filePath = path.join(contentDir, `${slug}.md`);

  let content = '';
  let metadata = {};

  try {
    const rawContent = await fs.promises.readFile(filePath, 'utf8');
    
    // basic frontmatter parser
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(rawContent);

    if (match) {
      const frontmatter = match[1];
      content = rawContent.replace(match[0], '').trim();
      
      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
          metadata[key.trim()] = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');
        }
      });
    } else {
      content = rawContent;
    }
  } catch (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <p>Could not find a blog post with the slug: {slug}</p>
      </div>
    );
  }

  return (
    <article className="container mx-auto py-10 px-4 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{metadata.title || slug}</h1>
        {(metadata.date || metadata.author) && (
          <p className="text-gray-500 text-sm">
            {metadata.date && <span>Published on {metadata.date}</span>}
            {metadata.author && <span className="ml-2">by {metadata.author}</span>}
          </p>
        )}
      </header>
      <div className="prose dark:prose-invert max-w-none">
        {content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('# ')) {
            return <h1 key={index} className="text-3xl font-bold mt-6 mb-4">{paragraph.replace('# ', '')}</h1>;
          }
          if (paragraph.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-bold mt-5 mb-3">{paragraph.replace('## ', '')}</h2>;
          }
          if (paragraph.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
          }
          return <p key={index} className="mb-4">{paragraph}</p>;
        })}
      </div>
    </article>
  );
}
