/** @jsx jsx */
import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

import Image from "gatsby-image"
import { jsx } from "theme-ui"
import { Card, Grid, Box, Flex, Button } from "theme-ui"
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes

  if (!posts.length) {
    return (
      <Layout isHomePage>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    )
  }

  return (
    <Layout isHomePage>
      <Seo title="All posts" />

      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title
          const featuredImage = {
            fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
            alt: post.featuredImage?.node?.alt || ``,
          }

          return (
            <li key={post.uri}>
              <Card>
                <Link to={post.uri} itemProp="url" className="cardLink">
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <Grid columns={[1, "1fr 2fr"]}>
                      <Box>
                        {" "}
                        {featuredImage?.fluid && (
                          <Image
                            fluid={featuredImage.fluid}
                            alt={featuredImage.alt}
                            style={{ margin: 10 }}
                          />
                        )}
                      </Box>
                      <Box>
                        <header>
                          <h2>
                            <span itemProp="headline">{parse(title)}</span>
                          </h2>
                          <span className="date">{post.date}</span>
                        </header>
                        <section itemProp="description">
                          {parse(post.excerpt)}
                        </section>
                      </Box>
                    </Grid>
                  </article>
                </Link>
              </Card>
            </li>
          )
        })}
      </ol>
      <Flex columns={[2]} sx={{ justifyContent: ["space-between"] }}>
        {previousPagePath && (
          <Box>
            <Link className="pageButton" to={previousPagePath}>
              <FontAwesomeIcon icon={faArrowLeft} sx={{ mx: 2 }} />
              Previous page
            </Link>
            <br />
          </Box>
        )}
        {nextPagePath && (
          <Box>
            <Link className="pageButton" to={nextPagePath}>
              Next page
              <FontAwesomeIcon icon={faArrowRight} sx={{ mx: 2 }} />
            </Link>
          </Box>
        )}
      </Flex>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000, quality: 100) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
