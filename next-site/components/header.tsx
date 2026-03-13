'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const SITE_TITLE = 'Archy de Berker';

export default function Header() {
  const pathname = usePathname();
  const isHomeHeader = pathname === '/' || pathname === '/blog';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isHomeHeader) {
      setIsScrolled(false);
      return;
    }

    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomeHeader]);

  if (isHomeHeader) {
    return (
      <>
        <img
          src="/assets/freelance-logo.png"
          alt="Archy in Freelancing Mode"
          className="mx-auto block h-auto w-[150px] sm:w-[200px]"
          width="200"
        />
        <h1 className="m-0 text-center font-sans text-[2.986rem] font-black leading-[0.9] tracking-[-0.025em] text-black">
          <Link href="/" className="no-underline text-inherit">
            {SITE_TITLE}
          </Link>
        </h1>
        <div className="mx-auto mt-2 flex justify-center gap-3">
          <Link
            className="inline-block px-5 py-4 font-sans text-[1.44rem] font-bold text-inherit no-underline transition-colors hover:text-coral"
            href="/"
          >
            Posts
          </Link>
          <Link
            className="inline-block px-5 py-4 font-sans text-[1.44rem] font-bold text-inherit no-underline transition-colors hover:text-coral"
            href="/about"
          >
            About
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="fixed inset-x-3 top-2 z-50 sm:inset-x-[25px] sm:top-[25px] sm:px-5 sm:py-5">
      <div
        className={`w-full px-4 py-3 transition-all duration-200 sm:mx-auto sm:max-w-3xl sm:px-5 sm:py-5 ${
          isScrolled
            ? 'rounded-2xl border border-gray-100 bg-white/90 shadow-sm backdrop-blur-sm'
            : 'bg-white rounded-xl'
        }`}
      >
        <div className="flex w-full items-center justify-between gap-6 sm:items-baseline sm:gap-8">
          <div>
            <Link
              className="block whitespace-nowrap pr-2 font-sans text-[1.05rem] font-bold leading-none text-inherit no-underline sm:text-[1.2rem]"
              href="/"
            >
              {SITE_TITLE}
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end gap-1 text-right sm:block">
            <Link
              className="inline-block rounded-md px-1.5 py-1 font-sans font-bold text-inherit no-underline transition-colors hover:text-coral focus:text-coral sm:px-2"
              href="/"
            >
              Home
            </Link>
            <Link
              className="inline-block rounded-md px-1.5 py-1 font-sans font-bold text-inherit no-underline transition-colors hover:text-coral focus:text-coral sm:px-2"
              href="/about"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
