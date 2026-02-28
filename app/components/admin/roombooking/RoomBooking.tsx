import { Button, Col, Form, Input, Row, Select, Space, DatePicker, GetProps, DatePickerProps, InputNumber, Radio, Card, Flex, Result } from "antd";
import { RoomBookingModel } from "../../../models/booking";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
const { RangePicker } = DatePicker;
import { BackwardOutlined, CloseOutlined, DownloadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BookingPDF from "./RoomBookingPDF";
import { data } from "react-router";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface RoomOption {
  label: string;
  value: string;
  cost: number;
}
const roomsData : RoomOption[]= [
        { label: 'Standard BO - Tsh 70,000', value:"Standard BO", cost: 70000 },
        { label: 'Standard B&B - Tsh 80,000',value:"Standard BB", cost: 80000 },
        { label: 'Standard Room WE B&B - Ths 110,000', value:"Standard Room WE BB",cost: 110000 },
        { label: 'Jnr Suite BO - Tsh 80,000', value:"Jnr Suite BO",cost: 80000 },
        { label: 'Jnr Suite B&B - Tsh 110,000', value:"Jnr Suite BB",cost: 110000 },
        { label: 'Jnr Suite WE B&B - Tsh 130,000', value:"Jnr Suite WE BB",cost: 130000 },
        { label: 'Family Suite B&B Tsh 150,000', value:"Family Suite BB",cost: 150000 },
    ];


export default function RoomBooking()
{
    const [bookingData, setBookingData] = useState<RoomBookingModel|null>(null);
    const [checkInDateValue,setCheckInDateValue] = useState<dayjs.Dayjs>();
    const [checkOutDateValue,setCheckOutDateValue] = useState<dayjs.Dayjs>();
    const [roomsValue,setRoomsValue] = useState<RoomOption[]>();
    const [nightsValue,setNightsValue] = useState<number>(0);
    const [totalAmountStateValue,setTotalAmountStateValue] = useState<number>(0);
    const [amountPaidStateValue,setAmountPaidStateValue] = useState<number>(0);
    const [form] = Form.useForm();

    
    useEffect(
        () =>
        {
            let totalCost:number = 0;
            roomsValue?.forEach((data,index) => {
                totalCost += data.cost*nightsValue;
            });
            setTotalAmountStateValue(totalCost);
            form.setFieldsValue({ totalAmount: totalCost });
        }
        ,[roomsValue,nightsValue]
    );

    useEffect(
        () =>
        {
            let balanceValue:number = totalAmountStateValue-amountPaidStateValue;
            form.setFieldsValue({ balance: balanceValue });
        }
        ,[totalAmountStateValue,amountPaidStateValue]
    );


    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };

    const handleOnOkCheckInDate = (date: dayjs.Dayjs) => {
        if (!date) return;

        setCheckInDateValue(date);
        let nights:number =0;

        if(checkOutDateValue)
            nights = checkOutDateValue.diff(date, "day") || 0;

        form.setFieldsValue({ numberOfNights: nights });
        setNightsValue(nights);
    };

    const handleOnOkCheckOutDate = (date: dayjs.Dayjs) => {
        if (!date) return;
        setCheckOutDateValue(date);
        const nights = date.diff(checkInDateValue, "day") || 0;
        form.setFieldsValue({ numberOfNights: nights });
        setNightsValue(nights);
    };


    const handleRoomChange = (index: number, selectedRoomValue?: string) => {
        const rooms = form.getFieldValue("rooms") || [];
        if (!rooms[index]) return;

        const room = rooms[index];

        // Find room price from your roomsData
        const option = roomsData.find((r) => r.value === (selectedRoomValue || room.roomType));
        const price = option?.cost || 0;

        const quantity = room.quantity || 1;

        // Update room info
        rooms[index] = {
            ...room,
            roomType: option?.value,
            cost: price * quantity,
        };

        form.setFieldsValue({ rooms });
        setRoomsValue(rooms);
    };


    const onFinish = (values: any) => {

        const booking: RoomBookingModel = {
            customerName: form.getFieldValue("guestName"),
            email: "email",
            phone: form.getFieldValue("phoneNumber"),
            checkInDate: form.getFieldValue("checkInDate"),
            checkOutDate: form.getFieldValue("checkOutDate"),
            nights: form.getFieldValue("numberOfNights"),
            rooms: form.getFieldValue("rooms"),
            extras: [],
            expectedTimeOfArrival:"",
            paymentDetails:{
                totalAmount:form.getFieldValue("totalAmount"),
                amountPaid:form.getFieldValue("amountPaid"),
                balance:form.getFieldValue("balance"),
                paymentMethod:form.getFieldValue("paymentMethod")
            },
            receptionist:form.getFieldValue("receptionist"),
            remarks:form.getFieldValue("remarks")
      
        };

        setBookingData(booking);
  };

    return(
        <Row
       
            justify={"center"}
            align={"middle"}
        >
            <Col xs={22} sm={22} lg={10} xl={10} xxl={10}>
                {!bookingData && (
                        <Form
                            layout="vertical"
                            form={form}
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item name="guestName" label="Guest / Company Name" rules={[{ required: true }]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name="phoneNumber" label="Guest WhatsApp Number" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Check-In Date"
                                name="checkInDate"
                            >
                                <DatePicker
                                    format="YYYY-MM-DD HH:mm:ss"
                                    disabledDate={disabledDate}
                                    showTime={{ defaultOpenValue: dayjs('00:00:00', 'HH:mm:ss') }}
                                    style={{ width: '100%' }}
                                    onOk={handleOnOkCheckInDate}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Check-Out Date"
                                name="checkOutDate"
                            >
                                <DatePicker
                                    format="YYYY-MM-DD HH:mm:ss"
                                    disabledDate={disabledDate}
                                    showTime={{ defaultOpenValue: dayjs('00:00:00', 'HH:mm:ss') }}
                                    style={{ width: '100%' }}
                                    onOk={handleOnOkCheckOutDate}
                                />
                            </Form.Item>
                            <Form.Item 
                                name="numberOfNights" 
                                label="Number of Nights"
                            >
                                <InputNumber style={{ width: '100%' }} disabled/>
                            </Form.Item>

                            <Form.List 
                                name="rooms"
                                rules={[
                                    {
                                        validator: async (_, rooms) => {
                                        if (!rooms || rooms.length < 1) {
                                            return Promise.reject(new Error('At least 1 room is required'));
                                        }
                                        },
                                    },
                                ]}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        
                                        <Card
                                            style={{ width: 350 }}
                                            size="small"
                                            title={`Room ${name + 1}`}
                                            key={key}
                                            extra={
                                            <CloseOutlined
                                                onClick={() => {
                                                remove(name);
                                                }}
                                            />
                                            }
                                        >
                                            <Flex key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline" vertical>
                                                <Form.Item 
                                                    {...restField}
                                                    label="RoomType"
                                                    name={[name, 'roomType']}
                                                    rules={[{ required: true, message:'Room Type is required' }]}>
                                                    <Select
                                                        allowClear
                                                        placeholder="Select Room Type"
                                                        style={{ width: 300 }}
                                                        options={roomsData}
                                                        onChange={(value) => handleRoomChange(name, value)}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Quantity"
                                                    name={[name, 'quantity']}
                                                    rules={[{ required: true, message: 'Quantity is required' }]}
                                                >
                                                    <InputNumber min={1} onChange={() => {handleRoomChange(name);}} style={{ width: 300 }} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Cost"
                                                    name={[name, 'cost']}
                                                    rules={[{ required: true }]}
                                                >
                                                    <InputNumber style={{ width: 300 }} min={0}  disabled/>
                                                </Form.Item>
                                            </Flex>
                                        </Card>
                                    ))}
                                    <Form.Item>
                                        <Button color="yellow" variant="solid" onClick={() => add()} block icon={<PlusOutlined />}  >
                                            Add Room
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                    </>
                                )}
                            </Form.List>

                            <Form.List 
                                name="extraService"
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        
                                        <Card
                                            style={{ width: 350 }}
                                            size="small"
                                            title={`Service ${name + 1}`}
                                            key={key}
                                            extra={
                                            <CloseOutlined
                                                onClick={() => {
                                                remove(name);
                                                }}
                                            />
                                            }
                                        >
                                            <Flex key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline" vertical>
                                                <Form.Item 
                                                    {...restField}
                                                    label="ServiceType"
                                                    name={[name, 'service']}
                                                    rules={[{ required: true, message:'Service Type is required' }]}>
                                                    <Select
                                                        allowClear
                                                        placeholder="Select Service Type"
                                                        style={{ width: 300 }}
                                                        options={roomsData}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Quantity"
                                                    name={[name, 'quantity']}
                                                    rules={[{ required: true, message: 'Quantity is required' }]}
                                                >
                                                    <InputNumber placeholder="Quantity" style={{ width: 300 }} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Cost"
                                                    name={[name, 'cost']}
                                                    rules={[{ required: true, message: 'Missing last name' }]}
                                                >
                                                        <InputNumber style={{ width: 300 }} disabled/>
                                                </Form.Item>
                                            </Flex>
                                        </Card>
                                    ))}
                                    <Form.Item>
                                        <Button color="blue" variant="solid" onClick={() => add()} block icon={<PlusOutlined />}  >
                                            Add Extra Service
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                    </>
                                )}
                            </Form.List>

                            <Form.Item 
                                name="totalAmount" 
                                label="Total Amount"
                            >
                                <InputNumber style={{ width: '100%' }} disabled/>
                            </Form.Item>
                            <Form.Item 
                                name="amountPaid" 
                                label="Amount Paid"
                            >
                                <InputNumber onChange={(value) => setAmountPaidStateValue(Number(value??0))} style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item 
                                name="balance" 
                                label="Balance"
                            >
                                <InputNumber style={{ width: '100%' }} disabled/>
                            </Form.Item>

                            <Form.Item name="paymentMethod" label="Payment Option">
                                <Radio.Group>
                                    <Radio value="Cash"> Cash </Radio>
                                    <Radio value="Mobile Mobey"> Mobile Mobey </Radio>
                                    <Radio value="Bank Tranfer"> Bank Tranfer </Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item name="remarks" label="Special Request / Remarks">
                                <TextArea rows={4} />
                            </Form.Item>
                            
                            <Form.Item name="receptionist" label="Receptionist" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>


                            <Form.Item>
                                <Button color="green" variant="solid" htmlType="submit" block>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                )
                }
                
                {bookingData && (
                    <Result
                        status="success"
                        title="Record Successfully Submitted"
                        subTitle={`Booking details for custome ${bookingData.customerName} has submitted`}
                        extra={[
                        <PDFDownloadLink
                            document={<BookingPDF booking={bookingData} />}
                            fileName="booking-confirmation.pdf"
                            style={{ textDecoration: "none" }} // remove default link style
                            >
                            {({ loading }) => (
                                <Button
                                type="primary"
                                icon={<DownloadOutlined />}
                                loading={loading}
                                >
                                {loading ? "Generating PDF..." : "Download pdf Document"}
                                </Button>
                            )}
                        </PDFDownloadLink>,
                        <Button icon={<BackwardOutlined />} onClick={() => {setBookingData(null)}} variant="filled" color="red">Go Back</Button>,
                        ]}
                    />
                    
                )}
                
            </Col>
                        
                        
            
        </Row>
    );
}