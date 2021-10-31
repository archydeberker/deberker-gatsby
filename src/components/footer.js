/** @jsx jsx */
import React from "react"

import { jsx, Box, Link } from "theme-ui"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
  return (
    <footer>
      <Box sx={{ textAlign: "center" }}>
        <Link href="https://twitter.com/ArchydeB" sx={{ color: "black" }}>
          <FontAwesomeIcon
            icon={faTwitter}
            size="2x"
            sx={{ marginInline: "12px" }}
          ></FontAwesomeIcon>
        </Link>
        <Link
          href="https://www.linkedin.com/in/archy-de-berker/"
          sx={{ color: "black" }}
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            size="2x"
            sx={{ marginInline: "12px" }}
          ></FontAwesomeIcon>
        </Link>
        <Link href="https://github.com/archydeberker" sx={{ color: "black" }}>
          <FontAwesomeIcon
            icon={faGithub}
            size="2x"
            sx={{ marginInline: "12px" }}
          ></FontAwesomeIcon>
        </Link>
      </Box>
      <p sx={{ mt: 2 }}>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` `}
      </p>
    </footer>
  )
}
export default Footer
