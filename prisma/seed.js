const prisma = require("../prisma");

const seed = async () => {
  // TODO: Create Customers, Restaurants and Reservations
  const createCustomers = async () => {
    const Customers = [
      { name: "Name1" },
      { name: "Name2" },
      { name: "Name3" },
      { name: "Name4" },
      { name: "Name5" },
    ];
    await prisma.customer.createMany({ data: Customers });
  };

  const createReservations = async () => {
    const Reservations = [
      { name: "Res1", customerId: 1 },
      { name: "Res2", customerId: 2 },
      { name: "Res3", customerId: 3 },
      { name: "Res4", customerId: 4 },
      { name: "Res5", customerId: 5 },
    ];
    await prisma.reservation.createMany({ data: Reservations });
  };

  const createRestaurants = async () => {
    const Restaurants = [
      {
        reservationAt: new Date("2025-05-11"),
        customerId: 1,
        reservationId: 1,
      },
      {
        reservationAt: new Date("2025-05-12"),
        customerId: 2,
        reservationId: 2,
      },
      {
        reservationAt: new Date("2025-05-13"),
        customerId: 3,
        reservationId: 3,
      },
      {
        reservationAt: new Date("2025-05-14"),
        customerId: 4,
        reservationId: 4,
      },
      {
        reservationAt: new Date("2025-05-15"),
        customerId: 5,
        reservationId: 5,
      },
    ];
    await prisma.restaurant.createMany({ data: Restaurants });
  };

  await createCustomers();
  await createReservations();
  await createRestaurants();
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
