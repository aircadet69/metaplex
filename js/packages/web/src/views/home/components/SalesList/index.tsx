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

const feed2 = "https://kreationcms.bubbleapps.io/version-test/api/1.1/obj/KreationUser?&constraints=%5B%7B%22key%22%3A%22kreationuseridv2%22%2C%22constraint_type%22%3A%22text%20contains%22%2C%20%22value%22%3A%22EGAeeMKQKCbRYd7F647c8WYbKG79brCAaJozcjWNVzSM%22%7D%5D";

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

  return data.tokens.map((token: any) => {

   const tokendata = data.tokens.map

   console.log( token )

    return (
 
      <div className="featured-item">
        <div className="featured-item-image"><a href={token.token.tokenLink}><img src={token.token.image}/></a></div>
         <div className="featured-item-title"><a href={token.token.tokenLink}>{token.token.title}</a></div>
        <div className="featured-item-artist"><a href={token.token.tokenLink}>{token.token.artist}</a></div>
      {token.token.contractAddress} {token.token.tokenID}  </div>


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
        </Content>
      </Layout>
      <div className="feature-list">
  <RenderOwnedList feed="https://cms.hofa.io/featured"/>
            </div>
    </>
  );
};
