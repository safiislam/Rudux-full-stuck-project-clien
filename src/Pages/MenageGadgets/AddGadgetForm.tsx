import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useAddGadgetsMutation } from '../../redux/features/Gadgets/gadgetsApi';

interface Dimensions {
    length?: number;
    width?: number;
    height?: number;
}

interface Features {
    cameraResolution?: 'Up to 12MP' | '12MP - 24MP' | '24MP - 48MP' | '48MP+';
    storageCapacity?: 'Up to 128GB' | '128GB - 256GB' | '256GB - 512GB' | '512GB+';
    screenSize?: 'Up to 5 inches' | '5 - 6 inches' | '6 - 7 inches' | '7 inches+';
}

interface AdditionalAttributes {
    weight?: number;
    dimensions?: Dimensions;
    compatibility?: string[];
}

interface GadgetFormInputs {
    name: string;
    quantity: number;
    price: number;
    releaseDate: string;
    brand: string;
    modelNumber: string;
    category: 'Smartphones' | 'Laptops' | 'Cameras' | 'Tablets' | 'Wearables' | 'Others';
    operatingSystem?: 'iOS' | 'Android' | 'Windows' | 'MacOS' | 'Linux' | 'Others';
    connectivity?: ('Bluetooth' | 'Wi-Fi' | 'USB-C' | 'NFC' | '5G' | 'Others')[];
    powerSource?: 'Battery-Powered' | 'Plug-in' | 'Solar' | 'Others';
    features?: Features;
    additionalAttributes?: AdditionalAttributes;
}

