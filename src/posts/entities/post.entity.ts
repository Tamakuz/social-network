import type { Post as PrismaPost } from "@prisma/client";
export class Post {
  id: number;
  content: string;
  userId: number;
  parentId: number | null;
  createdAt: Date;
  updatedAt: Date;

}
