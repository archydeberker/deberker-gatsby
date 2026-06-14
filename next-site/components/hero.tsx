export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-wrap">
        <img className="hero-mark" src="/assets/freelance-logo.png" alt="Archy in Freelancing Mode" />
        <p className="hero-bio">
          I&apos;m a co-founder of <a href="https://axle.energy/">Axle Energy</a>, where we&apos;re
          building clever software to shift energy usage to low carbon, low cost times.
        </p>
        <a className="hero-hiring" href="mailto:archy@axle.energy">
          We&apos;re hiring <span className="arr">→</span>
        </a>
      </div>
    </section>
  );
}
