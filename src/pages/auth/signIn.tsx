import type { NextPage } from "next";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ILogin, loginSchema } from "@/common/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "flowbite-react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignIn: NextPage = () => {
  const { register, handleSubmit } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(async (data: ILogin) => {
    await signIn("credentials", { ...data, callbackUrl: "/event" });
  }, []);

  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div>
      <main>
        <form
          className="flex h-screen w-full items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-96 rounded-2xl shadow-xl">
            <div className="card-body space-y-3 p-5">
              <h2 className="card-title">Welcome back!</h2>
              <TextInput
                type="email"
                placeholder="Type your email..."
                className="w-full"
                {...register("email")}
              />

              <div className="flex w-full items-center justify-center space-x-1">
                <TextInput
                  className="w-full"
                  type={passwordType}
                  placeholder="Type your password..."
                  {...register("password")}
                />
                <div className="input-group-btn">
                  <Button
                    gradientMonochrome="purple"
                    className="h-full"
                    onClick={togglePassword}
                  >
                    {passwordType === "password" ? (
                      <AiFillEyeInvisible size={18} />
                    ) : (
                      <AiFillEye size={18} />
                    )}
                  </Button>
                </div>
              </div>
              <div className="card-actions items-center justify-between">
                <Button
                  gradientMonochrome="purple"
                  className="btn btn-secondary w-full"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignIn;
