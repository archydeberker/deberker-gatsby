import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/cn';

export const mdxComponents: MDXComponents = {
  a: ({ className, href, ...props }) => {
    const isExternal = href?.startsWith('http');
    const isFootnote = className?.includes('easy-footnote') ?? false;

    return (
      <a
        {...props}
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
        className={cn(
          'break-words text-primary no-underline transition-colors hover:text-coral',
          isFootnote && 'font-sans text-[0.95rem]',
          className,
        )}
      />
    );
  },
  h1: ({ className, ...props }) => (
    <h1
      {...props}
      className={cn(
        'mb-6 mt-12 font-sans text-[2.488rem] font-black leading-[0.9] tracking-[-0.025em] text-black',
        className,
      )}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      {...props}
      className={cn(
        'mb-6 mt-12 font-sans text-[2.074rem] font-bold leading-[0.9] tracking-[-0.025em] text-heading',
        className,
      )}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      {...props}
      className={cn(
        'mb-6 mt-12 font-sans text-[1.728rem] font-bold leading-[0.9] tracking-[-0.025em] text-heading',
        className,
      )}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      {...props}
      className={cn(
        'mb-6 mt-12 font-sans text-[1.44rem] font-bold leading-[0.9] tracking-[-0.025em] text-heading',
        className,
      )}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      {...props}
      className={cn(
        'mb-6 mt-12 font-sans text-[1.2rem] font-bold leading-[0.9] tracking-[-0.025em] text-heading',
        className,
      )}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      {...props}
      className={cn(
        'mb-6 mt-12 font-sans text-[1rem] font-bold leading-[0.9] tracking-[-0.025em] text-heading',
        className,
      )}
    />
  ),
  p: ({ className, ...props }) => (
    <p {...props} className={cn('mb-8 p-0 leading-[1.625] text-text', className)} />
  ),
  ul: ({ className, ...props }) => (
    <ul
      {...props}
      className={cn('mb-8 list-inside list-disc p-0 leading-[1.625] text-text', className)}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      {...props}
      className={cn('mb-8 list-inside list-decimal p-0 leading-[1.625] text-text', className)}
    />
  ),
  li: ({ className, ...props }) => (
    <li {...props} className={cn('mb-4 pl-0 text-text', className)} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      {...props}
      className={cn(
        'mb-8 border-l-4 border-primary pl-6 pr-8 text-[1.2rem] italic text-text-muted max-sm:ml-0 max-sm:pl-4',
        className,
      )}
    />
  ),
  img: ({ className, alt, ...props }) => (
    <img {...props} alt={alt ?? ''} loading="lazy" className={cn('my-4 h-auto w-full', className)} />
  ),
  iframe: ({ className, ...props }) => (
    <iframe
      {...props}
      className={cn('my-8 min-h-[320px] w-full max-w-full rounded-md border border-accent', className)}
    />
  ),
  table: ({ className, ...props }) => (
    <table {...props} className={cn('mb-8 w-full border-collapse border-spacing-1', className)} />
  ),
  th: ({ className, ...props }) => (
    <th
      {...props}
      className={cn('border-b border-accent px-2 py-2 text-left font-sans text-sm font-bold', className)}
    />
  ),
  td: ({ className, ...props }) => <td {...props} className={cn('px-2 py-2 align-top', className)} />,
  pre: ({ className, ...props }) => (
    <pre
      {...props}
      className={cn('mb-8 overflow-x-auto rounded-md border border-accent bg-[#f5f7f9] p-4 font-mono text-sm text-text', className)}
    />
  ),
  code: ({ className, ...props }) => {
    const isCodeBlock = className?.includes('language-');
    return (
      <code
        {...props}
        className={cn(
          isCodeBlock
            ? 'block w-full whitespace-pre-wrap break-words'
            : 'rounded bg-[#f3f5f7] px-1.5 py-0.5 font-mono text-[0.9em] text-text',
          className,
        )}
      />
    );
  },
  hr: ({ className, ...props }) => <hr {...props} className={cn('h-px border-0 bg-accent', className)} />,
  span: ({ className, ...props }) => {
    if (className?.includes('has-background')) {
      return (
        <span
          {...props}
          className={cn('rounded-[10px] bg-[hsl(192,50%,90%)] text-[hsl(192,50%,20%)]', className)}
        />
      );
    }

    return <span {...props} className={className} />;
  },
};
