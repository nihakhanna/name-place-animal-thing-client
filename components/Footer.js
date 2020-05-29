import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
position: fixed;
left: 0;
bottom: 0;
box-shadow: -12px 3px 14px 0px #7171715e;
width: 100%;
height: 80px;
color: white;
`

const Footer = ({ }) => {

  return (
    <FooterContainer>
      <a onClick={() => gtag("event", "google_play")} href='https://play.google.com/store/apps/details?id=online.nameplaceanimalthing&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' width="200px" src='https://play.google.com/intl/en_gb/badges/static/images/badges/en_badge_web_generic.png' /></a>
    </FooterContainer>
  )
}

export default Footer