import { useParams } from "react-router-dom";
import useFetchAndValidateDetails from "./useFetchAndValidateDetails";




const useDetails = () => {
    const params = useParams()
    return useFetchAndValidateDetails(`/products/${params.detailsId}`)
}

export default useDetails