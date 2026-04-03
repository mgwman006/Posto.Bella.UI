import { Button, Col, Form, Input, Row, Select, Space, DatePicker, GetProps, DatePickerProps, InputNumber, Radio, Card, Flex, Result, Typography, Modal, TimePicker } from "antd";
import { RoomBookingModel } from "../../../models/booking";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { BackwardOutlined, CloseOutlined, DownloadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from "dayjs";
import { pdf, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import BookingPDF from "./RoomBookingPDF";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

const timeFormat = 'HH:mm';

interface RoomOption {
  label: string;
  value: string;
  cost: number;
}
interface ExtrasOption {
  label: string;
  value: string;
  cost: number;
}
const roomsData : RoomOption[]= [
        { label: 'Standard BO - Tsh 70,000', value:"Standard BO", cost: 70000 },
        { label: 'Standard Room WE BO - Tsh 80,000',value:"Standard Room WE BO", cost: 80000 },
        { label: 'Standard Room WE B&B - Ths 110,000', value:"Standard Room WE BB",cost: 110000 },
        { label: 'Jnr Suite BO - Tsh 80,000', value:"Jnr Suite BO",cost: 80000 },
        { label: 'Jnr Suite B&B - Tsh 110,000', value:"Jnr Suite BB",cost: 110000 },
        { label: 'Jnr Suite WE B&B - Tsh 130,000', value:"Jnr Suite WE BB",cost: 130000 },
        { label: 'Family Suite B&B Tsh - 150,000', value:"Family Suite BB",cost: 150000 },
        { label: 'Family Suite Bed Only - Tsh 130,000', value:"Family Suite Bed Only",cost: 130000 },
        { label: 'Family Suite BO (Offer) - Tsh 100,000', value:"Family Suite BO (Offer)",cost: 100000 },
        { label: 'Breakfast for 1-2 Pax - Tsh 30,000', value:"Breakfast for 1-2 Pax",cost: 30000 },
        { label: 'Twin room BO - 140,000', value:"Twin room BO",cost: 140000 },
        { label: 'Twin room B&B - 170,000', value:"Twin room BB",cost: 170000 },
    ];

const extrasData : ExtrasOption[]= [
        { label: 'Extra Person Adult - Tsh 60,000', value:"Extra Person Adult", cost: 60000 },
        { label: 'Extra Person Kid - Tsh 50,000',value:"Extra Person Kid", cost: 50000 },
        { label: 'Extra Time Jnr Suite - Tsh 40,000', value:"Extra Time Jnr Suite",cost: 40000 },
        { label: 'Extra Time Standard Room - Tsh 40,000', value:"Extra Time Standard Room",cost: 40000 },
        { label: 'Extra Bed - Tsh 50,000', value:"Extra Bed",cost: 50000 },
        { label: 'Extra Time Family Suite - Tsh 80,000', value:"Extra Time Family Suite",cost: 80000 },
        { label: 'Jnr Suite Extra Bed- Tsh 40,000', value:"Jnr Suite Extra Bed",cost: 40000 },
    ];


export default function RoomBooking()
{
    const [roomsValue,setRoomsValue] = useState<RoomOption[]>();
    const [extrasValue,setExtrasValue] = useState<ExtrasOption[]>();
    const [totalAmountStateValue,setTotalAmountStateValue] = useState<number>(0);
    const [amountPaidStateValue,setAmountPaidStateValue] = useState<number>(0);
    const [form] = Form.useForm();

    
    useEffect(
        () =>
        {
            let totalCost:number = 0;
            roomsValue?.forEach((data,index) => {
                totalCost += data.cost;
            });

            extrasValue?.forEach((data,index) => {
                totalCost += data.cost;
            });

            setTotalAmountStateValue(totalCost);
            form.setFieldsValue({ totalAmount: totalCost });
        }
        ,[roomsValue,extrasValue]
    );

    useEffect(
        () =>
        {
            let balanceValue:number = totalAmountStateValue-amountPaidStateValue;
            form.setFieldsValue({ balance: balanceValue });
        }
        ,[totalAmountStateValue,amountPaidStateValue]
    );

 


    const handleRoomChange = (index: number, selectedRoomValue?: string) => {
        const rooms = form.getFieldValue("rooms") || [];
        if (!rooms[index]) return;

        const room = rooms[index];

        // Find room price from your roomsData
        const option = roomsData.find((r) => r.value === (selectedRoomValue || room.roomType));
        const price = option?.cost || 0;
        const quantity = room.quantity || 0;

        const checkIn = room.checkInDate;
        const checkOut = room.checkOutDate;

         let numberOfNights = 0;

        if (checkIn && checkOut) {
            numberOfNights = dayjs(checkOut).diff(dayjs(checkIn), "day");
        }

        // Update room info
        rooms[index] = {
            ...room,
            roomType: option?.value,
            cost: price * quantity * numberOfNights,
            numberOfNights
        };

        form.setFieldsValue({ rooms });
        setRoomsValue(rooms);
    };

    const handleExtrasChange = (index: number, selectedRoomValue?: string) => {
        const extras = form.getFieldValue("extras") || [];
        if (!extras[index]) return;

        const extra = extras[index];

        // Find room price from your roomsData
        const option = extrasData.find((r) => r.value === (selectedRoomValue || extra.serviceType));
        const price = option?.cost || 0;
        const quantity = extra.quantity || 0;

        const checkIn = extra.checkInDate;
        const checkOut = extra.checkOutDate;

         let numberOfNights = 0;

        if (checkIn && checkOut) {
            numberOfNights = dayjs(checkOut).diff(dayjs(checkIn), "day");
        }

        // Update room info
        extras[index] = {
            ...extra,
            roomType: option?.value,
            cost: price * quantity * numberOfNights,
            numberOfNights
        };

        form.setFieldsValue({ extras });
        setExtrasValue(extras);
    };


    const onFinish = async (values: any) => {
       
       // const readableCheckIn = inDate.format("MMMM D, YYYY"); // February 28, 2026 3:30 PM
     //   const readableCheckOut = outDate.format("MMMM D, YYYY"); // March 3, 2026 11:00 AM

        const bookingData: RoomBookingModel = {
            customerName: form.getFieldValue("guestName"),
            phone: form.getFieldValue("phoneNumber"),
            rooms: form.getFieldValue("rooms"),
            extras: form.getFieldValue("extras"),
            paymentDetails:{
                totalAmount:form.getFieldValue("totalAmount"),
                amountPaid:form.getFieldValue("amountPaid"),
                balance:form.getFieldValue("balance"),
                paymentMethod:form.getFieldValue("paymentMethod")
            },
            receptionist:form.getFieldValue("receptionist"),
            remarks:form.getFieldValue("remarks"),
            expectedArrivalTime:form.getFieldValue("expectedTime").format("HH:mm")
      
        };
        

        if(bookingData)
        {
            const blob = await pdf(<BookingPDF booking={bookingData} />).toBlob();
            const url = URL.createObjectURL(blob);
            window.open(url);
        }
        else
        {
            return;
        }
        
  };

    return(
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
                        Room Booking Form
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
                                    label="Expected Time Of Arrival"
                                    name="expectedTime"
                                    rules={[{ required: true }]}
                                >
                                    <TimePicker  format={timeFormat} />
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
                                                style={{ width: '100%',backgroundColor:'#F2F2F2',marginBottom: 10  }}
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
                                                <Flex key={key} style={{ display: 'flex'}} align="baseline" vertical>
                                                    <Form.Item 
                                                        style={{width:'100%'}}
                                                        {...restField}
                                                        label="RoomType"
                                                        name={[name, 'roomType']}
                                                        rules={[{ required: true, message:'Room Type is required' }]}>
                                                        <Select
                                                            allowClear
                                                            placeholder="Select Room Type"
                                                            style={{ width: '100%'}}
                                                            options={roomsData}
                                                            onChange={(value) => handleRoomChange(name, value)}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        style={{width:'100%'}}
                                                        {...restField}
                                                        label="Check-In Date"
                                                        name={[name,'checkInDate']}
                                                        rules={[{ required: true }]}
                                                    >
                                                        <DatePicker
                                                            style={{width:'100%'}}
                                                            disabledDate={(currentDate) => {
                                                                    // Disable all dates before today
                                                                    return currentDate && currentDate.isBefore(dayjs(), 'day');
                                                                }}
                                                            onChange={() => {handleRoomChange(name);}}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                       style={{width:'100%'}}
                                                       {...restField}
                                                        label="Check-Out Date"
                                                        name={[name,'checkOutDate']}
                                                        rules={[
                                                            { required: true, message: "Please select check-out date" },
                                                            ({ getFieldValue }) => ({
                                                                validator(_, value) {
                                                                const checkIn = getFieldValue(['rooms', name, 'checkInDate']);

                                                                if (!value || !checkIn) return Promise.resolve();

                                                                if (value.isAfter(dayjs(checkIn), "day")) 
                                                                {
                                                                    return Promise.resolve();
                                                                }

                                                                return Promise.reject(
                                                                    new Error("Check-out must be at least 1 day after check-in")
                                                                );
                                                            },
                                                            }),
                                                        ]}
                                                    >
                                                        <DatePicker
                                                            disabledDate={(currentDate) => {
                                                                    const checkIn = form.getFieldValue(['rooms', name, 'checkInDate']);
                                                                    // Disable all dates before or equal to checkIn
                                                                    return checkIn ? currentDate.isSameOrBefore(dayjs(checkIn), 'day') : false;
                                                                }}
                                                            style={{width:'100%'}}
                                                            onChange={() => {handleRoomChange(name);}}
                                                            
                                                        />
                                                    </Form.Item>
                                                    <Form.Item 
                                                        style={{width:'100%'}}
                                                        {...restField}
                                                        name={[name,'numberOfNights']}
                                                        label="Number of Nights"
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
                                                        <InputNumber min={1} style={{ width: '100%' }} disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        style={{ width: '100%' }}
                                                        {...restField}
                                                        label="Quantity"
                                                        name={[name, 'quantity']}
                                                        rules={[{ required: true, message: 'Quantity is required' }]}
                                                    >
                                                        <InputNumber min={1} onChange={() => {handleRoomChange(name);}} style={{ width: '100%' }} />
                                                    </Form.Item>
                                                    <Form.Item
                                                        style={{ width: '100%' }}
                                                        {...restField}
                                                        label="Cost"
                                                        name={[name, 'cost']}
                                                        rules={[{ required: true }]}
                                                    >
                                                        <InputNumber style={{ width: '100%' }} min={0}  />
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
                                    name="extras"
                                >
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            
                                            <Card
                                                style={{ width: '100%',backgroundColor:'#F2F2F2',marginBottom: 10  }}
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
                                                        style={{ width: '100%' }}
                                                        {...restField}
                                                        label="ServiceType"
                                                        name={[name, 'serviceType']}
                                                        rules={[{ required: true, message:'Service Type is required' }]}>
                                                        <Select
                                                            allowClear
                                                            placeholder="Select Service Type"
                                                            style={{ width: '100%' }}
                                                            options={extrasData}
                                                            onChange={(value) => handleExtrasChange(name, value)}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        style={{width:'100%'}}
                                                        {...restField}
                                                        label="Check-In Date"
                                                        name={[name,'checkInDate']}
                                                        rules={[{ required: true }]}
                                                    >
                                                        <DatePicker
                                                            style={{width:'100%'}}
                                                            disabledDate={(currentDate) => {
                                                                    // Disable all dates before today
                                                                    return currentDate && currentDate.isBefore(dayjs(), 'day');
                                                                }}
                                                            onChange={() => {handleExtrasChange(name);}}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                       style={{width:'100%'}}
                                                       {...restField}
                                                        label="Check-Out Date"
                                                        name={[name,'checkOutDate']}
                                                        rules={[
                                                            { required: true, message: "Please select check-out date" },
                                                            ({ getFieldValue }) => ({
                                                                validator(_, value) {
                                                                const checkIn = getFieldValue(['rooms', name, 'checkInDate']);

                                                                if (!value || !checkIn) return Promise.resolve();

                                                                if (value.isAfter(dayjs(checkIn), "day")) 
                                                                {
                                                                    return Promise.resolve();
                                                                }

                                                                return Promise.reject(
                                                                    new Error("Check-out must be at least 1 day after check-in")
                                                                );
                                                            },
                                                            }),
                                                        ]}
                                                    >
                                                        <DatePicker
                                                            disabledDate={(currentDate) => {
                                                                    const checkIn = form.getFieldValue(['extras', name, 'checkInDate']);
                                                                    // Disable all dates before or equal to checkIn
                                                                    return checkIn ? currentDate.isSameOrBefore(dayjs(checkIn), 'day') : false;
                                                                }}
                                                            style={{width:'100%'}}
                                                            onChange={() => {handleExtrasChange(name);}}
                                                            
                                                        />
                                                    </Form.Item>
                                                    <Form.Item 
                                                        style={{width:'100%'}}
                                                        {...restField}
                                                        name={[name,'numberOfNights']}
                                                        label="Number of Nights"
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
                                                        <InputNumber min={1} style={{ width: '100%' }} disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        style={{ width: '100%' }}
                                                        {...restField}
                                                        label="Quantity"
                                                        name={[name, 'quantity']}
                                                        rules={[{ required: true, message: 'Quantity is required' }]}
                                                    >
                                                        <InputNumber style={{ width: '100%' }} min={1} onChange={() => {handleExtrasChange(name);}}/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        style={{ width: '100%' }}
                                                        {...restField}
                                                        label="Cost"
                                                        name={[name, 'cost']}
                                                        rules={[{ required: true, message: 'Missing last name' }]}
                                                    >
                                                        <InputNumber min={0} style={{ width: '100%' }} />
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
                                    <InputNumber style={{ width: '100%' }} />
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
                                    name="paymentMethod" 
                                    label="Payment Option"
                                    rules={[{ required: true }]}
                                >
                                    <Radio.Group>
                                        <Radio value="Cash"> Cash </Radio>
                                        <Radio value="Mobile Money"> Mobile Money </Radio>
                                        <Radio value="Bank Tranfer"> Bank Tranfer </Radio>
                                    </Radio.Group>
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