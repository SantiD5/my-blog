
import { z } from 'zod';
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export const zodblogSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }).trim().min(1, {
    message: 'Title cannot be empty',
  }),
  
  slug: z.string({
    required_error: 'Slug is required',
  }).regex(slugRegex, {
    message: 'Slug must be lowercase, hyphenated words, and can only contain letters, numbers, and hyphens.',
  }).trim().min(1, {
    message: 'Slug cannot be empty',
  }),
  
  description: z.string({
    required_error: 'Description is required',
  }).min(1, {
    message: 'Description cannot be empty',
  }),
  
  author: z.string({
    required_error: 'Author is required',
  }).min(1, {
    message: 'Author cannot be empty',
  }),
  
  tags: z.array(z.string().min(1, {
    message: 'Tags cannot be empty',
  })).optional(), // Tags are optional, but if provided, must be non-empty strings
  
  date: z.date().optional(), // Date is optional
  updatedAt: z.date().optional(), // Updated date is optional
  status: z.enum(['draft', 'published'], {
    required_error: 'Status is required',
  }).default('draft'), // Default is 'draft'
  
  user: z.string({
    required_error: 'User ID is required',
  }).min(1, {
    message: 'User ID cannot be empty',
  }),
});


