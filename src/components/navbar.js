/** @jsx jsx */
import React from "react"

import { jsx } from "theme-ui"
import { Flex, NavLink, Box, Link } from "@theme-ui/components"

const NavBar = ({ title }) => {
  return (
    <div className="stickyHeader">
      <div style={{ position: "relative", width: "100%" }}>
        <Flex
          sx={{
            flex: "1 1 auto",
            justifyContent: "space-between",
            alignItems: "baseline",
            position: "relative",
          }}
        >
          <Box>
            <Link className="header-link-home" to="/">
              {title}
            </Link>
          </Box>
          <Box>
            <NavLink className="navLink" href="/">
              Home
            </NavLink>
            <NavLink className="navLink" href="/about">
              About
            </NavLink>
          </Box>
        </Flex>
      </div>
    </div>
  )
}

export default NavBar
