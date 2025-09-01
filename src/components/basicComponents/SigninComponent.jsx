import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 as Loader2Icon, MoreVertical, RocketIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SigninService } from "../../services/authServices";
import { clearMessages } from "../../features/auth/authSlice";
import { schemaSignin } from "../../features/auth/authSchema";
import { ModeToggle } from "./SelectMode";

const SigninComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error, accessToken } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignin),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSignin = (data) => {
    dispatch(SigninService(data));
  };

  useEffect(() => {
    if (success && accessToken) {
      navigate("/dashboard");
      reset();
    }
    return () => {
      dispatch(clearMessages());
    };
  }, [success, accessToken, navigate, dispatch, reset]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <RocketIcon className="h-6 w-6" />
          <h1 className="text-xl font-bold">MyApp</h1>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More Options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Know More</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a
                  href="https://github.com/ankitsingh5423"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github Account
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a
                  href="https://www.linkedin.com/in/ankisingh5423/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn Account
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <a
                  href="https://ankitsingh5423.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  My Portfolio
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* ## MAIN CONTENT - CENTERED SIGNIN CARD ## */}
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-sm shadow-lg">
          {/* Use form's onSubmit for proper handling */}
          <form onSubmit={handleSubmit(handleSignin)}>
            <CardHeader className="text-center mb-3">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* username Input */}
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-[18px]">
                  Name
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="enter your name"
                  defaultValue=""
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="#"
                    className="ml-auto inline-block text-sm underline"
                    onClick={() =>
                      alert("Forgot password feature not implemented yet")
                    }
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 mt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={() =>
                  alert("Google Sign In not implemented yet \n Comming soon!")
                }
              >
                Sign In with Google
              </Button>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default SigninComponent;
