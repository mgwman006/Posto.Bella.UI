// BookingPDF.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from "@react-pdf/renderer";
import { RoomBookingModel } from "../../../models/booking";


/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica"
  },
  header: {
    fontSize: 18,
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "bold"
  },
  section: {
    marginBottom: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  sectionTitle: {
    fontSize: 13,
    marginBottom: 8,
    fontWeight: "bold"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4
  },
  label: {
    fontWeight: "bold"
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    textAlign: "center"
  }
});

/* ================= COMPONENT ================= */

interface BookingPDFProps {
  booking: RoomBookingModel;
}

const BookingPDF: React.FC<BookingPDFProps> = ({ booking }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>BOOKING CONFIRMATION</Text>

      {/* Customer Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Full Name:</Text>
          <Text>{booking.customerName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text>{booking.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <Text>{booking.phone}</Text>
        </View>
      </View>

      {/* Booking Dates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booking Dates</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Check-in:</Text>
          <Text>{JSON.stringify(booking.checkInDate)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Check-out:</Text>
          <Text>{JSON.stringify(booking.checkOutDate)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Nights:</Text>
          <Text>{booking.nights}</Text>
        </View>
      </View>

      {/* Room Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rooms</Text>
        {booking.rooms.length > 0 ? (
          booking.rooms.map((room, index) => (
            <View style={styles.row} key={index}>
              <Text>{room.roomType}</Text>
              <Text>Tsh: {room.cost}</Text>
            </View>
          ))
        ) : (
          <Text>No Room selected</Text>
        )}
      </View>

      {/* Extra Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Extra Services</Text>
        {booking.extras.length > 0 ? (
          booking.extras.map((extra, index) => (
            <View style={styles.row} key={index}>
              <Text>{extra.name}</Text>
              <Text>${extra.cost}</Text>
            </View>
          ))
        ) : (
          <Text>No extra services selected</Text>
        )}
      </View>

      {/* Payment Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Total Cost:</Text>
          <Text>Tsh: {booking.paymentDetails.totalAmount}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Amount Paid:</Text>
          <Text>Tsh: {booking.paymentDetails.amountPaid}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Balance:</Text>
          <Text>Tsh: {booking.paymentDetails.balance}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Payment Method:</Text>
          <Text>{booking.paymentDetails.paymentMethod}</Text>
        </View>
      </View>

      {/* Remarks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Remarks</Text>
        <Text>{booking.remarks ?? "No remarks provided."}</Text>
      </View>

      {/* Receptionist */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Receptionist</Text>
        <Text>{booking.receptionist ?? "No data provided."}</Text>
      </View>

      <Text style={styles.footer}>
        Thank you for choosing us. We look forward to hosting you!
      </Text>
    </Page>
  </Document>
);

export default BookingPDF;