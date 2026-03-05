// RestaurantBooking.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import { RestaurantBookingModel, RoomBookingModel } from "../../../models/booking";


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
    fontWeight: "bold",
    color:"blue"
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
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: 20,
    alignSelf: "center"  // centers the logo
  },
   tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 6,
    alignItems: "center"
  },
  tableCell: {
    flex: 1, // each cell takes equal space
    fontSize: 11
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    paddingVertical: 4
  },
  balance: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    backgroundColor:"#E2F5C4"
  },
  termsSubtitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4
  },
  termsText: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.4
  },
  terms: {
    marginBottom: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    backgroundColor:"#FFF6E8",
    borderRadius:10,
    padding:10
  },
});

/* ================= COMPONENT ================= */

interface BookingPDFProps {
  booking: RestaurantBookingModel;
}

const RestaurantBookingPDF: React.FC<BookingPDFProps> = ({ booking }) => (
  <Document>
    <Page size="A4" style={styles.page}>
       {/* Logo */}
        <Image
            src="/logo.png"   // Can be a local path or URL
            style={styles.logo}
        />
      <Text style={styles.header}>RESERVATION CONFIRMATION</Text>

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

      {/* Reservation Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reservation Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Booking Date:</Text>
          <Text>{booking.date}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Event Type:</Text>
          <Text>{booking.eventType}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Arrival Time:</Text>
          <Text>{booking.arrivalTime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Eating Time:</Text>
          <Text>{booking.eatingTime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Table Number:</Text>
          <Text>{booking.tableNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Number of Guests:</Text>
          <Text>{booking.guests}</Text>
        </View>
      </View>

      {/* Meals Ordered */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meals Ordered</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Meal Options:</Text>
          <Text>{booking.meal}</Text>
        </View>

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

        <View style={styles.balance}>
          <Text style={styles.label}>Balance Due:</Text>
          <Text>Tsh: {booking.paymentDetails.balance}</Text>
        </View>

      </View>

      {/* Remarks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Remarks</Text>
        { booking.remarks && booking?.remarks?.length > 0 ? (
                <Text>{booking.remarks}</Text>

            ):
            (
                <Text>No remarks provided</Text>
            )
        }
        
      </View>

      {/* Receptionist */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Receptionist</Text>
        <Text>{booking.receptionist ?? "No data provided."}</Text>
      </View>


      {/* Terms & Conditions */}
      <View style={styles.terms} break>
        <Text style={styles.sectionTitle}>Terms & Conditions</Text>

        {/* Check-in & Check-out */}
        <Text style={styles.termsSubtitle}>1. Booking Terms & Conditions:</Text>
        <Text style={styles.termsText}>
            • Our normal check in time is 1400hrs. Early check in can be granted on advance request depending on availability.
        </Text>
        <Text style={styles.termsText}>
            • Please present your valid ID during registration (National ID, Passport or Driving License).
        </Text>
        <Text style={styles.termsText}>
            • Check Out time is 1000hrs.
        </Text>

        <Text style={styles.termsText}>
            • Full payment is required on arrival before access to the room is granted.
        </Text>
        <Text style={styles.termsText}>
            • For access to the swimming pool please request a hand wrist band at the counter.
        </Text>
        <Text style={styles.termsText}>
            • Breakfast is served from 0800hrs - 1000hrs at the gazebo by the pool.
        </Text>

        {/* BAR & KITCHEN BILLS: */}
        <Text style={styles.termsSubtitle}>2. Bar & Kitchen Bills:</Text>
        <Text style={styles.termsText}>
            • Kindly note: All bar and kitchen bills are settled on same day the service is provided. We do not accumulate bills for the room guests..
        </Text>

        {/* ROOM SERVICE */}
        <Text style={styles.termsSubtitle}>3. Room Service:</Text>
        <Text style={styles.termsText}>
            • All meals and drinks will be served at our garden located at the lodge. Room service is available at an extra charge.
        </Text>

        {/* ROOM COMMUNICATION */}
        <Text style={styles.termsSubtitle}>4. Room Communication:</Text>
        <Text style={styles.termsText}>
            • For communication while you are in the room kindly use +255 769 456 782 to contact RECEPTION.
        </Text>

        {/* AMENITIES */}
        <Text style={styles.termsSubtitle}>5. Amenities:</Text>
        <Text style={styles.termsText}>
            • While we provide other amenities in the room like bath soaps, shower gel, shampoo, lotions, toilet paper, tissues and a bottle of water, WE DO NOT PROVIDE Toothbrush and toothpastes so kindly remember to pack your own.
        </Text>

        {/* Care of Property & Linen Policy */}
        <Text style={styles.termsSubtitle}>6. *Care of Property & Linen Policy*:</Text>
        <Text style={styles.termsText}>
            • Our rooms and linen are maintained to a high standard for the comfort of all guests. Guests are kindly requested to treat the room, furnishings, and linen with care. In the event of damage, misuse, or excessive soiling (abnormal dirting) of linen, towels, furnishings, or room property beyond normal wear and tear, the lodge reserves the right to charge the guest for professional cleaning, repair, or replacement costs.
        </Text>

        {/* CANCELLATION POLICY */}
        <Text style={styles.termsSubtitle}>7. Cancellation Policy:</Text>
        <Text style={styles.termsText}>
            • Booking once paid up cannot be refunded. However, the booking can be postponed to a later date if a cancellation notice is received 5-days prior to arrival date. Notice received less than 5 days can neither be refunded nor be granted a later date.
        </Text>

        {/* Agreement */}
        <Text style={{ fontSize: 10, marginTop: 8 }}>
            By confirming this booking, you agree to the above terms and conditions.
        </Text>
      </View>



      <Text style={styles.footer}>
        Thank you for choosing us. We look forward to hosting you!
      </Text>
    </Page>
  </Document>
);

export default RestaurantBookingPDF;