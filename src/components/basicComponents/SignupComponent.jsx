import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 as Loader2Icon, RocketIcon } from "lucide-react";

// Shadcn UI Components
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

// Your Project Imports
import { registerService } from "../../services/authServices";
import { clearMessages } from "../../features/auth/authSlice";
import { schemaSignup } from "../../features/auth/authSchema";
import { ModeToggle } from "./SelectMode";

const SignupComponent = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset, // Use reset to clear the whole form
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "ADMIN", // Set default role here
    },
  });

  // This function is now passed to the form's onSubmit
  const handleRegister = (data) => {
    dispatch(registerService(data));
  };

  useEffect(() => {
    // Navigate on success and then reset the form
    if (success) {
      navigate("/signin");
      reset();
    }
    // Cleanup messages on component unmount or when dependencies change
    return () => {
      dispatch(clearMessages());
    };
  }, [success, navigate, dispatch, reset]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <RocketIcon className="h-6 w-6" />
          <h1 className="text-xl font-bold">MyApp</h1>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline">Change</Button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-sm shadow-lg">
          <form onSubmit={handleSubmit(handleRegister)}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Create an Account</CardTitle>
              <CardDescription>
                Enter your details below to create your new account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <input type="hidden" {...register("role")} />

              {/* Username Input */}
              <div className="grid gap-2">
                <Label htmlFor="username">Name</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="John Doe"
                  {...register("username")}
                  aria-invalid={errors.username ? "true" : "false"}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
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
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <Button variant="outline" className="w-full" type="button">
                Sign Up with Google
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/signin" className="underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default SignupComponent;
