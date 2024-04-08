import React, { useState, useEffect } from 'react';
import {
  Box,
  GridItem,
  SimpleGrid,
  Grid,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import '../css/calendar.css';
import {Button, Flex, DatePicker, Space, Skeleton, List, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import { CalendarIcon} from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";

//Icons
import { MdCalendarMonth } from "react-icons/md";

//Website Common Components
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#404447",
      200: "#2a5cbf",
      300: "#dfa247",
      400: "#1ed269",
      500: "#ca3a06",
    },
  },
});

export default function Calendar() {
  let location = useLocation();
  const user_id = location.state.user_id;

   // Function to toggle the refresh state
  const onTransactionChange = () => {
    setRefreshData((prev) => prev + 1);
  };

  // Define state variable for date
  const [date, setDate] = useState(null);
  const [payments, setPayments] = useState([]);

  // Handle date change event
  const onChange = async (date, dateString) => {
    setDate(date);
  };

  // Change date based on the arrow press
  const changeDate = async (changeType) => {
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

  const updatePayments = async () => {
    let fetchData = await axios.post("http://localhost:3000/calendar", { date });
    setPayments(fetchData.data)
  }


  // Update the payments data whenever `date` changes
  useEffect(() => {
    updatePayments();
  }, [date]);

  return (
    <ChakraProvider theme={theme}>
      <Grid templateColumns="repeat(8, 1fr)" bg="gray.25">
        {/* sidebar */}
        <GridItem as="aside" colSpan="1" bg="black" minHeight="100vh" p="30px">
          <Sidebar onTransactionChange={onTransactionChange} user_id={user_id} />
        </GridItem>

        {/* main content & navbar */}
        <GridItem as="main" colSpan="7" p="40px">
          <Navbar title="Calendar" icon={CalendarIcon} user_id={user_id}/>

          <SimpleGrid spacing={35} columns={2}>
            <GridItem colSpan="7">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '30px' }}>
                <Flex gap="small" align="flex-start" vertical>
                  <Flex gap="small" wrap="wrap">
                    <Button type="primary" shape="circle" icon={<LeftOutlined />} size="default" onClick={() => changeDate('decrease')} />
                    <Space direction="vertical" size={12}>
                      <DatePicker className="centeredDatePicker" onChange={onChange} inputReadOnly needConfirm style={{ width: '500px', fontFamily: 'Futura' }} format="Do MMMM YYYY" value={date} />
                    </Space>
                    <Button type="primary" shape="circle" icon={<RightOutlined />} onClick={() => changeDate('increase')} size="default" />
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
                    <div className='scrollableDiv2'>
                      <div className='stat'>
                        <h2>Total Spent</h2>
                        <p>£{payments.reduce((total, item) => total + parseFloat(item.value), 0)}</p>
                      </div>
                      <div className='stat'>
                        <h2>Daily Budget</h2>
                        <p>£10.00</p>
                      </div>
                      <div className='stat'>
                        <h2>Budget Remaining</h2>
                        <p>£{10 - payments.reduce((total, item) => total + parseFloat(item.value), 0)}</p>
                      </div>
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
                    dataLength={payments.length}
                    hasMore={false}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    scrollableTarget="scrollableDiv"
                  >
                    <List
                      dataSource={payments}
                      renderItem={(item) => (
                        <List.Item key={item.description} className="list-item">
                          <List.Item.Meta
                            title={<span className="list-item-meta">{"£" + item.value}</span>}
                            description={<span className="list-item-meta">{item.category}</span>}
                          />
                          <div className="description-div">{item.description}</div>
                        </List.Item>
                      )}
                    />
                    <div style={{ borderTop: '1px solid #000', margin: '10px 0' }}></div>
                  </InfiniteScroll>
                </div>
              </div>
            </GridItem>
          </SimpleGrid>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}