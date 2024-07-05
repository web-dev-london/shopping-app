// import axios from 'axios';
import { z } from 'zod';

const productSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    thumbnail: z.string(),
    category: z.string(),
});
export type Product = z.infer<typeof productSchema>

const ItemsSchema = z.array(productSchema);
export type ItemsProduct = z.infer<typeof ItemsSchema>


export const dataSchema = z.object({
    products: ItemsSchema
})

export type ResultProduct = z.infer<typeof dataSchema>


export const validateResult = (data: unknown) => {
    const validatedData = dataSchema.parse(data);
    return validatedData;
}

const categorySchema = z.object({
    slug: z.string(),
    name: z.string(),
})

export type Category = z.infer<typeof categorySchema>

const categoriesSchema = z.array(categorySchema)

export type Categories = z.infer<typeof categoriesSchema>


export const validateCategories = (data: unknown) => {
    const validatedData = categoriesSchema.parse(data);
    return validatedData;
}


export const validateDetails = (data: unknown) => {
    const validatedData = productSchema.parse(data);
    return validatedData;
}



/* 
export const fetchAndValidateData = async (url: string) => {
    try {
        const response = await axios.get(url);
        const validatedData = dataSchema.parse(response.data);
        return validatedData;
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`);
        } else if (axios.isAxiosError(error)) {
            throw new Error(`Error fetching data: ${error.message}`);
        } else if (error instanceof Error) {
            throw new Error(`Unexpected error: ${(error).message}`);
        }
    }
} */
