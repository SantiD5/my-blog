
import { z } from 'zod';
export const zodblogSchema = z.object({
  content: z.string()
    .trim()
    .min(1, "Content is required"),
  
  title: z.string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title must be at most 255 characters long"),
  
  image: z.string()
    .default('https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png'),
  
  category: z.string()
    .trim()
    .default('uncategorized'),
  
  slug: z.string()
    .trim()
    .min(1, "Slug is required")
    .max(255, "Slug must be at most 255 characters long"),
});


