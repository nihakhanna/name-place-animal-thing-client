import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px 80px;
  font-family: Schoolbell;
`
const Privacy = () => <>
  <Container>
    <h1 style={{ fontSize: "3em" }}>Privacy Policy</h1>
    <h2>This policy applies to all information collected or submitted on our website and our apps for Android and any other devices and platforms.</h2>

    <h1>Information we collect</h1>
    <h2>We do not store any persistent information about you.</h2>

    <h1>Analytics</h1>
    <h2>Our app collects aggregate, anonymous statistics, such as the percentage of users who use particular features, to improve the app. We may partner with third party vendors such as Google Analytics to do so.</h2>

    <h1>Use of your information</h1>
    <ul>
      <li style={{ fontSize: '1.5em' }}>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
      <li style={{ fontSize: '1.5em' }}>Request feedback and contact you about your use of the Site and our mobile application</li>
    </ul>
  </Container>
</>

export default Privacy