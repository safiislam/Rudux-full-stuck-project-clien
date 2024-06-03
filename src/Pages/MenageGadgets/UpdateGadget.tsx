/* eslint-disable @typescript-eslint/no-unused-vars */

import { useParams } from "react-router-dom";
import { useGetSingleGadgetsQuery, useUpdateGadgetsMutation } from "../../redux/features/Gadgets/gadgetsApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
    price: string;
    quantity: string;
};

type ParsedInputs = {
    price: number;
    quantity: number;
};

const UpdateGadget = () => {
    const { id } = useParams()
    const { data, isLoading, refetch } = useGetSingleGadgetsQuery(id)
    const [updateGadget] = useUpdateGadgetsMutation(undefined)
    console.log(data);
    // const { price, quantity } = data?.data
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const parsedData: ParsedInputs = {
            price: parseFloat(data.price),
            quantity: parseInt(data.quantity),
        };

        if (isNaN(parsedData?.price) || parsedData.price < 0) {
            setError("price", { type: "manual", message: "Price must be a positive number" });
            return;
        }

        if (isNaN(parsedData?.quantity) || parsedData.quantity < 1) {
            setError("quantity", { type: "manual", message: "Quantity must be at least 1" });
            return;
        }

        toast.loading('Loading...', { toastId: '1' });

        const res = await updateGadget({ id, payload: parsedData });
        if (res?.data?._id) {
            toast.update('1', {
                render: 'Updated successfully',
                type: 'success',
                isLoading: false,
                autoClose: 1000,
            });
            // refetch();
        }

    }
    if (isLoading) {
        return <span>Loading...</span>
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:w-[50%] mx-auto bg-white dark:bg-gray-800 shadow-md rounded-md">
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Price</label>
                    <input
                        id="price"
                        type="number"
                        defaultValue={data?.data?.price}
                        {...register('price')}
                        className={`mt-1 block w-full p-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200`}
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Quantity</label>
                    <input
                        id="quantity"
                        type="number"
                        defaultValue={data?.data?.quantity}
                        {...register('quantity')}
                        className={`mt-1 block w-full p-2 border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200`}
                    />
                    {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">Submit</button>
            </form>
        </div>
    );
};

export default UpdateGadget;


