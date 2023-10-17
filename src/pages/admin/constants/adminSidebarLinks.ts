const adminSidebarLinks = [
  {
    text: "Dashboard",
    to: "/admin/dashboard",
  },
  {
    text: "Products",
    children: [
      {
        text: "All Products",
        to: "/admin/products",
      },
      {
        text: "Products Manager",
        to: "/admin/products/manager",
      },
      {
        text: "Add Product",
        to: "/admin/products/add",
      },
    ],
    icon: "boxes.svg",
  },
  {
    text: "Customers",
    children: [
      {
        text: "All Customers",
        to: "/admin/customers",
      },
      {
        text: "Customers Manager",
        to: "/admin/customers/manager",
      },
      {
        text: "Add Customer",
        to: "/admin/customers/add",
      },
    ],
  },
  {
    text: "Orders",
    children: [
      {
        text: "All Orders",
        to: "/admin/orders",
      },
      {
        text: "Orders Manager",
        to: "/admin/orders/manager",
      },
      {
        text: "Add Order",
        to: "/admin/orders/add",
      },
    ],
  },
  {
    text: "Reports",
    to: "/admin/reports",
  },
  {
    text: "Settings",
    to: "/admin/settings",
  },
];

export default adminSidebarLinks;
