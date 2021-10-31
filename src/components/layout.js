import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Navbar from "../components/navbar"
import HomeNavbar from "../components/homeNavbar"
import Footer from "../components/footer"

const Layout = ({ isHomePage, children }) => {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
      <header className="global-header">
        {isHomePage ? <HomeNavbar title={title} /> : <Navbar title={title} />}
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
