import { Col, Divider, Row } from 'antd';
import React, { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArtCard } from '../../components/ArtCard';
import { CardLoader } from '../../components/MyLoader';
import { useCreator, useCreatorArts } from '../../hooks';
import useSWR from "swr";

const RenderOwnedList = ({ feed }: { feed: string }) => {
  const { data, error } = useSWR( `${feed}`,
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

  return data.response.results.map((kuser: any) => {

   console.log( kuser )

    return (
 
            <div className="featured-item">
        <div className="featured-item-image"><img src={kuser.ProfilePicture}/></div>
         <div className="featured-item-title">{kuser.Bio}</div>
</div>


    );
  });
};

export const ArtistView = () => {
  const { id } = useParams<{ id: string }>();
  const creator = useCreator(id);
  const artwork = useCreatorArts(id);

  const artworkGrid = (
    <div className="artwork-grid">
      {artwork.length > 0
        ? artwork.map((m, idx) => {
            const id = m.pubkey;
            return (
              <Link to={`/art/${id}`} key={idx}>
                <ArtCard
                  key={id}
                  pubkey={m.pubkey}
                  preview={false}
                  artView={true}
                />
              </Link>
            );
          })
        : [...Array(6)].map((_, idx) => <CardLoader key={idx} />)}
    </div>
  );

  return (
    <>
      <Col>
        <Divider />
        <Row
          style={{ margin: '0 30px', textAlign: 'left', fontSize: '1.4rem' }}
        >
          <Col span={24}>
            <h2>
              {/* <MetaAvatar creators={creator ? [creator] : []} size={100} /> */}
              {creator?.info.name || creator?.info.address}
            </h2>
            <br />
            <div className="info-header">ABOUT THE CREATOR</div>

               <div className="feature-list">
  <RenderOwnedList feed="https://kreationcms.bubbleapps.io/version-test/api/1.1/obj/KreationUser"/>
            </div>

            <div className="info-content">{creator?.info.description}</div>
            <br />
            <div className="info-header">Art Created</div>
            {artworkGrid}
          </Col>
        </Row>
      </Col>
    </>
  );
};
