import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { registerService } from "../../services/authServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { clearMessages } from "../../features/auth/authSlice";
import { schemaSignup } from "../../features/auth/authSchema";
import { Loader2Icon } from "lucide-react";
const SignupComponent = () => {
  const dispatch = useDispatch();
  const { loading, error, success, message, user } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const {
    register,
    resetField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const handleRegister = (data) => {
    dispatch(registerService(data));
    resetField("username"), resetField("email"), resetField("password");
  };

  useEffect(() => {
    if (success === true) {
      navigate("/signin");
    }
    dispatch(clearMessages());
  }, [success, error]);

  return (
    <div className="w-full flex justify-center h-lvh items-center">
      <Card className="w-full max-w-sm bg-gradient-to-b from-gray-800 to-black text-white shadow-md shadow-gray-400">
        <CardHeader>
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription className="text-white">
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link to={"/signin"} variant="link" className="text-white">
              Sign in
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <input type="hidden" value={"ADMIN"} {...register("role")} />
                <Label htmlFor="email" className="text-[18px]">
                  Name
                </Label>
                <Input
                  className="text-white placeholder:text-white focus-visible:border-white shadow-white focus-visible:outline-white"
                  id="name"
                  type="text"
                  placeholder="enter your name"
                  defaultValue=""
                  {...register("username")}
                />
                <p className="text-red-600">{errors.username?.message}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[18px]">
                  Email
                </Label>
                <Input
                  className="text-white placeholder:text-white focus-visible:border-white shadow-white focus-visible:outline-white"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  defaultValue="test"
                  {...register("email")}
                />
                <p className="text-red-600">{errors.email?.message}</p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-[18px]">
                    Password
                  </Label>
                  <Link
                    to="/signin"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  className="text-white placeholder:text-white focus-visible:border-white shadow-white focus-visible:outline-white"
                  id="password"
                  type="password"
                  placeholder="enter password"
                  {...register("password")}
                />
                <p className="text-red-600">{errors.password?.message}</p>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-neutral-800 to-neutral-900 border hover:shadow-md transform hover:translate-3d shadow-neutral-600"
            onClick={handleSubmit(handleRegister)}
          >
            {loading ? (
              <span className="flex gap-1 justify-between items-center">
                <Loader2Icon className="animate-spin" />
                Signup...
              </span>
            ) : (
              "Signup"
            )}
          </Button>
          <Button variant="outline" className="w-full text-black">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupComponent;
