import { Button, List, ListItem } from "@chakra-ui/react"
import { useShoppingCart } from "../context/shoppingCartContext"
import { useCategories } from "../hooks/useCategories"


const CategoriesView = () => {
    const { onSelectCategory, query } = useShoppingCart()
    const { data: categories } = useCategories()
    console.log('Categories', categories);

    const allCategories = categories && categories.map((category, index) => {
        return (
            <List key={index}
            >
                <ListItem>
                    <Button
                        key={index}
                        variant="link"
                        onClick={() => {
                            onSelectCategory(category)
                            console.log('Category', category);
                        }}
                        fontWeight={query.category?.slug === category.slug ? 'bold' : 'normal'}
                    >
                        {category.name}
                    </Button>
                </ListItem>
            </List>
        )
    })

    return (
        <>
            {allCategories}
        </>
    )
}

export default CategoriesView