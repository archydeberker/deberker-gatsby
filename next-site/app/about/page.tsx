export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <div>
      <img src="/assets/banner-ice.png" className="relative inline-block w-full py-2" alt="Ice banner" />

      <h2 className="mb-6 mt-12 font-sans text-[2.074rem] font-bold leading-[0.9] tracking-[-0.025em] text-heading">
        Work
      </h2>
      <p className="mb-8 p-0 leading-[1.625] text-text">
        I&apos;m a co-founder of <a href="https://axle.energy/" className="text-primary hover:text-coral">axle energy</a>, where
        we&apos;re building clever software to shift energy usage to low carbon, low cost
        times. Please <a href="mailto:archy@axle.energy" className="text-primary hover:text-coral">reach out</a> if you&apos;re
        interested in working together (we&apos;re hiring engineers!).
      </p>
      <p className="mb-8 p-0 leading-[1.625] text-text">
        I previously led data science and product at
        <a href="https://www.carbonchain.io" className="text-primary hover:text-coral"> CarbonChain</a>, a London-based startup
        building carbon footprinting software for ultra-high-emitting supply chains.
      </p>
      <p className="mb-8 p-0 leading-[1.625] text-text">
        I&apos;ve also worked on on global emissions monitoring as part of Vice President
        Al Gore&apos;s <a href="https://www.climatetrace.org" className="text-primary hover:text-coral"> Climate TRACE </a>project,
        and in applied ML research and product management at
        <a href="https://www.elementai.com" className="text-primary hover:text-coral"> Element AI </a>. I&apos;ve also done stints as
        a consultant for interesting climate tech companies like{' '}
        <a href="https://www.transitionzero.org" className="text-primary hover:text-coral">Transition Zero</a>,{' '}
        <a href="https://www.habitat.energy" className="text-primary hover:text-coral">Habitat</a>, and{' '}
        <a href="https://www.origamienergy.com" className="text-primary hover:text-coral"> Origami Energy </a>.
      </p>

      <h2 className="mb-6 mt-12 font-sans text-[2.074rem] font-bold leading-[0.9] tracking-[-0.025em] text-heading">
        Academic
      </h2>
      <p className="mb-8 p-0 leading-[1.625] text-text">
        I have a PhD in Neuroscience from University College London, and an undergrad in
        Natural Sciences from Pembroke College, Cambridge. You can find my academic
        contributions on my{' '}
        <a
          href="https://scholar.google.co.uk/citations?user=P9U_azIAAAAJ&hl=en"
          className="text-primary hover:text-coral"
        >
          Google Scholar profile
        </a>
        .
      </p>

      <h2 className="mb-6 mt-12 font-sans text-[2.074rem] font-bold leading-[0.9] tracking-[-0.025em] text-heading">
        Adventures
      </h2>
      <p className="mb-8 p-0 leading-[1.625] text-text">
        When I&apos;m not at a keyboard, I&apos;m usually outside doing some combination of:
      </p>
      <ul className="mb-8 inline list-none p-0 text-center text-[1.728rem] leading-[0.5]">
        <li className="mb-4">🚵🏻‍♂️</li>
        <li className="mb-4">⛷</li>
        <li className="mb-4">🏃‍♂️</li>
        <li className="mb-4">🧗‍♀️</li>
        <li className="mb-4">⛺️</li>
        <li className="mb-4">🎾</li>
        <li className="mb-4">🏉</li>
      </ul>
      <p className="mb-8 p-0 leading-[1.625] text-text">
        Sometimes I write blogs about adventures: here&apos;s one about{' '}
        <a href="https://starchyinscandinavia.wordpress.com/" className="text-primary hover:text-coral">Norway</a>, and another
        about <a href="https://maraudinginmontreal.wordpress.com/" className="text-primary hover:text-coral">Canada</a>.
      </p>
    </div>
  );
}
