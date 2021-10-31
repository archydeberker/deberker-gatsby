import Layout from "../components/layout"
/** @jsx jsx */
import React from "react"

import { jsx } from "theme-ui"
import { Card, Link, Text } from "theme-ui"
import { Grid, Box } from "theme-ui"
import { Button } from "theme-ui"

const AboutPage = () => {
  return (
    <Layout>
      <div sx={{ margin: 7, color: "secondary" }}>
        <Button mr={2}>Beep</Button>
        <Button variant="secondary">Boop</Button>
      </div>
      <Button ml={2} hidden>
        Hidden
      </Button>
      <Grid width={[128, null, 192]}>
        <Box bg="primary">Box</Box>
        <Box bg="muted">Box</Box>
        <Box bg="primary">Box</Box>
        <Box bg="muted">Box</Box>
      </Grid>
      <Card
        sx={{
          maxWidth: 256,
        }}
      >
        <Text>
          <h1> About Me</h1>
        </Text>
      </Card>
      <Link href="#!">Hello</Link>
    </Layout>
  )
}

export default AboutPage
