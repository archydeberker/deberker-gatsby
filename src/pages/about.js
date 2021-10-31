import Layout from "../components/layout"
/** @jsx jsx */
import React from "react"

import banner from "../../content/assets/banner-ice.png"
import { jsx } from "theme-ui"
import { Paragraph } from "theme-ui"
import { Link, Image } from "gatsby"

const AboutPage = () => {
  return (
    <Layout isHomePage>
      <div>
        <h2> About </h2>
        <img src={banner} className="bannerImage"></img>
        <p>
          I lead data science at
          <Link href="https://www.carbonchain.io"> CarbonChain </Link>, a
          London-based startup building carbon footprinting software for
          carbon-intense supply chains.
        </p>
        <p>
          I like to build products which use data and machine learning to
          deliver magical experiences. I like to write code myself, and help
          figure out what code teams should write. In my current role I do a bit
          of both.
        </p>
        <p>
          I previously worked on global emissions monitoring as part of Vice
          President Al Gore's
          <Link>Climate TRACE </Link>project, and in applied ML research and
          product management at
          <Link>Element AI in Montreal </Link>. I've also done stints as a
          consultant for interesting climate tech companies like Transition
          Zero, Habitat, and Origami Energy.{" "}
        </p>
        <p>
          I have a PhD in Neuroscience from University College London, and an
          undergrad in Natural Sciences from Pembroke College, Cambridge.
        </p>
      </div>
      <div>
        <h2> Contact </h2>
      </div>
    </Layout>
  )
}

export default AboutPage
