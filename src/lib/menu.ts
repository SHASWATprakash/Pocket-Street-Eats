// src/lib/menu.ts

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const menu: MenuItem[] = [
  {
    id: "burger-1",
    name: "Classic Cheeseburger",
    price: 9.99,
    description:
      "A juicy beef patty topped with melted cheese, lettuce, and tomato.",
  },
  {
    id: "pizza-1",
    name: "Margherita Pizza",
    price: 12.99,
    description:
      "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil.",
  },
  {
    id: "salad-1",
    name: "Caesar Salad",
    price: 7.99,
    description:
      "Fresh romaine lettuce, parmesan cheese, croutons, and Caesar dressing.",
  },
  {
    id: "pasta-1",
    name: "Spaghetti Bolognese",
    price: 11.99,
    description: "Spaghetti pasta with a rich and savory meat sauce.",
  },
  {
    id: "fries-1",
    name: "Crispy French Fries",
    price: 4.99,
    description: "Golden and crispy french fries, perfect as a side or snack.",
  },
];
