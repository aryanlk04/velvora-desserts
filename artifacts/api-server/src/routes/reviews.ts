import { Router, type IRouter } from "express";
import { eq, desc, sql } from "drizzle-orm";
import { db, reviewsTable } from "@workspace/db";

const router: IRouter = Router();

function isAdminAuthorized(req: Parameters<Parameters<typeof router.use>[0]>[0]): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const provided = req.headers["x-admin-password"];
  return !!adminPassword && provided === adminPassword;
}

// GET /reviews — all approved reviews, featured first then newest first
router.get("/reviews", async (_req, res): Promise<void> => {
  const reviews = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.status, "approved"))
    .orderBy(desc(reviewsTable.featured), desc(reviewsTable.createdAt));
  res.json(reviews);
});

// POST /reviews — submit and instantly publish
router.post("/reviews", async (req, res): Promise<void> => {
  const { name, rating, reviewText, photoPath } = req.body as {
    name?: unknown;
    rating?: unknown;
    reviewText?: unknown;
    photoPath?: unknown;
  };

  if (typeof name !== "string" || name.trim().length === 0 || name.trim().length > 100) {
    res.status(400).json({ error: "Name must be between 1 and 100 characters" });
    return;
  }
  if (typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    res.status(400).json({ error: "Rating must be an integer between 1 and 5" });
    return;
  }
  if (typeof reviewText !== "string" || reviewText.trim().length < 10 || reviewText.trim().length > 2000) {
    res.status(400).json({ error: "Review must be between 10 and 2000 characters" });
    return;
  }

  const [review] = await db
    .insert(reviewsTable)
    .values({
      name: name.trim(),
      rating,
      reviewText: reviewText.trim(),
      photoPath: typeof photoPath === "string" ? photoPath : null,
      status: "approved",
      featured: false,
    })
    .returning();

  req.log.info({ reviewId: review.id }, "New review submitted and published");
  res.status(201).json(review);
});

// GET /admin/reviews — all reviews for admin (admin only)
router.get("/admin/reviews", async (req, res): Promise<void> => {
  if (!isAdminAuthorized(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const reviews = await db
    .select()
    .from(reviewsTable)
    .orderBy(desc(reviewsTable.featured), desc(reviewsTable.createdAt));
  res.json(reviews);
});

// PATCH /admin/reviews/:id — toggle featured
router.patch("/admin/reviews/:id", async (req, res): Promise<void> => {
  if (!isAdminAuthorized(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid review ID" });
    return;
  }

  const { featured } = req.body as { featured?: unknown };
  if (typeof featured !== "boolean") {
    res.status(400).json({ error: "featured must be a boolean" });
    return;
  }

  const [updated] = await db
    .update(reviewsTable)
    .set({ featured })
    .where(eq(reviewsTable.id, id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  req.log.info({ reviewId: id, featured }, "Review featured status updated");
  res.json(updated);
});

// DELETE /admin/reviews/:id — remove a review
router.delete("/admin/reviews/:id", async (req, res): Promise<void> => {
  if (!isAdminAuthorized(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid review ID" });
    return;
  }

  const [deleted] = await db
    .delete(reviewsTable)
    .where(eq(reviewsTable.id, id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Review not found" });
    return;
  }

  req.log.info({ reviewId: id }, "Review deleted by admin");
  res.sendStatus(204);
});

export default router;
