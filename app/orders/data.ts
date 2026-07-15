import type { ThumbKind } from "./ProductThumb";

export type OrderItem = {
  title: string;
  quantity: number;
  colors?: string;
  thumb: ThumbKind;
  price: string;
  transactionId: string;
};

export type Receipt = {
  itemTotal: string;
  couponDiscount?: string;
  subtotal: string;
  postage: string;
  salesTax?: string;
  orderTotal: string;
  paidOn: string;
};

export type Order = {
  id: string;
  buyer: string;
  username: string;
  orderNumber: string;
  total: string;
  coupon?: { code: string; off: string };
  dispatchLabel: string;
  dispatchOverdue?: boolean;
  orderedDate: string;
  orderedFull: string;
  deliveryMethod: string;
  deliveryPrice: string;
  deliverToName: string;
  deliverToCity: string;
  address: string[];
  phone?: string;
  gift?: boolean;
  itemCount: number;
  items: OrderItem[];
  receipt: Receipt;
};

export type OrderGroup = {
  key: "overdue" | "today" | "later";
  label: string;
  orders: Order[];
};

const macrameTitle =
  "Tie-Dye Macrame Wall Hanging Large Bohemian Yarn Tapestry Wall Décor";
const mapTitle =
  "USA Travel Map Tracker – Retirement Gift for Travelers – 50 States Map Bucket List - Wooden Puzzle Map – Travel Tracker – RV Adventures";
const mahjongTitle =
  "166 Piece American Mahjong Set, Pink Back Tiles, Melamine Game Set with Dice";

export const orderGroups: OrderGroup[] = [
  {
    key: "overdue",
    label: "Overdue",
    orders: [
      {
        id: "4112055162",
        buyer: "Jennifer Casey",
        username: "jenaelysea",
        orderNumber: "#4112055162",
        total: "USD 149.35",
        coupon: { code: "LIMITEDTIMES", off: "45% off" },
        dispatchLabel: "Dispatch by 2 days ago",
        dispatchOverdue: true,
        orderedDate: "Ordered 10 Jul, 2026",
        orderedFull: "Ordered 23:10, Fri, 10 Jul, 2026",
        deliveryMethod: "Standard Delivery",
        deliveryPrice: "USD 5.99",
        deliverToName: "Jennifer Casey/ Jen Engroff",
        deliverToCity: "Keller, TX",
        address: [
          "Jennifer Casey/ Jen Engroff",
          "1914 Fall Creek Trl",
          "Keller, TX 76248-6807",
          "United States",
        ],
        phone: "(714) 335-0976",
        itemCount: 2,
        items: [
          {
            title: macrameTitle,
            quantity: 1,
            colors: "Ivory Brown",
            thumb: "macrame-ivory",
            price: "USD 119.99",
            transactionId: "5141683639",
          },
          {
            title: macrameTitle,
            quantity: 1,
            colors: "Green1",
            thumb: "macrame-green",
            price: "USD 119.99",
            transactionId: "5135814798",
          },
        ],
        receipt: {
          itemTotal: "USD 239.98",
          couponDiscount: "-USD 108.00",
          subtotal: "USD 131.98",
          postage: "USD 5.99",
          salesTax: "USD 11.38",
          orderTotal: "USD 149.35",
          paidOn: "Paid via Etsy Payments on 10 Jul, 2026",
        },
      },
      {
        id: "4109146621",
        buyer: "Devin Mumford",
        username: "devinmumford",
        orderNumber: "#4109146621",
        total: "USD 48.65",
        coupon: { code: "45SAVE", off: "45% off" },
        dispatchLabel: "Dispatch by 1 days ago",
        dispatchOverdue: true,
        orderedDate: "Ordered 06 Jul, 2026",
        orderedFull: "Ordered 18:42, Mon, 06 Jul, 2026",
        deliveryMethod: "Standard Delivery",
        deliveryPrice: "USD 4.99",
        deliverToName: "Devin Mumford",
        deliverToCity: "Cleves, OH",
        address: [
          "Devin Mumford",
          "312 Miami Ridge Dr",
          "Cleves, OH 45002-1436",
          "United States",
        ],
        itemCount: 1,
        items: [
          {
            title: mapTitle,
            quantity: 1,
            thumb: "wooden-map",
            price: "USD 79.38",
            transactionId: "5138220417",
          },
        ],
        receipt: {
          itemTotal: "USD 79.38",
          couponDiscount: "-USD 35.72",
          subtotal: "USD 43.66",
          postage: "USD 4.99",
          orderTotal: "USD 48.65",
          paidOn: "Paid via Etsy Payments on 06 Jul, 2026",
        },
      },
    ],
  },
  {
    key: "today",
    label: "Dispatch today",
    orders: [
      {
        id: "4108378084",
        buyer: "Molly Poeppelman",
        username: "mollypoeppelman",
        orderNumber: "#4108378084",
        total: "USD 48.40",
        coupon: { code: "45SAVE", off: "45% off" },
        dispatchLabel: "Dispatch today",
        orderedDate: "Ordered 07 Jul, 2026",
        orderedFull: "Ordered 09:15, Tue, 07 Jul, 2026",
        deliveryMethod: "Standard Delivery",
        deliveryPrice: "USD 4.99",
        deliverToName: "Molly Poeppelman",
        deliverToCity: "Minster, OH",
        address: [
          "Molly Poeppelman",
          "48 E Fourth St",
          "Minster, OH 45865-1122",
          "United States",
        ],
        gift: true,
        itemCount: 1,
        items: [
          {
            title: mapTitle,
            quantity: 1,
            thumb: "wooden-map",
            price: "USD 78.93",
            transactionId: "5136904523",
          },
        ],
        receipt: {
          itemTotal: "USD 78.93",
          couponDiscount: "-USD 35.52",
          subtotal: "USD 43.41",
          postage: "USD 4.99",
          orderTotal: "USD 48.40",
          paidOn: "Paid via Etsy Payments on 07 Jul, 2026",
        },
      },
    ],
  },
  {
    key: "later",
    label: "Dispatch by 23 Jul, 2026",
    orders: [
      {
        id: "4115677150",
        buyer: "Lani",
        username: "laniowens",
        orderNumber: "#4115677150",
        total: "USD 90.08",
        dispatchLabel: "Dispatches by 24 Jul, 2026",
        orderedDate: "Ordered 14 Jul, 2026",
        orderedFull: "Ordered 14:03, Tue, 14 Jul, 2026",
        deliveryMethod: "Standard Delivery",
        deliveryPrice: "USD 4.99",
        deliverToName: "Lani Owens",
        deliverToCity: "Calhoun, KY",
        address: [
          "Lani Owens",
          "205 Cypress Creek Rd",
          "Calhoun, KY 42327-9705",
          "United States",
        ],
        gift: true,
        itemCount: 1,
        items: [
          {
            title: mahjongTitle,
            quantity: 1,
            thumb: "mahjong",
            price: "USD 79.99",
            transactionId: "5144092861",
          },
        ],
        receipt: {
          itemTotal: "USD 79.99",
          subtotal: "USD 79.99",
          postage: "USD 4.99",
          salesTax: "USD 5.10",
          orderTotal: "USD 90.08",
          paidOn: "Paid via Etsy Payments on 14 Jul, 2026",
        },
      },
    ],
  },
];

export const totalOrders = orderGroups.reduce(
  (sum, g) => sum + g.orders.length,
  0
);
