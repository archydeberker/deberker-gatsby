import Layout from "../components/layout"
/** @jsx jsx */
import React from "react"

import banner from "../../content/assets/banner-ice.png"
import { jsx } from "theme-ui"

import { Link } from "gatsby"

const AboutPage = () => {
  return (
    <Layout isHomePage>
      <div>
        <img src={banner} className="bannerImage"></img>

        <h2> Work </h2>
        <p>
          I lead data science at
          <Link href="https://www.carbonchain.io"> CarbonChain</Link>, a
          London-based startup building carbon footprinting software for
          ultra-high-emitting supply chains.
        </p>
        <p>
          I build products which use data and machine learning to deliver
          magical experiences. I like to write code myself, and help figure out
          what code teams should write. In my current role I do a bit of both.
        </p>
        <p>
          I previously worked on global emissions monitoring as part of Vice
          President Al Gore's
          <Link href="https://www.climatetrace.org"> Climate TRACE </Link>
          project, and in applied ML research and product management at
          <Link href="https://www.elementai.com"> Element AI </Link>. I've also
          done stints as a consultant for interesting climate tech companies
          like{" "}
          <Link href="https://www.transitionzero.org">Transition Zero</Link>,{" "}
          <Link href="https://www.habitat.energy">Habitat</Link>, and{" "}
          <Link href="https://www.origamienergy.com"> Origami Energy </Link>.
        </p>
        <h2> Academic </h2>
        <p>
          I have a PhD in Neuroscience from University College London, and an
          undergrad in Natural Sciences from Pembroke College, Cambridge. You
          can find my academic contributions on my{" "}
          <a href="https://scholar.google.co.uk/citations?user=P9U_azIAAAAJ&hl=en">
            Google Scholar profile
          </a>
          .
        </p>
        <h2>Adventures</h2>
        <p>
          When I'm not at a keyboard, I'm usually outside doing some combination
          of:
        </p>
        <ul class="activity-list">
          <li>🚵🏻‍♂️</li>
          <li>⛷ </li>
          <li>🏃‍♂️</li>
          <li>🧗‍♀️</li>
          <li>⛺️</li>
          <li>🎾</li>
          <li>🏉</li>
        </ul>
        <p>
          Sometimes I write blogs about adventures: here’s one about{" "}
          <a href="https://starchyinscandinavia.wordpress.com/">Norway</a>, and
          another about{" "}
          <a href="https://maraudinginmontreal.wordpress.com/">Canada</a>.
        </p>
      </div>
    </Layout>
  )
}

export default AboutPage
