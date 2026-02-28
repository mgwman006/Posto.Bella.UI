import { Button, Card, Col, Flex, Result, Row, Space, Typography } from "antd";
import { EditOutlined, EnvironmentOutlined, FileAddOutlined, HeatMapOutlined, HomeOutlined, LoadingOutlined, LockOutlined, NodeExpandOutlined, RightOutlined, ShopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";



export default function Admin()
{
    const navigate = useNavigate();

    return(
        <Row
            justify={"center"}
            align={"middle"}
            gutter={[10,10]}
        >
            <Col span={24}>
                <Typography.Title level={3} style={{textAlign:"center"}}>
                    POSTO BELLA RESORT
                </Typography.Title>
            </Col>
            <Col xs={22} sm={22} lg={10} xl={10} xxl={10}>
                <Flex align="center" justify="center">
                    <Card 
                        hoverable 
                        onClick={() => navigate("/booking/room")}
                        style={{width:"100%"}}
                    >
                        <Result
                            icon={<HomeOutlined  size={10}/>}
                            title="Room Booking"
                            subTitle="Book Accommodations and suite"
                            extra={<Button color="green" variant="solid">Book Now</Button>}
                            style={{width:"100%"}}
                        />
                    </Card>
                </Flex>
            </Col>

            <Col xs={22} sm={22} lg={10} xl={10} xxl={10}>
                <Flex align="center" justify="center">
                    <Card 
                        hoverable 
                        // onClick={() => navigate("/booking/restaurant")}
                        style={{width:"100%"}}
                    >
                        <Result
                            icon={<ShopOutlined  size={10}/>}
                            title="Restaurant Reservation"
                            subTitle="Reserve tables & place orders"
                            extra={<Button color="green" variant="solid" disabled>Book Now</Button>}
                            style={{width:"100%"}}
                        />
                    </Card>
                </Flex>
            </Col>

            <Col xs={22} sm={22} lg={18} xl={18} xxl={18}>
                <Flex 
                    style={{
                        backgroundColor:"#FFF7ED"
                    }}
                    align="center" 
                    justify="center" 
                    vertical
                >
                    <Typography.Title level={3}>Internal Use Only</Typography.Title>
                    <Typography.Text style={{textAlign:"center"}}>
                        This booking portal is intended exclusively for authorized Posto Bella Resort staff. All reservation and guest information is confidential and must be entered accurately. Unauthorized access, sharing, or misuse of this system may result in disciplinary action in accordance with company policy.
                    </Typography.Text>
                    <Button type="primary" danger><LockOutlined />Confidential</Button>
                </Flex>
            </Col>

        </Row>
    );
}