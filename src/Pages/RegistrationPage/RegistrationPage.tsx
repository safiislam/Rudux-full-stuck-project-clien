/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRegistationMutation } from "../../redux/features/Auth/authApi";
import { setUser } from "../../redux/features/Auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useDispatch } from "react-redux";

type Inputs = {
    name: string
    email: string,
    password: string
    c_password: string
}

const RegistrationPage = () => {
    const [registation] = useRegistationMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const password = watch("password", "");
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { c_password, ...remaindata } = data
        const userInfo = {
            ...remaindata
        }
        const { token } = await registation(userInfo).unwrap()
        const user = verifyToken(token)
        console.log(user);
        dispatch(setUser({ user, token }))
        navigate('/')

    }
    return (
        <div className="h-full bg-gray-400 dark:bg-gray-900">

            <div className="mx-auto">
                <div className="flex justify-center px-6 py-12">

                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">

                        <div className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                            style={{ backgroundImage: "url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')" }}></div>

                        <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Create an Account!</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        // id="name"
                                        type="text"
                                        placeholder="Name"
                                        {...register("name", { required: true })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        // id="email"
                                        type="email"
                                        placeholder="Email"
                                        {...register("email", { required: true })}
                                    />
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border ${errors.password?.message && "border-red-500"} rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                                            // id="password"
                                            type="password"
                                            placeholder="******************"
                                            {...register("password", {
                                                required: 'Password is required',
                                                pattern: {
                                                    value: /^[A-Za-z]+$/i,
                                                    message: 'Password must contain only uppercase and lowercase letters'
                                                }
                                            })}
                                        />
                                        {errors.password && <p className="text-xs italic text-red-500">{errors.password.message}</p>}
                                    </div>
                                    <div className="md:ml-2 w-[50%]">
                                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="c_password">
                                            Confirm Password
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            // id="c_password"
                                            type="password"
                                            placeholder="******************"
                                            {...register("c_password", {
                                                required: 'Confirm Password is required',
                                                validate: value => value === password || 'Passwords do not match'
                                            })}
                                        />
                                        {errors.c_password && <p className="text-xs  italic text-red-500">{errors.c_password.message}</p>}


                                    </div>
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Register Account
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <Link className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                                        to="/login">
                                        Already have an account? Login!
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;