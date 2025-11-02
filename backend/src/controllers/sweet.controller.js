import { prisma } from "../prismaClient.js";

export const addSweet = async (req, res) => {
  try {
    const sweet = await prisma.sweet.create({ data: req.body });
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllSweets = async (req, res) => {
  const sweets = await prisma.sweet.findMany();
  res.json(sweets);
};

export const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const sweets = await prisma.sweet.findMany({
      where: {
        AND: [
          name ? { name: { contains: name } } : {},
          category ? { category } : {},
          minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
          maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {},
        ],
      },
    });

    return res.json(sweets);
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};



export const updateSweet = async (req, res) => {
  const { id } = req.params;

  try {
    const sweet = await prisma.sweet.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(sweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteSweet = async (req, res) => {
  const { id } = req.params;

  await prisma.sweet.delete({ where: { id: parseInt(id) } });
  res.json({ message: "Sweet deleted" });
};

export const purchaseSweet = async (req, res) => {
  const { id } = req.params;

  const sweet = await prisma.sweet.findUnique({ where: { id: parseInt(id) }});
  if (!sweet || sweet.quantity <= 0) return res.status(400).json({ error: "Out of stock" });

  const updated = await prisma.sweet.update({
    where: { id: parseInt(id) },
    data: { quantity: sweet.quantity - 1 },
  });

  res.json(updated);
};

export const restockSweet = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  const sweet = await prisma.sweet.findUnique({ where: { id: parseInt(id) }});

  const updated = await prisma.sweet.update({
    where: { id: parseInt(id) },
    data: { quantity: sweet.quantity + amount },
  });

  res.json(updated);
};
