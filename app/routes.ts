import ToursPage from "./components/ToursPage";
import Home from "./components/Home";
import HomePage from "./components/HomePage";
import TourDetails from "./components/TourDetails";
import Admin from "./components/admin/Admin";
import RoomBooking from "./components/admin/roombooking/RoomBooking";
import RestaurantBooking from "./components/admin/restaurantbooking/RestaurantBooking";

const routes = [
  {
    path: "/",
    Component: Home,
    children: [
      {
        path:"",
        Component: HomePage
      }
      ,
      {
        path:"admin",
        Component: Admin
      },
      {
        path:"booking",
        Component: ToursPage,
        children:[
          {
            path:"room",
            Component: RoomBooking,
          },
          {
            path:"restaurant",
            Component: RestaurantBooking
          }
        ]
      }
    ]
  }
 
];

export default routes;
