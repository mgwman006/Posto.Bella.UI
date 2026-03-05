import { Button, Col, Form, Input, Row, Select, Space, DatePicker, GetProps, DatePickerProps, InputNumber, Radio, Card, Flex, Result, Typography, Modal, TimePicker } from "antd";
import { RestaurantBookingModel, RoomBookingModel } from "../../../models/booking";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from "dayjs";
import { pdf } from "@react-pdf/renderer";
import RestaurantBookingPDF from "./RestaurantBookingPDF";


type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;



export default function RestaurantBooking()
{
    const [bookingData, setBookingData] = useState<RestaurantBookingModel>();
    const [totalAmountStateValue,setTotalAmountStateValue] = useState<number>(0);
    const [amountPaidStateValue,setAmountPaidStateValue] = useState<number>(0);
    const [form] = Form.useForm();

    

    useEffect(
        () =>
        {
            let balanceValue:number = totalAmountStateValue-amountPaidStateValue;
            form.setFieldsValue({ balance: balanceValue });
        }
        ,[totalAmountStateValue,amountPaidStateValue]
    );


    const disabledCheckInDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today
        return current && current < dayjs().startOf('day');
    };


    const disabledTime = () => {
        const now = dayjs();

        return {
            disabledHours: () => {
            const hours = [];
            for (let i = 0; i < now.hour(); i++) {
                hours.push(i);
            }
            return hours;
            },
            disabledMinutes: (selectedHour: number) => {
            if (selectedHour === now.hour()) {
                const minutes = [];
                for (let i = 0; i < now.minute(); i++) {
                minutes.push(i);
                }
                return minutes;
            }
            return [];
            },
        };
    };

    const disabledEatingTime = () => {
    const arrivalTime = form.getFieldValue("arrivalTime");

    if (!arrivalTime) {
        return {
            disabledHours: () => [],
            disabledMinutes: () => [],
        };
    }

    return {
        disabledHours: () => {
            const hours: number[] = [];
            for (let i = 0; i < arrivalTime.hour(); i++) {
                hours.push(i);
            }
            return hours;
        },

        disabledMinutes: (selectedHour: number) => {
            if (selectedHour === arrivalTime.hour()) {
                const minutes: number[] = [];
                for (let i = 0; i <= arrivalTime.minute()+15; i++) {
                    minutes.push(i);
                }
                return minutes;
            }
            return [];
        },
        };
    };

    


     const onFinish = async (values: any) => {
        const payload = {
            ...values,
            arrivalTime:values.arrivalTime.format('HH:mm'),
            eatingTime: values.eatingTime.format('HH:mm'),
        };

       // alert(JSON.stringify(payload));

        let date: Dayjs = form.getFieldValue("reservationDate");
        const readableDate = date.format("MMMM D, YYYY h:mm A"); // February 28, 2026 3:30 PM

        const booking: RestaurantBookingModel = {
            customerName: payload.guestName,
            email: "",
            phone: payload.phoneNumber,
            date: readableDate,
            arrivalTime: payload.arrivalTime,
            eatingTime: payload.eatingTime,
            tableNumber: payload.tableNumber,
            guests: payload.guests,
            meal: payload.meal,
            paymentDetails:{
                totalAmount:payload.totalAmount,
                amountPaid:payload.amountPaid,
                balance:payload.balance,
                paymentMethod:""
            },
            receptionist:payload.receptionist,
            remarks:payload.remarks,
            eventType:payload.eventType,
        };

        setBookingData(booking);

        if(booking)
        {
            const blob = await pdf(<RestaurantBookingPDF booking={booking} />).toBlob();
            const url = URL.createObjectURL(blob);
            window.open(url);
        }
        else
        {
            return;
        }
        
  };

    return ( 
        <Flex 
            vertical
            style={{minHeight:'cal(100vh-60px',backgroundColor:"#D6D6D6"}}

        >
            <Row 
                justify={"center"}
                align={"middle"}
            >
                <Col 
                    xs={22} 
                    sm={20} 
                    lg={8} 
                    xl={8} 
                    xxl={8}
                >
                    <Typography.Title level={3}>
                        TABLE RESERVATION CONFIRMATION
                    </Typography.Title>
                </Col>
            </Row>
            <Row
                justify={"center"}
                align={"middle"}

            >
                <Col 
                    xs={24} 
                    sm={24} 
                    lg={8} 
                    xl={8} 
                    xxl={8}
                    style={{display: 'flex', justifyContent: 'center'}}
                >
                    <Form
                                size="large"
                                layout="vertical"
                                form={form}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                autoComplete="on"
                                style={{ backgroundColor:"#FCFCFC",width: '100%', padding:"10px",borderRadius:"10px"}}
                            >
                                <Form.Item name="guestName" label="Guest/Company Name" rules={[{ required: true }]}>
                                    <Input style={{ width: 'fillparent' }}/>
                                </Form.Item>
                                <Form.Item name="phoneNumber" label="WhatsApp Number" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Reservation Date"
                                    name="reservationDate"
                                    rules={[{ required: true }]}
                                >
                                    <DatePicker
                                        format="YYYY-MM-DD"
                                        disabledDate={disabledCheckInDate}
                                        style={{ }}
                                    />
                                </Form.Item>

                                <Form.Item name="eventType" label="Event Type" rules={[{ required: true }]}>
                                    <Input style={{ width: 'fillparent' }}/>
                                </Form.Item>

                                <Form.Item
                                    label="Arrival Time"
                                    name="arrivalTime"
                                    rules={[{ required: true }]}
                                
                                >
                                    <TimePicker format={'HH:mm'} disabledTime={disabledTime}/>
                                </Form.Item>

                                <Form.Item
                                    label="Eating Time (Preferred Time to Eat)"
                                    name="eatingTime"
                                    rules={[{ required: true }]}
                                >
                                    <TimePicker format={'HH:mm'} disabledTime={disabledEatingTime}/>
                                </Form.Item>

                                
                               
                                <Form.Item 
                                    name="tableNumber" 
                                    label="Table Number"
                                    rules={[
                                        { required: true, message: "Number of Nights must be valid" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                            const numberOfNights = getFieldValue("numberOfNights");

                                            if (!value || !numberOfNights) return Promise.resolve();

                                            if (numberOfNights>0) 
                                            {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(
                                                new Error("Number of nights must be greater than 0")
                                            );
                                        },
                                        }),
                                    ]}

                                >
                                    <InputNumber min={1} style={{ width: '100%' }} />
                                </Form.Item>

                                <Form.Item 
                                    name="guests" 
                                    label="Number of Guests"
                                    rules={[
                                        { required: true, message: "Number of Nights must be valid" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                            const numberOfNights = getFieldValue("numberOfNights");

                                            if (!value || !numberOfNights) return Promise.resolve();

                                            if (numberOfNights>0) 
                                            {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(
                                                new Error("Number of nights must be greater than 0")
                                            );
                                        },
                                        }),
                                    ]}

                                >
                                    <InputNumber min={1} style={{ width: '100%' }} />
                                </Form.Item>

                                <Form.Item 
                                    name="meal" 
                                    label="Meals Ordered"
                                >
                                    <TextArea rows={4} />
                                </Form.Item>

                                <Form.Item 
                                    name="totalAmount" 
                                    label="Total Order Price"
                                >
                                    <InputNumber style={{ width: '100%' }} onChange={(value) => setTotalAmountStateValue(Number(value??0))} />
                                </Form.Item>

                                <Form.Item 
                                    name="amountPaid" 
                                    label="Amount Paid"
                                    rules={[
                                        { required: true, message: "Amount paid is required" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                            const totalMaountValue = getFieldValue("totalAmount");

                                            if (!value || !totalMaountValue) return Promise.resolve();

                                            if(Number(value)<0)
                                                return Promise.reject(new Error("Amount can not be negative number"));

                                            if (value <= totalMaountValue) return Promise.resolve();
                                            
                                            
                                            
                                            return Promise.reject(
                                                new Error("Customer can not pay more than required amount")
                                            );
                                        },
                                        }),
                                    ]}
                                >
                                    <InputNumber onChange={(value) => setAmountPaidStateValue(Number(value??0))} style={{ width: '100%' }} />
                                </Form.Item>
                               
                                <Form.Item 
                                    name="balance" 
                                    label="Balance"
                                >
                                    <InputNumber style={{ width: '100%' }} disabled/>
                                </Form.Item>

                                <Form.Item 
                                    name="remarks" 
                                    label="Special Request / Remarks"
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                                
                                <Form.Item 
                                    name="receptionist" 
                                    label="Receptionist" 
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item>
                                    <Button color="green" variant="solid" htmlType="submit" block>
                                        Submit
                                    </Button>
                                </Form.Item>
                    </Form>
                    
                </Col>       
            </Row>
        </Flex>
        
    );
}