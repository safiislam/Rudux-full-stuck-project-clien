import { SubmitHandler, useForm } from 'react-hook-form';
import { useAddGadgetsMutation } from '../../redux/features/Gadgets/gadgetsApi';

// interface Dimensions {
//     length?: number;
//     width?: number;
//     height?: number;
// }

// interface Features {
//     cameraResolution?: 'Up to 12MP' | '12MP - 24MP' | '24MP - 48MP' | '48MP+';
//     storageCapacity?: 'Up to 128GB' | '128GB - 256GB' | '256GB - 512GB' | '512GB+';
//     screenSize?: 'Up to 5 inches' | '5 - 6 inches' | '6 - 7 inches' | '7 inches+';
// }

// interface AdditionalAttributes {
//     weight?: number;
//     dimensions?: Dimensions;
//     compatibility?: string[];
// }

// interface ProductFormInputs {
//     name: string;
//     quantity: number;
//     price: number;
//     releaseDate: string; // Use string to handle date input correctly
//     brand: string;
//     modelNumber: string;
//     category: 'Smartphones' | 'Laptops' | 'Cameras' | 'Tablets' | 'Wearables' | 'Others';
//     operatingSystem?: 'iOS' | 'Android' | 'Windows' | 'MacOS' | 'Linux' | 'Others';
//     connectivity?: ('Bluetooth' | 'Wi-Fi' | 'USB-C' | 'NFC' | '5G' | 'Others')[];
//     powerSource?: 'Battery-Powered' | 'Plug-in' | 'Solar' | 'Others';
//     features?: Features;
//     additionalAttributes?: AdditionalAttributes;
// }

const AddGadgets = () => {
    const [postDoc, result] = useAddGadgetsMutation(undefined)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        data.quantity = parseInt(data.quantity)
        data.price = parseFloat(data.price)
        data.additionalAttributes.weight = parseFloat(data.additionalAttributes.weight)
        data.additionalAttributes.dimensions.height = parseFloat(data.additionalAttributes.dimensions.height)
        data.additionalAttributes.dimensions.length = parseFloat(data.additionalAttributes.dimensions.length)
        data.additionalAttributes.dimensions.width = parseFloat(data.additionalAttributes.dimensions.width)
        const res = await postDoc(data)
        console.log(res);
        console.log(data);
    }
    return (

        <div className=" bg-gray-100 rounded-md  dark:bg-gray-900 text-black dark:text-white flex justify-center items-center">

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Product Form</h2>

                <div>
                    <label className="block mb-2" htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', { required: true })}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="text-red-500">Name is required</p>}
                </div>

                <div>
                    <label className="block mb-2" htmlFor="quantity">Quantity</label>
                    <input
                        id="quantity"
                        type="number"
                        {...register('quantity', { required: true })}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.quantity && <p className="text-red-500">Quantity is required</p>}
                </div>

                <div>
                    <label className="block mb-2" htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register('price', { required: true })}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.price && <p className="text-red-500">Price is required</p>}
                </div>

                <div>
                    <label className="block mb-2" htmlFor="releaseDate">Release Date</label>
                    <input
                        id="releaseDate"
                        type="date"
                        {...register('releaseDate', { required: true })}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.releaseDate && <p className="text-red-500">Release Date is required</p>}
                </div>

                <div>
                    <label className="block mb-2" htmlFor="brand">Brand</label>
                    <input
                        id="brand"
                        type="text"
                        {...register('brand', { required: true })}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.brand && <p className="text-red-500">Brand is required</p>}
                </div>

                <div>
                    <label className="block mb-2" htmlFor="modelNumber">Model Number</label>
                    <input
                        id="modelNumber"
                        type="text"
                        {...register('modelNumber', { required: true })}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.modelNumber && <p className="text-red-500">Model Number is required</p>}
                </div>

                <div>
                    <label className="block mb-2" htmlFor="category">Category</label>
                    <select
                        id="category"
                        {...register('category', { required: true })}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Category</option>
                        <option value="Smartphones">Smartphones</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Cameras">Cameras</option>
                        <option value="Tablets">Tablets</option>
                        <option value="Wearables">Wearables</option>
                        <option value="Others">Others</option>
                    </select>
                    {errors.category && <p className="text-red-500">Category is required</p>}
                </div>

                <div>
                    <label className="block mb-2" htmlFor="operatingSystem">Operating System</label>
                    <select
                        id="operatingSystem"
                        {...register('operatingSystem')}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select OS</option>
                        <option value="iOS">iOS</option>
                        <option value="Android">Android</option>
                        <option value="Windows">Windows</option>
                        <option value="MacOS">MacOS</option>
                        <option value="Linux">Linux</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2" htmlFor="connectivity">Connectivity</label>
                    <select
                        id="connectivity"
                        multiple
                        {...register('connectivity')}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Bluetooth">Bluetooth</option>
                        <option value="Wi-Fi">Wi-Fi</option>
                        <option value="USB-C">USB-C</option>
                        <option value="NFC">NFC</option>
                        <option value="5G">5G</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2" htmlFor="powerSource">Power Source</label>
                    <select
                        id="powerSource"
                        {...register('powerSource')}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Power Source</option>
                        <option value="Battery-Powered">Battery-Powered</option>
                        <option value="Plug-in">Plug-in</option>
                        <option value="Solar">Solar</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2" htmlFor="features.cameraResolution">Camera Resolution</label>
                    <select
                        id="features.cameraResolution"
                        {...register('features.cameraResolution')}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Camera Resolution</option>
                        <option value="Up to 12MP">Up to 12MP</option>
                        <option value="12MP - 24MP">12MP - 24MP</option>
                        <option value="24MP - 48MP">24MP - 48MP</option>
                        <option value="48MP+">48MP+</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2" htmlFor="features.storageCapacity">Storage Capacity</label>
                    <select
                        id="features.storageCapacity"
                        {...register('features.storageCapacity')}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Storage Capacity</option>
                        <option value="Up to 128GB">Up to 128GB</option>
                        <option value="128GB - 256GB">128GB - 256GB</option>
                        <option value="256GB - 512GB">256GB - 512GB</option>
                        <option value="512GB+">512GB+</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2" htmlFor="features.screenSize">Screen Size</label>
                    <select
                        id="features.screenSize"
                        {...register('features.screenSize')}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Screen Size</option>
                        <option value="Up to 5 inches">Up to 5 inches</option>
                        <option value="5 - 6 inches">5 - 6 inches</option>
                        <option value="6 - 7 inches">6 - 7 inches</option>
                        <option value="7 inches+">7 inches+</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2" htmlFor="additionalAttributes.weight">Weight (grams)</label>
                    <input
                        id="additionalAttributes.weight"
                        type="number"
                        {...register('additionalAttributes.weight')}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-2">Dimensions (mm)</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            placeholder="Length"
                            {...register('additionalAttributes.dimensions.length')}
                            className="w-1/3 p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            placeholder="Width"
                            {...register('additionalAttributes.dimensions.width')}
                            className="w-1/3 p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            placeholder="Height"
                            {...register('additionalAttributes.dimensions.height')}
                            className="w-1/3 p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2" htmlFor="additionalAttributes.compatibility">Compatibility</label>
                    <input
                        id="additionalAttributes.compatibility"
                        type="text"
                        {...register('additionalAttributes.compatibility')}
                        className="w-full p-2 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-2 mt-4 bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>

    );
};

export default AddGadgets;