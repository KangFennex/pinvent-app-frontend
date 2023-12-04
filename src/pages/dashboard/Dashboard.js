import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getProducts } from "../../redux/features/product/productSlice";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";

const Dashboard = () => {
    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { products, isLoading, isError, message } = useSelector((state) => state.product);

    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getProducts())
        }

        if (isError) {

        }
    }, [isLoggedIn, isError, message, dispatch, products])

    return (
        <div>
            <ProductSummary products={products} />
            <ProductList products={products} isLoading={isLoading} />
        </div>
    )
}

export default Dashboard
