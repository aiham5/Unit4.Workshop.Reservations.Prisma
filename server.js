const express = require("express");
const cors = require("cors");
const prisma = require("./prisma");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/customers", async (req, res, next) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (err) {
    next(err);
  }
});

app.get("/api/restaurants", async (req, res, next) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
});

app.get("/api/reservations", async (req, res, next) => {
  try {
    const reservations = await prisma.reservation.findMany();
    res.json(reservations);
  } catch (err) {
    next(err);
  }
});

app.post("/api/customers/:id/reservations", async (req, res, next) => {
  const customerId = parseInt(req.params.id);
  const { restaurantId, date, partyCount } = req.body;

  try {
    const reservation = await prisma.reservation.create({
      data: {
        name: `Reservation for customer ${customerId}`,
        customerId: customerId,
        restaurants: {
          create: {
            customerId: customerId,
            reservationId: restaurantId,
            reserveationAt: new Date(date),
          },
        },
      },
    });

    res.status(201).json(reservation);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
