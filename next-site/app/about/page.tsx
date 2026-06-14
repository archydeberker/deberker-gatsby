export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <div className="site">
      <section className="ab-intro">
        <div className="ab-intro-wrap">
          <span className="eyebrow">About</span>
          <div className="ab-banner">
            <img src="/assets/banner-ice.png" alt="Ice banner" />
          </div>
        </div>
      </section>

      <section className="ab-blocks">
        <div className="ab-block">
          <div className="ab-block-label">Work</div>
          <div className="ab-block-body">
            <p>
              I&apos;m a co-founder of{' '}
              <a href="https://axle.energy/">axle energy</a>, where we&apos;re building clever
              software to shift energy usage to low carbon, low cost times. Please{' '}
              <a href="mailto:archy@axle.energy">reach out</a> if you&apos;re interested in working
              together (we&apos;re hiring engineers!).
            </p>
            <p>
              I previously led data science and product at{' '}
              <a href="https://www.carbonchain.io">CarbonChain</a>, a London-based startup building
              carbon footprinting software for ultra-high-emitting supply chains.
            </p>
            <p>
              I&apos;ve also worked on on global emissions monitoring as part of Vice President Al
              Gore&apos;s <a href="https://www.climatetrace.org">Climate TRACE</a> project, and in
              applied ML research and product management at{' '}
              <a href="https://www.elementai.com">Element AI</a>. I&apos;ve also done stints as a
              consultant for interesting climate tech companies like{' '}
              <a href="https://www.transitionzero.org">Transition Zero</a>,{' '}
              <a href="https://www.habitat.energy">Habitat</a>, and{' '}
              <a href="https://www.origamienergy.com">Origami Energy</a>.
            </p>
          </div>
        </div>

        <div className="ab-block">
          <div className="ab-block-label">Academic</div>
          <div className="ab-block-body">
            <p>
              I have a PhD in Neuroscience from University College London, and an undergrad in
              Natural Sciences from Pembroke College, Cambridge. You can find my academic
              contributions on my{' '}
              <a href="https://scholar.google.co.uk/citations?user=P9U_azIAAAAJ&hl=en">
                Google Scholar profile
              </a>
              .
            </p>
          </div>
        </div>

        <div className="ab-block">
          <div className="ab-block-label">Adventures</div>
          <div className="ab-block-body">
            <p>When I&apos;m not at a keyboard, I&apos;m usually outside doing some combination of:</p>
            <ul className="ab-chips">
              <li>🚵🏻‍♂️</li>
              <li>⛷</li>
              <li>🏃‍♂️</li>
              <li>🧗‍♀️</li>
              <li>⛺️</li>
              <li>🎾</li>
              <li>🏉</li>
            </ul>
            <p>
              Sometimes I write blogs about adventures: here&apos;s one about{' '}
              <a href="https://starchyinscandinavia.wordpress.com/">Norway</a>, and another about{' '}
              <a href="https://maraudinginmontreal.wordpress.com/">Canada</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
