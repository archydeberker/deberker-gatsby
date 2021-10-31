/** @jsx jsx */
import React from "react"

import { jsx, Box } from "theme-ui"

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
        <FontAwesomeIcon
          icon={faTwitter}
          size="2x"
          sx={{ marginInline: "12px" }}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          icon={faLinkedin}
          size="2x"
          sx={{ marginInline: "12px" }}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          icon={faGithub}
          size="2x"
          sx={{ marginInline: "12px" }}
        ></FontAwesomeIcon>
      </Box>
      <p>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` `}
      </p>
    </footer>
  )
}
export default Footer
