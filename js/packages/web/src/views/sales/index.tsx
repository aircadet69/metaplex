import { Layout } from 'antd';
import React from 'react';
import { useStore } from '@oyster/common';
import { useMeta } from '../../contexts';
import { SalesListView2 } from './components/SalesList2';
import { SetupView } from './setup';

export const SalesView = () => {
  const { isLoading, store } = useMeta();
  const { isConfigured } = useStore();

  const showAuctions = (store && isConfigured) || isLoading;

  return (
    <Layout style={{ margin: 0, marginTop: 30, alignItems: 'center' }}>
      {showAuctions ? <SalesListView2 /> : <SetupView />}
          <h2>Sales</h2>
    </Layout>
  );
};
