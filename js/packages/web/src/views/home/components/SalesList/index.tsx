import { useWallet } from '@solana/wallet-adapter-react';
import { Col, Layout, Row, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, Fragment } from 'react';
import useSWR from "swr";

import { useMeta } from '../../../../contexts';
import { CardLoader } from '../../../../components/MyLoader';
import { Banner } from '../../../../components/Banner';
import { HowToBuyModal } from '../../../../components/HowToBuyModal';

import { AuctionRenderCard } from '../../../../components/AuctionRenderCard';

const { TabPane } = Tabs;
const { Content } = Layout;




export enum LiveAuctionViewState {
  All = '0',
  Participated = '1',
  Ended = '2',
  Resale = '3',
  Own = '4',
}

export const SalesListView = () => {
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  const { isLoading } = useMeta();
  const { connected } = useWallet();

const feed2 = "https://kreationcms.bubbleapps.io/version-test/api/1.1/obj/Featurepanel";

  console.log( feed2 )

  const RenderOwnedList = ({ feed }: { feed: string }) => {
  const { data, error } = useSWR( feed2,
    (url: string) => fetch(url).then((res) => res.json())
  );



  console.log( data )

  if (!data) {
    // loading
    return <Fragment />;
  }
  if (error) {
    // error
    return <Fragment />;
  }

  return data.response.results.map((token: any) => {

   console.log( token )

    return (
 
      <div className="featured-item">
        <div className="featured-item-image"><a href={token.link}><img src={token.image}/></a></div>
         <div className="featured-item-title"><a href={token.link}>{token.title}</a></div>
  </div>


    );
  });
};


  return (
    <>
      <Banner
        src="/bannerstone.jpg"
        headingText="Coming Soon"
        subHeadingText="The Stone Heads art collection by Leo Caillard"
        actionComponent={<HowToBuyModal buttonClassName="secondary-btn" />}
        useBannerBg
      />
      <Layout>
        <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Col style={{ width: '100%', marginTop: 32 }}>
            <Row>
              
            </Row>
            <Row>
             
            </Row>
          </Col>
                <div className="feature-list">
  <RenderOwnedList feed="https://kreationcms.bubbleapps.io/version-test/api/1.1/obj/Featurepanel"/>
            </div>
            <div className="feature-list">
          
<div class="featured-item about1">
              KREATION IS COLLABORATING WITH THE GREATEST ATHLETES WORLDWIDE, OFFERING FANS A CHANCE TO OWN A PIECE OF THEIR DIGITAL FUTURE 
</div>
<div class="featured-item about2">
             WITH DECADES OF EXPERIENCE IN THE ART WORLD - KREATION BRINGS FORTH THE FINEST CONTEMPORARY DIGITAL ARTIST'S IN THE NFT SPACE 
</div>
<div class="featured-item about3">
             PARTNERING WITH MUSICIANS TO CREATE UNIQUE AND INSPIRING NFTS AND OFFERING THE THE COMMUNITY THE OPPORTUNITY TO GET UP CLOSE AND PERSONAL WITH THEIR MUSICAL HEROES 
</div>
          </div>
        </Content>
      </Layout>

    </>
  );
};
