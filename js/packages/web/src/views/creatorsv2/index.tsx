import { useWallet } from '@solana/wallet-adapter-react';
import { Col, Layout, Row, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState, Fragment } from 'react';
import useSWR from "swr";

import { AuctionRenderCard } from '../../../../components/AuctionRenderCard';




export const CreatorsViewV2 = () => {
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
        <div className="featured-item-image"><a href={token.image}><img src={token.image}/></a></div>
         <div className="featured-item-title"><a href={token.link}>{token.link}</a></div>
        <div className="featured-item-artist"><a href={token.link}>{token.link}</a></div>
  </div>


    );
  });
};


  return (
    <>
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
  <RenderOwnedList feed="https://kreationcms.bubbleapps.io/version-test/api/1.1/obj/Featurepanel"/>
            </div>
    </>
  );
};
