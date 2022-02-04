import { FC, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "lib/mutations";
import Input from "components/Input";
import Button from "components/Button";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
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
          <Input
            name={"emailInput"}
            label={"Email address"}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            value={email}
            type="email"
            placeholder={"enter email"}
          />
          <Input
            name={"pwdInput"}
            label={"Password 123"}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            value={password}
            type="password"
            placeholder={"enter password"}
          />
          <Button label={mode} isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
