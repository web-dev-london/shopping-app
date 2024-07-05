import useDetails from "../hooks/useDetails"
import CartView from "./CartView";

const DetailsView = () => {
    const { data: details } = useDetails()
    console.log('Details', details);

    if (details === null)
        return <></>

    return (
        <CartView product={details} />
    )
}

export default DetailsView