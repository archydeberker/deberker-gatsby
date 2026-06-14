import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/cn';

// Body elements are styled globally via the `.R-body` rules in app/redesign.css
// (Newsreader serif body, coral accent links, Swiss-minimal headings). These
// wrappers only carry behaviour that CSS can't express (external link rels,
// inline-vs-block code detection, footnote/background span handling).
export const mdxComponents: MDXComponents = {
  a: ({ className, href, ...props }) => {
    const isExternal = href?.startsWith('http');
    const isFootnote =
      (className?.includes('easy-footnote') ?? false) || (href?.includes('easy-footnote') ?? false);

    return (
      <a
        {...props}
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
        className={cn(isFootnote && 'footnote', className)}
      />
    );
  },
  code: ({ className, ...props }) => {
    const isCodeBlock = className?.includes('language-');
    return (
      <code
        {...props}
        className={cn(isCodeBlock && 'block w-full whitespace-pre-wrap break-words', className)}
      />
    );
  },
  span: ({ className, ...props }) => {
    if (className?.includes('has-background')) {
      return (
        <span
          {...props}
          className={cn('rounded-[6px] bg-surface px-1 text-ink-soft', className)}
        />
      );
    }

    return <span {...props} className={className} />;
  },
};