const AddGadgetForm: React.FC = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<GadgetFormInputs>();
    const [addGadget, { isLoading, error }] = useAddGadgetsMutation();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "additionalAttributes.compatibility"
    });

    const onSubmit: SubmitHandler<GadgetFormInputs> = async (data) => {
        // Convert string inputs to numbers where necessary
        const parsedData = {
            ...data,
            quantity: parseInt(data.quantity as unknown as string, 10),
            price: parseFloat(data.price as unknown as string),
            features: {
                ...data.features,
            },
            additionalAttributes: {
                ...data.additionalAttributes,
                weight: data.additionalAttributes?.weight ? parseFloat(data.additionalAttributes.weight as unknown as string) : undefined,
                dimensions: {
                    length: data.additionalAttributes?.dimensions?.length ? parseFloat(data.additionalAttributes.dimensions.length as unknown as string) : undefined,
                    width: data.additionalAttributes?.dimensions?.width ? parseFloat(data.additionalAttributes.dimensions.width as unknown as string) : undefined,
                    height: data.additionalAttributes?.dimensions?.height ? parseFloat(data.additionalAttributes.dimensions.height as unknown as string) : undefined,
                }
            }
        };

        const res = await addGadget(parsedData);
        console.log(res);
    };

    return (
        <div className="max-w-xl mx-auto bg-gray-100 p-8 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
            <h2 className="text-2xl font-bold mb-6">Add New Gadget</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium">Quantity</label>
                    <input
                        id="quantity"
                        type="number"
                        {...register('quantity', { required: 'Quantity is required', valueAsNumber: true })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                    />
                    {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium">Price</label>
                    <input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register('price', { required: 'Price is required', valueAsNumber: true })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                <div>
                    <label htmlFor="releaseDate" className="block text-sm font-medium">Release Date</label>
                    <input
                        id="releaseDate"
                        type="date"
                        {...register('releaseDate', { required: 'Release Date is required' })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                    />
                    {errors.releaseDate && <p className="text-red-500 text-sm">{errors.releaseDate.message}</p>}
                </div>

                <div>
                    <label htmlFor="brand" className="block text-sm font-medium">Brand</label>
                    <input
                        id="brand"
                        type="text"
                        {...register('brand', { required: 'Brand is required' })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                    />
                    {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
                </div>

                <div>
                    <label htmlFor="modelNumber" className="block text-sm font-medium">Model Number</label>
                    <input
                        id="modelNumber"
                        type="text"
                        {...register('modelNumber', { required: 'Model Number is required' })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                    />
                    {errors.modelNumber && <p className="text-red-500 text-sm">{errors.modelNumber.message}</p>}
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium">Category</label>
                    <select
                        id="category"
                        {...register('category', { required: 'Category is required' })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                    >
                        <option value="">Select Category</option>
                        <option value="Smartphones">Smartphones</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Cameras">Cameras</option>
                        <option value="Tablets">Tablets</option>
                        <option value="Wearables">Wearables</option>
                        <option value="Others">Others</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                </div>

                <div>
                    <label htmlFor="operatingSystem" className="block text-sm font-medium">Operating System</label>
                    <select
                        id="operatingSystem"
                        {...register('operatingSystem')}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                    >
                        <option value="">Select Operating System</option>
                        <option value="iOS">iOS</option>
                        <option value="Android">Android</option>
                        <option value="Windows">Windows</option>
                        <option value="MacOS">MacOS</option>
                        <option value="Linux">Linux</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="connectivity" className="block text-sm font-medium">Connectivity</label>
                    <select
                        id="connectivity"
                        multiple
                        {...register('connectivity')}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
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
                    <label htmlFor="powerSource" className="block text-sm font-medium">Power Source</label>
                    <select
                        id="powerSource"
                        {...register('powerSource')}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                    >
                        <option value="">Select Power Source</option>
                        <option value="Battery-Powered">Battery-Powered</option>
                        <option value="Plug-in">Plug-in</option>
                        <option value="Solar">Solar</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <fieldset>
                    <legend className="block text-sm font-medium">Features</legend>
                    <div>
                        <label htmlFor="features.cameraResolution" className="block text-sm font-medium">Camera Resolution</label>
                        <select
                            id="features.cameraResolution"
                            {...register('features.cameraResolution')}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                        >
                            <option value="">Select Camera Resolution</option>
                            <option value="Up to 12MP">Up to 12MP</option>
                            <option value="12MP - 24MP">12MP - 24MP</option>
                            <option value="24MP - 48MP">24MP - 48MP</option>
                            <option value="48MP+">48MP+</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="features.storageCapacity" className="block text-sm font-medium">Storage Capacity</label>
                        <select
                            id="features.storageCapacity"
                            {...register('features.storageCapacity')}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                        >
                            <option value="">Select Storage Capacity</option>
                            <option value="Up to 128GB">Up to 128GB</option>
                            <option value="128GB - 256GB">128GB - 256GB</option>
                            <option value="256GB - 512GB">256GB - 512GB</option>
                            <option value="512GB+">512GB+</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="features.screenSize" className="block text-sm font-medium">Screen Size</label>
                        <select
                            id="features.screenSize"
                            {...register('features.screenSize')}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                        >
                            <option value="">Select Screen Size</option>
                            <option value="Up to 5 inches">Up to 5 inches</option>
                            <option value="5 - 6 inches">5 - 6 inches</option>
                            <option value="6 - 7 inches">6 - 7 inches</option>
                            <option value="7 inches+">7 inches+</option>
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <legend className="block text-sm font-medium">Additional Attributes</legend>
                    <div>
                        <label htmlFor="additionalAttributes.weight" className="block text-sm font-medium">Weight (grams)</label>
                        <input
                            id="additionalAttributes.weight"
                            type="number"
                            step="0.01"
                            {...register('additionalAttributes.weight', { valueAsNumber: true })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Dimensions (mm)</label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                placeholder="Length"
                                step="0.01"
                                {...register('additionalAttributes.dimensions.length', { valueAsNumber: true })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                            />
                            <input
                                type="number"
                                placeholder="Width"
                                step="0.01"
                                {...register('additionalAttributes.dimensions.width', { valueAsNumber: true })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                            />
                            <input
                                type="number"
                                placeholder="Height"
                                step="0.01"
                                {...register('additionalAttributes.dimensions.height', { valueAsNumber: true })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="additionalAttributes.compatibility" className="block text-sm font-medium">Compatibility</label>
                        {fields.map((item, index) => (
                            <div key={item.id} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    {...register(`additionalAttributes.compatibility.${index}` as const)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="p-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => append('')}
                            className="p-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Add Compatibility
                        </button>
                    </div>
                </fieldset>

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
                {isLoading && <p className="text-blue-500 text-center mt-4">Submitting...</p>}
                {error && <p className="text-red-500 text-center mt-4">Error submitting form</p>}
            </form>
        </div>
    );
};

export default AddGadgetForm;
