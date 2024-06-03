/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useLoginMutation } from "../../redux/features/Auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/Auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

type Inputs = {
    email: string
    password: string
}

const LoginPage: React.FC = () => {
    const [isTrue, setIsTrue] = useState(false)
    const [login] = useLoginMutation(undefined)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            password: "slkja;lskf",
            email: "safiislam045@gmail.com"
        }
    })
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        const userInfo = {
            email: data.email,
            password: data.password,
        }
        const { token } = await login(userInfo).unwrap()
        const user = verifyToken(token)
        console.log(user);
        dispatch(setUser({ user, token }))
        navigate('/dashbord')
    }

    return (
        <div className="bg-yellow-400 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
            <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
                <div className="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
                        <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                    </svg>
                </div>
                <form className="p-12 md:p-24" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center text-lg mb-6 md:mb-8">
                        <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                            <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                        </svg>
                        <input type="text" id="username" {...register("email")} className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Username" />
                    </div>
                    <div className="flex items-center relative text-lg mb-6 md:mb-8">
                        <svg className="absolute ml-3 -mt-2" viewBox="0 0 24 24" width="24">
                            <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                        </svg>
                        {/* <div className="w-fit"> */}
                        <input type={isTrue ? "password" : 'text'} {...register("password")} id="password" className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" />
                        <div className="absolute right-5 inline-block" onClick={() => setIsTrue(!isTrue)}>
                            {
                                !isTrue ?
                                    <svg data-slot="icon" className="size-6" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"></path>
                                    </svg>
                                    :
                                    <svg data-slot="icon" fill="none" className="size-6" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                                    </svg>
                            }
                        </div>
                        {/* </div> */}
                    </div>
                    <button className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded">Login</button>
                    <div className="text-center  pt-10">
                        <Link className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                            to="/register">
                            Create an account? Registration!
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default LoginPage;