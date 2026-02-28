import { Button, Col, Flex, Progress, Row,Image, Layout, Menu, Drawer, Typography, List } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LikeOutlined, MenuOutlined, MessageOutlined, ShoppingCartOutlined, StarOutlined, MailOutlined, VideoCameraAddOutlined, VideoCameraOutlined, YoutubeOutlined, InstagramOutlined, InsertRowAboveOutlined, TikTokOutlined, WhatsAppOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { use, useEffect, useState } from 'react';
import { getDestinations } from '../services/admin/privateTourService';


const items = [
  {
    key: "/",
    label: "Home",
  }
  ,
  {
    key: "/admin",
    label: "Admin",
  }

];

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [menuSelectedTab,setMenuSelectedTab] = useState('1');

  


  return (
    <Layout >
      {
        isMobile ? 
        (
          <Header
            style={{
              position: 'fixed',
              top: 0,
              left:0,
              zIndex: 1,
              width: '100%',
              backgroundColor:'white'
            
            }}
          >
            <Flex justify='space-between' vertical={false} gap={"large"} >
                <div>
                    <MenuOutlined  onClick={() => setShowMenu(true)} style={{ fontSize:'25px'}}/>
                    <Drawer
                        title="Menu"
                        placement="left"
                        onClose={() => setShowMenu(false)}
                        open={showMenu}
                        size='large'
                        >

                        <Menu
                          theme="light"
                          mode="vertical"
                          defaultSelectedKeys={[location.pathname]}
                          items={items}
                          style={{ flex: 1, minWidth: 0 }}
                          // onClick={() => setShowMenu(false)}
                          onClick={({ key }) => {
                            navigate(key);       // 🔥 THIS is what was missing
                            setShowMenu(false);
                          }}
                        />
                    </Drawer>
                </div>

                <div style={{  alignContent:'right'}}>
                  <Image preview={false}  src="/logoMobile.png" width='50px' /> 
                </div>
            
            </Flex>            
          
          </Header>
        )
        :
        ( 
            <Header
              style={{
                 position: 'fixed',
                top: 0,
                left:0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor:'white'
              }}
            >
              <div 
                className="demo-logo"
                >
                <Image 
                  height={40} 
                  //style={{ objectFit: "contain" }}
                  preview={false}  
                  src="/logo.png"/>
              </div>
              <Menu
                theme='light'
                mode="horizontal"
                defaultSelectedKeys={[location.pathname]}
                items={items}
                style={{ flex: 1, minWidth: 0 }}
                 onClick={({ key }) => {
                  navigate(key);       // 🔥 THIS is what was missing
                  // setShowMenu(false);
                }}
              />

            
            </Header>
        )
      }
      
      <Content 
        style={{ paddingTop: "60px" }}
      >
        <Outlet />
      </Content>

      <Footer
        style={{
          backgroundColor: '#393b3a',
          padding: '20px',
          color: 'white',
          fontSize: '14px'
        }}
      >
        <Row>
          <Col xs={24} sm={8} lg={8} xl={8} xxl={8}>
                <h2>Contact Us</h2>
                <p style={{fontSize:"15px"}}>
                  Plot 1957, Kilungule St, Bunju,<br />Dar es Salaam,<br />Tanzania <br />
                  info@postobellaresort.com <br />+255 762 444 414
                  
                </p>
                <Flex vertical={false} gap={"middle"}>
                  {/* <a 
                    style={
                      {
                        color:"green",
                        fontSize:"25px"
                      }
                    } 
                    target='_blank' href='https://youtube.com/@letsexploretanzania8611?si=TY2QV9D7xjbgWv3-'
                  >
                    <YoutubeOutlined />
                  </a> */}
                  <a 
                    style={
                      {
                        color:"green",
                        fontSize:"25px"
                      }
                    } 
                    target='_blank' 
                    href='https://www.instagram.com/posto_bella?igsh=cm02b2JmbWJucnB3'>
                    <InstagramOutlined />
                  </a>
                  {/* <a 
                    style={
                      {
                        color:"green",
                        fontSize:"25px"
                      }
                    } 
                    target='_blank' 
                    href='https://www.facebook.com/letsexploretanzania'>
                    <LikeOutlined />
                  </a> */}
                  {/* <a 
                    style={
                      {
                        color:"green",
                        fontSize:"25px"
                      }
                    } 
                    target='_blank' 
                    href='https://vm.tiktok.com/ZMrQXgCbL/'>
                      <TikTokOutlined />
                  </a> */}
                  <a 
                    style={
                      {
                        color:"green",
                        fontSize:"25px"
                      }
                    } 
                    target='_blank' 
                    href='https://wa.me/255762444414?text=Welcome+to+Posto+Bella+Resort,+how+can+we+be+of+service+today?'
                  >
                    <WhatsAppOutlined />
                  </a>
                </Flex>
          </Col>
          {/* <Col xs={24} sm={8} lg={8} xl={8} xxl={8}>
             <h2>Destinations</h2>
             <List
                grid={{ gutter: 16, column: isMobile ? 2 : 3 }}
                size="small"
                dataSource={destinations}
                renderItem={item => <List.Item><Link style={{color :"white"}} to={``}>{item}</Link></List.Item>}
              />
          </Col> */}

          
        </Row>
        {/* <Row style={{ textAlign: 'center', marginTop: '20px', backgroundColor:"black" }}>
            <Col span={24}>
              ©{new Date().getFullYear()} Built with love by <a href='https://www.tante.tz' target="_blank">tante.tz</a>
            </Col>
        </Row> */}
        <Row style={{ textAlign: 'center', marginTop: '20px', backgroundColor:"black" }}>
            <Col span={24}>
              ©{new Date().getFullYear()} Built with love by tante
            </Col>
        </Row>
            
      </Footer>
    </Layout>
      );
}
