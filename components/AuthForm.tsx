import { FC, useState } from "react";
import { useRouter } from "next/router";
import NextImage from "next/image";
// import { useSWRConfig } from "swr";
import { auth } from "lib/mutations";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { email, password });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="w-300 p-6 rounded-lg shadow-lg bg-white max-w-sm m-12">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-6">
            <label
              htmlFor="exampleInputEmail2"
              className="form-label inline-block mb-2 text-gray-700">
              Email address
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mb-6">
            <label
              htmlFor="exampleInputPassword2"
              className="form-label inline-block mb-2 text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="form-control 
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputPassword2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input />
          <button
            type="submit"
            className="
            w-full
            px-6
            py-2.5
            bg-gray-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-gray-700 hover:shadow-lg
            focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-gray-800 active:shadow-lg
            transition
            duration-150
            ease-in-out">
            {mode}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
