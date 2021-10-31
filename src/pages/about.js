import Layout from "../components/layout"
/** @jsx jsx */
import React from "react"

import { jsx } from "theme-ui"
import { Paragraph } from "theme-ui"
import { Link } from "gatsby"

const AboutPage = () => {
  return (
    <Layout>
      <h1> About</h1>

      <p>
        I lead data science at{" "}
        <Link href="https://www.carbonchain.io"> CarbonChain </Link>, a
        London-based startup building carbon footprinting software for
        carbon-intense supply chains.
      </p>
      <p>
        I like to build products which use data and machine learning to deliver
        magical experiences.
      </p>

      <p>
        {" "}
        I previously worked on global emissions monitoring as part of Vice
        Presiedent Al Gore's
        <Link>Climate TRACE </Link>project, and in applied ML research and
        product management at
        <Link>Element AI in Montreal </Link>. I've also done stints as a
        consultant for interesting climate tech companies like Transition Zero,
        Habitat, and Origami Energy.{" "}
      </p>
    </Layout>
  )
}

export default AboutPage
