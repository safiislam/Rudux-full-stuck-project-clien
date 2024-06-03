/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDeleteSingleGadgetsMutation, useGetGadgetsQuery } from "../../redux/features/Gadgets/gadgetsApi";
import { Link } from "react-router-dom";


const MenageGadgets = () => {
    // const [state, setState] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [query, setQuery] = useState({
        // minPrice: '',
        // maxPrice: '',
        // startDate: '',
        // endDate: '',
        // category: '',
        // operatingSystem: '',
        // powerSource: '',
        // connectivity: [],
        // modelNumber: '',
        // features: {
        //     cameraResolution: '',
        //     storageCapacity: '',
        //     screenSize: ''
        // },
        // additionalAttributes: {
        //     weight: '',
        //     dimensions: {
        //         length: '',
        //         width: '',
        //         height: ''
        //     },
        //     compatibility: []
        // }
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuery({ ...query, [name]: value });
    };

    const handleFeatureChange = (e) => {
        const { name, value } = e.target;
        setQuery({ ...query, features: { ...query?.features, [name]: value } });
    };

    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        setQuery({ ...query, additionalAttributes: { ...query?.additionalAttributes, dimensions: { ...query?.additionalAttributes.dimensions, [name]: value } } });
    };
    const [deleteData] = useDeleteSingleGadgetsMutation()
    const { data, refetch } = useGetGadgetsQuery(query, { refetchOnMountOrArgChange: true })
    const handleDelete = async (id: string) => {
        setIsDeleteOpen(true)

        if (isConfirm) {
            const res = await deleteData(id)
            if (res) {
                refetch()
            }
            console.log(res)
            setIsConfirm(false)
        }

    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onFilter(query);
    // };

    console.log(query);
    return (
        <div className="max-w-7xl mx-auto transition-all duration-1000">
            <div >
                {/* <input onChange={(e) => setState({ ...state, modelNumber: e.target.value })} type="text" /> */}
                <button
                    className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Open regular modal
                </button>
                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl h-full">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none">
                                    {/*header*/}
                                    <span onClick={() => setShowModal(false)} className="text-gray-700 dark:text-white text-end me-4 pt-2">X</span>
                                    {/*body*/}
                                    <form className="p-6 space-y-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Min Price</label>
                                                <input
                                                    type="number"
                                                    name="minPrice"
                                                    // value={query.minPrice}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Max Price</label>
                                                <input
                                                    type="number"
                                                    name="maxPrice"
                                                    // value={query.maxPrice}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                                                <input
                                                    type="date"
                                                    name="startDate"
                                                    // value={query.startDate}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                                                <input
                                                    type="date"
                                                    name="endDate"
                                                    // value={query.endDate}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                                <select
                                                    name="category"
                                                    // value={query.category}
                                                    onChange={handleChange}
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
                                            </div>
                                            <div>
                                                <label htmlFor="operatingSystem" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Operating System</label>
                                                <select
                                                    name="operatingSystem"
                                                    // value={query.operatingSystem}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
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
                                                <label htmlFor="powerSource" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Power Source</label>
                                                <select
                                                    name="powerSource"
                                                    // value={query.powerSource}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                                >
                                                    <option value="">Select Power Source</option>
                                                    <option value="Battery-Powered">Battery-Powered</option>
                                                    <option value="Plug-in">Plug-in</option>
                                                    <option value="Solar">Solar</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="connectivity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Connectivity</label>
                                                <select
                                                    name="connectivity"
                                                    // value={query.connectivity}
                                                    onChange={(e) => setQuery({ ...query, connectivity: [...e.target.selectedOptions].map(option => option.value) })}
                                                    multiple
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
                                                <label htmlFor="modelNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Model Number</label>
                                                <input
                                                    type="text"
                                                    name="modelNumber"
                                                    // value={query.modelNumber}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="cameraResolution" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Camera Resolution</label>
                                                <select
                                                    name="cameraResolution"
                                                    // value={query?.features?.cameraResolution}
                                                    onChange={handleFeatureChange}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                                >
                                                    <option value="">Select Resolution</option>
                                                    <option value="Up to 12MP">Up to 12MP</option>
                                                    <option value="12MP - 24MP">12MP - 24MP</option>
                                                    <option value="24MP - 48MP">24MP - 48MP</option>
                                                    <option value="48MP+">48MP+</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="storageCapacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Storage Capacity</label>
                                                <select
                                                    name="storageCapacity"
                                                    // value={query.features.storageCapacity}
                                                    onChange={handleFeatureChange}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                                >
                                                    <option value="">Select Storage</option>
                                                    <option value="Up to 128GB">Up to 128GB</option>
                                                    <option value="128GB - 256GB">128GB - 256GB</option>
                                                    <option value="256GB - 512GB">256GB - 512GB</option>
                                                    <option value="512GB+">512GB+</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="screenSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Screen Size</label>
                                                <select
                                                    name="screenSize"
                                                    // value={query.features.screenSize}
                                                    onChange={handleFeatureChange}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                                >
                                                    <option value="">Select Size</option>
                                                    <option value="Up to 5 inches">Up to 5 inches</option>
                                                    <option value="5 - 6 inches">5 - 6 inches</option>
                                                    <option value="6 - 7 inches">6 - 7 inches</option>
                                                    <option value="7 inches+">7 inches+</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Weight</label>
                                                <input
                                                    type="number"
                                                    name="weight"
                                                    // value={query.additionalAttributes.weight}
                                                    onChange={(e) => setQuery({ ...query, additionalAttributes: { ...query?.additionalAttributes, weight: e.target.value } })}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="length" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Length</label>
                                                <input
                                                    type="number"
                                                    name="length"
                                                    // value={query.additionalAttributes.dimensions.length}
                                                    onChange={handleDimensionChange}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="width" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Width</label>
                                                <input
                                                    type="number"
                                                    name="width"
                                                    // value={query.additionalAttributes.dimensions.width}
                                                    onChange={handleDimensionChange}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Height</label>
                                                <input
                                                    type="number"
                                                    name="height"
                                                    // value={query.additionalAttributes.dimensions.height}
                                                    onChange={handleDimensionChange}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="compatibility" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Compatibility</label>
                                                <select
                                                    name="compatibility"
                                                    // value={query.additionalAttributes.compatibility}
                                                    onChange={(e) => setQuery({ ...query, additionalAttributes: { ...query?.additionalAttributes, compatibility: [...e.target.selectedOptions].map(option => option.value) } })}
                                                    multiple
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
                                        </div>
                                    </form >

                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}


            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            {['Name', 'Quantity', 'Price', 'Release Date', 'Brand', 'Model Number', 'Category', 'Operating System', 'Connectivity', 'Power Source', 'Features', 'Additional Attributes'].map(header => (
                                <th key={header} className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{header}</th>
                            ))}
                            <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {data?.data?.map((gadget: any, index: number) => (
                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="p-4 w-4">
                                    <div className="flex items-center">
                                        <input id={`checkbox-table-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor={`checkbox-table-${index}`} className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{gadget.name}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{gadget.quantity}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">${gadget.price.toFixed(2)}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{new Date(gadget.releaseDate).toLocaleDateString()}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{gadget.brand}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{gadget.modelNumber}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{gadget.category}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{gadget.operatingSystem}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{gadget.connectivity?.join(', ')}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{gadget.powerSource}</td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {gadget.features ? (
                                        <>
                                            <div>Camera: {gadget.features.cameraResolution}</div>
                                            <div>Storage: {gadget.features.storageCapacity}</div>
                                            <div>Screen: {gadget.features.screenSize}</div>
                                        </>
                                    ) : 'N/A'}
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {gadget.additionalAttributes ? (
                                        <>
                                            <div>Weight: {gadget.additionalAttributes.weight}g</div>
                                            <div>Dimensions: {gadget.additionalAttributes.dimensions?.length} x {gadget.additionalAttributes.dimensions?.width} x {gadget.additionalAttributes.dimensions?.height} mm</div>
                                            <div>Compatibility: {gadget.additionalAttributes.compatibility?.join(', ')}</div>
                                        </>
                                    ) : 'N/A'}
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                    <Link to={`/dashbord/admin/update-gadgets/${gadget._id}`} className="text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                    <span onClick={() => handleDelete(gadget._id)} className="ps-2 text-red-500 cursor-pointer">del</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="mt-5">This table component is part of a larger, open-source library of Tailwind CSS components. Learn
                more
                by going to the official <a className="text-blue-600 hover:underline"
                    href="#" target="_blank">Flowbite Documentation</a>.
            </p>
            {isDeleteOpen ? (
                <>
                    <div
                        className="justify-center items-center flex  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl h-full">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none">
                                {/*header*/}
                                <span onClick={() => setIsDeleteOpen(false)} className="text-gray-700 dark:text-white text-end me-4 pt-2">X</span>
                                {/*body*/}
                                <div className="w-96 h-[300px] text-center flex justify-center items-center flex-col">
                                    <svg className="size-36 text-red-600" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                                    </svg>
                                    <div className="flex w-full justify-around pt-9 text-gray-800 dark:text-white">
                                        <button onClick={() => {
                                            setIsConfirm(true)
                                            setIsDeleteOpen(false)
                                        }}>Confirm</button>
                                        <button onClick={() => setIsDeleteOpen(false)} >Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div >
    );
};

export default MenageGadgets;


function onFilter(query: { minPrice: string; maxPrice: string; startDate: string; endDate: string; category: string; operatingSystem: string; powerSource: string; connectivity: never[]; modelNumber: string; features: { cameraResolution: string; storageCapacity: string; screenSize: string; }; additionalAttributes: { weight: string; dimensions: { length: string; width: string; height: string; }; compatibility: never[]; }; }) {
    throw new Error("Function not implemented.");
}
// {
//     <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
//     <td className="p-4 w-4">
//         <div className="flex items-center">
//             <input id="checkbox-table-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-table-2" className="sr-only">checkbox</label>
//         </div>
//     </td>
//     <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple MacBook Pro 17"</td>
//     <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">Laptop</td>
//     <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$2999</td>
//     <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
//         <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//     </td>
// </tr>
// <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
//     <td className="p-4 w-4">
//         <div className="flex items-center">
//             <input id="checkbox-table-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-table-3" className="sr-only">checkbox</label>
//         </div>
//     </td>
//     <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">iPhone 13 Pro</td>
//     <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">Phone</td>
//     <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$999</td>
//     <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
//         <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//     </td>
// </tr>
// <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
//     <td className="p-4 w-4">
//         <div className="flex items-center">
//             <input id="checkbox-table-4" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-table-4" className="sr-only">checkbox</label>
//         </div>
//     </td>
//     <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple Magic Mouse 2</td>
//     <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">Accessories</td>
//     <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$99</td>
//     <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
//         <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//     </td>
// </tr>
// <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
//     <td className="p-4 w-4">
//         <div className="flex items-center">
//             <input id="checkbox-table-5" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-table-5" className="sr-only">checkbox</label>
//         </div>
//     </td>
//     <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple Watch Series 7</td>
//     <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">Accessories</td>
//     <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$599</td>
//     <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
//         <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//     </td>
// </tr>
// }

