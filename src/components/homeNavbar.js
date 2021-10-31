/** @jsx jsx */
import React from "react"

import parse from "html-react-parser"
import logo from "../../content/assets/freelance-logo.png"

import { jsx } from "theme-ui"
import { Flex, NavLink, Box, Link } from "@theme-ui/components"

const HomeNavbar = ({ title }) => {
  return (
    <>
      <img
        src={logo}
        alt="Archy in Freelancing Mode"
        className="logo"
        width="200px"
      />
      <h1 className="main-heading">
        <Link to="/">{parse(title)}</Link>
      </h1>

      <Flex sx={{ margin: "0 auto", justifyContent: "center" }}>
        <NavLink className="navLinkLg" href="/">
          Posts
        </NavLink>
        <NavLink className="navLinkLg" href="/about">
          About
        </NavLink>
      </Flex>
    </>
  )
}
export default HomeNavbar
