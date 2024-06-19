import axios from 'axios';
import { z } from 'zod';

const productSchema = z.object({
    total: z.number(),
    title: z.string(),
    quantity: z.number(),
    price: z.number(),
    thumbnail: z.string(),
    id: z.number(),
});
const ItemsSchema = z.array(productSchema);
export type ItemsCart = z.infer<typeof ItemsSchema>

export type Cart = z.infer<typeof productSchema>


export const dataSchema = z.object({
    carts: z.object({
        userId: z.number(),
        totalQuantity: z.number(),
        totalProducts: z.number(),
        total: z.number(),
        id: z.number(),
        discountedTotal: z.number(),
        products: z.object({
            total: z.number(),
            title: z.string(),
            thumbnail: z.string(),
            quantity: z.number(),
            price: z.number(),
            id: z.number(),
            discountedTotal: z.number(),
            discountPercentage: z.number(),
        }).array()
    }).array(),
    limit: z.number(),
    skip: z.number(),
    total: z.number(),
})


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
}
