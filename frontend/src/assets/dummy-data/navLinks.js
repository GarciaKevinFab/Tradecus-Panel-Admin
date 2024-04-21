// navLinks.js
import {
    RiApps2Line,
    RiTaxiLine,
    RiShoppingBagLine,
    RiSettings2Line,
    RiBook2Line,
    RiMessage2Line,
    RiUserLine,
  } from 'react-icons/ri';
  
  const navLinks = [
    {
      path: "/dashboard",
      icon: RiApps2Line,
      display: "Dashboard",
    },
    {
      path: "/manage_tours",
      icon: RiTaxiLine,
      display: "Tours",
    },
    {
      path: "/manage_reviews",
      icon: RiShoppingBagLine,
      display: "Reseñas",
    },
    {
      path: "/manage_bookings",
      icon: RiBook2Line,
      display: "Reservas",
    },
    {
      path: "/manage_subscribes",
      icon: RiShoppingBagLine,
      display: "Subscripciones",
    },
    {
      path: "/manage_contacts",
      icon: RiMessage2Line,
      display: "Mensaje Contacto",
    },
    {
      path: "/manage_users",
      icon: RiUserLine,
      display: "Usuarios",
    },
    {
      path: "/settings",
      icon: RiSettings2Line,
      display: "Settings",
    },
  ];
  
  export default navLinks;
  