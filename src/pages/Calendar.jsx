import React, {useState} from 'react';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import '../css/calendar.css';
import {Button, Flex, DatePicker, Space, Skeleton, List, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';


export default function Calendar() {
  // Define state variable for date
  const [date, setDate] = useState(null);

  // Handle date change event
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date);
  };

  // Change date based on the arrow press
  const changeDate = (changeType) => {
    console.log(date);
    if (date) {
      let changedDate;
      if (changeType === 'increase') {
        changedDate = date.add(1, 'days');
      } else if (changeType === 'decrease') {
        changedDate = date.subtract(1, 'days');
      }
      setDate(changedDate);
    }
  };

  // Define placeholder data for odd days
  const dataOdd = [
    { amount: '£24.39', company: 'Tesco', category: 'Food' },
    { amount: '£49.99', company: 'Stagecoach', category: 'Travel' },
    { amount: '£7.50', company: 'Wetherspoon', category: 'Recreation' },
    { amount: '£16.00', company: 'Lidl', category: 'Food' },
    { amount: '£50.00', company: 'Zara', category: 'Clothing' },
    { amount: '£40.00', company: 'H&M', category: 'Clothing' },
    { amount: '£10.00', company: 'McDonalds', category: 'Food' },
    { amount: '£30.00', company: 'Amazon', category: 'Shopping' },
    { amount: '£15.00', company: 'Netflix', category: 'Entertainment' },
    { amount: '£20.00', company: 'Spotify', category: 'Music' },
    { amount: '£45.00', company: 'ASOS', category: 'Clothing' },
    { amount: '£20.00', company: 'Burger King', category: 'Food' },
    { amount: '£15.00', company: 'KFC', category: 'Food' },
    { amount: '£35.00', company: 'Uniqlo', category: 'Clothing' }
  ];

  // Define placeholder data for even days
  const dataEven = [
    { amount: '£30.00', company: 'Amazon', category: 'Shopping' },
    { amount: '£15.00', company: 'Netflix', category: 'Entertainment' },
    { amount: '£20.00', company: 'Spotify', category: 'Music' },
    { amount: '£45.00', company: 'ASOS', category: 'Clothing' },
    { amount: '£20.00', company: 'Burger King', category: 'Food' },
    { amount: '£15.00', company: 'KFC', category: 'Food' },
    { amount: '£35.00', company: 'Uniqlo', category: 'Clothing' }
  ];

  // Define data based on the date
  const data = date && date.date() % 2 === 0 ? dataEven : dataOdd;

  return (
    <>
      {/* div for date picker  */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '150px' }}>
        <Flex gap="small" align="flex-start" vertical>
          <Flex gap="small" wrap="wrap">
            {/* <Button type="primary" shape="circle" icon={<DownloadOutlined />} size="default" /> */}
            <Button type="primary" shape="circle" icon={<LeftOutlined />} size="default" onClick={() => changeDate('decrease')} />
            <Space direction="vertical" size={12}>
              <DatePicker className="centeredDatePicker" onChange={onChange} inputReadOnly needConfirm style={{ width: '500px', fontFamily: 'Futura' }} format="Do MMMM YYYY" value={date} />
            </Space>
            <Button type="primary" shape="circle" icon={<RightOutlined />} onClick={() => changeDate('increase')} size="default" />
            {/* <Button type="primary" shape="circle" icon={<DownloadOutlined />} size="default" /> */}
          </Flex>
        </Flex>
      </div>

      <div style={{ height: '50px' }}></div>

      {/* div for scrollable list of transactions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', direction: 'row' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: 'calc(100vh - 270px)',
            width: '40%',
            padding: '0px 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
            borderRadius: '10px',
            marginRight: '40px',
            marginLeft: '40px',
            marginBottom: '20px'
          }}
        >
          <div className='stat'>
            <h2>Total Spent</h2>
            <p>£{data.reduce((total, item) => total + parseFloat(item.amount.slice(1)), 0)}</p>
          </div>
          <div className='stat'>
            <h2>Daily Budget</h2>
            <p>£10.00</p>
          </div>
          <div className='stat'>
            <h2>Budget Remaining</h2>
            <p>£{10 - data.reduce((total, item) => total + parseFloat(item.amount.slice(1)), 0)}</p>
          </div>
          <div className='stat'>
            <h2>Greatest Expense</h2>
            <p>£{Math.max(...data.map(item => parseFloat(item.amount.slice(1))))}</p>
          </div>
        </div>
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
            margin: '0 20px',
            borderRadius: '10px',
            scrollbarColor: 'rgba(155, 155, 155, 0.7) transparent',
            height: 'calc(100vh - 270px)',
            width: '50%'
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            hasMore={false}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            // endMessage={}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item.company} style={{ fontFamily: 'Futura' }}>
                  <List.Item.Meta
                    title={item.amount}
                    description={item.company}
                    style={{ fontFamily: 'Futura' }}
                  />
                  <div style={{ fontFamily: 'Futura' }}>{item.category}</div>
                </List.Item>
              )}
            />
            <div style={{ borderTop: '1px solid #000', margin: '10px 0' }}></div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};
