import { Col, Flex, Progress, Row, Steps, Typography, Image, Button, Carousel, Select, DatePicker, notification, Card, Modal } from "antd";
import { EditOutlined, EnvironmentOutlined, FileAddOutlined, HeatMapOutlined, LoadingOutlined, NodeExpandOutlined, RightOutlined } from "@ant-design/icons";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import { getDestinations, getLivePrivateTours } from "../services/admin/privateTourService";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function HomePage(){
    const [openModel2,setOpenModel2] = useState<boolean>(false);
    const [openModel3,setOpenModel3] = useState<boolean>(false);


    function CarouselImage(url:string)
    {
        return(<Image 
                width={"100%"}
                height={"700px"}
                style={{
                  objectFit:"cover"
                }}
                preview={false} 
                src={url}
              />
        )
    }

    return(
      <div style={{width:"100%"}}>

          <Flex 
            vertical
          >

             {
                isMobile ?(
                    <Row>
                      <Col span={24} style={{backgroundColor:"white"}}>
                          <Carousel 
                            autoplay
                            arrows
                          >
                            {/* <div>
                              <Image preview={false} src="/carousel/bluePool.jpeg"/>
                            </div> */}
                            
                            <div>
                              <Image preview={false} src="/carousel/lightBlue.jpeg"/>
                            </div>
                        
                            <div>
                              <Image preview={false} src="/carousel/team.jpeg"/>
                            </div>
                            
                          </Carousel>
                      </Col>
                    </Row>
                    )
                    :
                (
                  <Row
                    style={
                      {
                        width: "100%",
                        minHeight: "400px" 

                      }
                    }
                  >
                      <Col 
                        span={24} 
                        
                      >

                          <Carousel 
                            autoplay
                            arrows
                          >
                            {/* <div>
                              {CarouselImage("/carousel/bluePool.jpeg")}
                            </div> */}
                            <div>
                              
                             { CarouselImage("/carousel/lightBlue.jpeg")}
                            </div>
                            <div>
                              { CarouselImage("/carousel/team.jpeg")}
                            </div>
                            
                          </Carousel>
                        
                      </Col>
                    </Row>
                )
            }
           
              <Typography.Title 
                style={
                  {
                    textAlign:"center",
                    fontFamily:"monospace"
                  }
                } 
                level={3}
              >
                About Us
              </Typography.Title>
            
            <Row 
              justify={"center"}
              style={
                {
                  padding:"10px"
                }
              }
            >
              <Col xs={24} sm={6} lg={12} xl={12} xxl={12}>
                <Typography.Text>
                  Nestled within the peaceful neighborhood of Plot 1957, Kilungule Street, Bunju – Dar es Salaam, Posto Bella Resort invites you to a refreshing coastal experience just minutes away from the pulse of Tanzania’s most vibrant city. Designed to feel like a home away from home, our resort blends relaxation, elegant accommodation, delicious dining and exciting recreational facilities into one unforgettable destination.
                </Typography.Text>
              </Col>
              
            </Row>


             <Row 
              justify={"center"}
              style={
                {
                  padding:"10px"
                }
              }
            >
              <Col xs={24} sm={6} lg={12} xl={12} xxl={12}>
                <Typography.Text>
                  Our comfortable and modern rooms offer the perfect blend of simplicity, elegance and privacy. Designed for travellers, couples and families, each room promises peaceful sleep, essential amenities, and a relaxing atmosphere. Stay the night… or stay the week — you’ll feel the difference.
                </Typography.Text>
              </Col>
              
            </Row>
                  
            <Row 
                justify="space-around" 
                align="middle"
                gutter={[0, 10]}
              >

                <Col 
                  xs={20}
                  sm={20}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                  style={{
                    // display: "flex",           // make flex container
                    // justifyContent: "center",  // horizontal center
                    // alignItems: "center",      // vertical center
                    // height: "100vh",            // needed if you want vertical center
                  }}
                >
                  <Card
                    hoverable
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    cover={
                      <div style={{ height: 220, overflow: "hidden" }}>

                        <img
                        draggable={false}
                        alt="example"
                        src="swim.jpeg"
                        style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                      />

                      </div>
                    }
                  >
                    <Meta 
                      title="Swim, Relax & Refresh"
                      description="Take a dip in our beautiful swimming pool, perfect for cooling off under the Dar es Salaam sun. Families, couples, and groups can enjoy safe, clean and refreshing waters, with poolside spaces designed for comfort and fun." 
                    />
                  </Card>
                </Col>

                <Col 
                  xs={20}
                  sm={20}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                >
                  <Card
                    hoverable
                     style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    cover={
                      <div style={{ height: 220, overflow: "hidden" }}>

                        <img
                          draggable={false}
                          alt="example"
                          src="grilledPrawns.png"
                          style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                        />

                      </div>
                    }
                  >
                    <Meta 
                      title="A Taste of Tanzania & Beyond"
                      description="Sit down to an exceptional dining experience at our restaurant, offering a range of mouth-watering meals, tropical beverages and fresh flavors that bring people together. Whether it’s a quick bite or a full-course meal, Posto Bella serves food that turns moments into memories" 
                    />
                  </Card>
                </Col>

                <Col 
                  xs={20}
                  sm={20}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                >
                  <Card
                    hoverable
                     style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    cover={
                      <div style={{ height: 220, overflow: "hidden" }}>
                        <img
                          draggable={false}
                          alt="example"
                          src="event.jpeg"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    }
                  >
                    <Meta 
                      title="Your Event, Our Space"
                      description="From corporate meetings and business retreats, to weddings, birthdays, private parties, and social gatherings, Posto Bella provides flexible event venues, outstanding service and beautiful scenery to fit your occasion. Bring your people — we’ll bring the setting and support you need for success." 
                    />
                  </Card>
                </Col>
            </Row>
          
            <Row 
                justify="space-around" 
                align="middle"
                gutter={[0, 10]}
                style={{background:"#bcc2bf"}}
                
              >

                <Col 
                  xs={20}
                  sm={20}
                  md={10}
                  lg={10}
                  xl={10}
                  xxl={10}
                >
                <div
                  
                >
                    <Image
                    preview={false}
                    alt="basic"
                    src="family.png"
                  />
                </div>
                 
                 
                </Col>

                <Col 
                  xs={20}
                  sm={20}
                  md={10}
                  lg={10}
                  xl={10}
                  xxl={10}
                  
                >
                  <Flex
                  vertical
                  >

                    <h1 
                      style={{ 
                        textAlign:"center"
                      }}
                    >
                      BOOK YOUR GETAWAY WITH US
                    </h1>
                    <p 
                      style={{ 
                        textAlign:"center"
                      }}
                    >
                      Book your getaway with Posto Bella Resort and escape into a world of coastal comfort, vibrant culture, and unforgettable hospitality.
                    </p>
                 
                    <div
                      style={{
                        display:"flex",
                        justifyContent:"center"
                      }}
                    >
                       <Button color="orange" variant="solid"  size="large"  >
                         BOOK NOW
                       </Button>
                    </div>

                  </Flex>
                  
                   
                  
                  
                </Col>

                
            </Row>
          
            
            <Flex vertical style={{background:"FCF0F0"}}>

                <Typography.Title style={{textAlign:"center"}}>Our Partners</Typography.Title>
                <Row 
                justify="space-around" 
                align="middle"
                gutter={[0, 10]}
              >

            
                <Modal
                  centered
                  open={openModel2}
                  width={1000}
                  onCancel={() => setOpenModel2(false)}
                  footer={null}
                >
                  <Image.PreviewGroup
                    preview={{
                      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                  >
                    <Image
                      alt="svg image"
                      width={200}
                      src="partners/dainty/da1.png"
                    />
                    <Image
                      alt="svg image"
                      width={200}
                      src="partners/dainty/da2.png"
                    />
                    <Image
                      alt="svg image"
                      width={200}
                      src="partners/dainty/da3.png"
                    />
                  </Image.PreviewGroup>
                </Modal>

                <Modal
                  title="Modal 1000px width"
                  centered
                  open={openModel3}
                  width={1000}
                  onCancel={() => setOpenModel3(false)}
                  footer={null}
                >
                  <Image.PreviewGroup
                    preview={{
                      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                  >
                    <Image
                      alt="svg image"
                      width={200}
                      src="partners/bellissimo/b1.png"
                    />
                    <Image
                      width={200}
                      alt="svg image"
                      src="partners/bellissimo/b2.png"
                    />
                    <Image
                      width={200}
                      alt="svg image"
                      src="partners/bellissimo/b3.png"
                    />
                  </Image.PreviewGroup>
                </Modal>

                <Col 
                  xs={20}
                  sm={20}
                  md={4}
                  lg={4}
                  xl={4}
                  xxl={4}
                >
                  
                </Col>

                <Col 
                  xs={20}
                  sm={20}
                  md={4}
                  lg={4}
                  xl={4}
                  xxl={4}
                >
                
                 <Card
                      hoverable
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      actions={[
                        <Button type="primary" onClick={() => setOpenModel2(true)}>View Property</Button>
                      ]}
                      cover={
                          <div 
                            style={{ 
                                height: 250, 
                                overflow: "hidden"
                            }}
                           >
                            <img
                              draggable={false}
                              alt="example"
                              src="partners/dainty/profile.png"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                       }
                    >
                      <Meta 
                         title="Dainty Home Stay"
                         description="Scenic home in 14 Ngwila Rd in Bagamoyo near Epiphany Christian Centre Offering a Fantastic Stay!." 
                        />
                 </Card>
                 
                </Col>

                <Col 
                  xs={20}
                  sm={20}
                  md={4}
                  lg={4}
                  xl={4}
                  xxl={4}
                  
                >
                  
                    <Card
                      hoverable
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                      actions={[
                        <Button type="primary" onClick={() => setOpenModel3(true)}>View Property</Button>
                      ]}
                      cover={
                          <div 
                            style={{ 
                                height: 250, 
                                overflow: "hidden"
                            }}
                           >
                            <img
                              draggable={false}
                              alt="example"
                              src="partners/bellissimo/profile.png"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                       }
                    >
                      <Meta 
                         title="Bellissimo Vacation Home"
                         description="A very beautiful home available for overnight stay situated in a very decent & calm area in Njiro." 
                        />
                    </Card>
                  
                </Col>

                
                <Col 
                  xs={20}
                  sm={20}
                  md={4}
                  lg={4}
                  xl={4}
                  xxl={4}
                >
                  
                </Col>
                
            </Row>
            </Flex>
           
                

          </Flex>

      </div>
    )
    
      
    ;
}