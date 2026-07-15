import { Model } from "mongoose";

/**
 * Swaps the `order` field between a document and its adjacent neighbor
 * (sorted by order ascending), moving it up or down one position.
 * Used by every "admin can add/update/delete/reorder" collection
 * (Stats, Timeline, Plan Categories, Bullets, Plans, Banners, Cards,
 * Testimonials, Clients, Services, etc).
 */
export async function reorderDocument(
  model: Model<any>,
  itemId: string,
  direction: "up" | "down"
): Promise<void> {
  const items = await model.find().sort({ order: 1, createdAt: 1 });
  const index = items.findIndex((i) => i._id.toString() === itemId);

  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= items.length) return;

  const current = items[index];
  const neighbor = items[swapIndex];

  const currentOrder = current.order ?? index;
  const neighborOrder = neighbor.order ?? swapIndex;

  current.order = neighborOrder;
  neighbor.order = currentOrder;

  await Promise.all([current.save(), neighbor.save()]);
}

/**
 * Returns the next order value to assign a newly created item so it
 * appends to the end of the list.
 */
export async function getNextOrder(model: Model<any>): Promise<number> {
  const last = await model.findOne().sort({ order: -1 });
  return last ? (last.order ?? 0) + 1 : 0;
}