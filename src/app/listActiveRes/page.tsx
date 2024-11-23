

// 'use client' // Directive to indicate client-side rendering

// import React from "react";
// import { RestaurantController } from "../restaurantController";

// export default function Home() {
//     const controller = new RestaurantController();

//     const [redraw, forceRedraw] = React.useState(0);
//     const [activeRestaurants, setActiveRestaurants] = React.useState<any[]>([]); // Adjust the type if necessary

//     // helper function that forces React app to redraw whenever this is called.
//     function andRefreshDisplay() {
//         forceRedraw(redraw + 1);
//     }

//     // Fetch the list of active restaurants when the component mounts
//     React.useEffect(() => {
//         const fetchActiveRestaurants = () => {
//             const activeRes = controller.listActiveRestaurants();
//             setActiveRestaurants(activeRes);
//         };
        
//         fetchActiveRestaurants();
//     }, [redraw]);  // Runs when redraw is triggered

//     return (
//         <div className="container">
//             <h1 className="title">Active Restaurants</h1>
//             {activeRestaurants.length > 0 ? (
//                 <ul className="restaurant-list">
//                     {activeRestaurants.map((restaurant, index) => (
//                         <li key={index} className="restaurant-item">
//                             <h3>{restaurant.name}</h3>
//                             <p>{restaurant.address}</p>
//                             <p>Open Time: {restaurant.openTime}</p>
//                             <p>Close Time: {restaurant.closeTime}</p>
//                             <p>Seats: {restaurant.tables.reduce((acc: number, table: any) => acc + table.seats, 0)} seats</p>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No active restaurants found.</p>
//             )}
//         </div>
//     );
// }
