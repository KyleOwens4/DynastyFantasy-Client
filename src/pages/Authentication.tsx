import {
  Alert,
  Button,
  Center,
  Divider,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import BrandGoogle from "../assets/BrandGoogle";
import { Facebook, Lock } from "lucide-react";
import { isEmail, useForm } from "@mantine/form";
import PasswordConditions, {
  ValidateNewPassword,
} from "../components/auth/PasswordConditions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/auth/useAuthentication";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

export enum AuthenticationView {
  signin,
  signup,
}

type Props = {
  variant: AuthenticationView;
};

export default function Authentication({ variant }: Props) {
  const { isAuthenticated } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <Center className="grow">
      <Paper
        shadow="md"
        radius={"md"}
        className="flex flex-col space-y-4 w-[50%] max-w-[500px] px-8 py-4 items-center"
      >
        <AccountFormHeader variant={variant} />
        <OAuthButtons />
        <Divider label={<span className="font-bold">or</span>} />
        <EmailAccountForm variant={variant} />
        <AccountFormFooter variant={variant} />
      </Paper>
    </Center>
  );
}

function AccountFormHeader({ variant }: Props) {
  const header =
    variant === AuthenticationView.signin ? "Welcome back" : "Get started";
  const subHeader =
    variant === AuthenticationView.signin
      ? "Sign in to your account"
      : "Create a new account";

  return (
    <div>
      <h1 className="text-2xl font-bold">{header}</h1>
      <p className="text-sm text-slate-500">{subHeader}</p>
    </div>
  );
}

function OAuthButtons() {
  return (
    <div className="flex flex-col items-center space-y-4 mt-6 w-full">
      <Button
        leftSection={<BrandGoogle className="w-6 fill-white" />}
        w={"100%"}
        variant="outline"
        color="slate.4"
      >
        Continue with Google
      </Button>
      <Button
        leftSection={<Facebook className="w-6 text-sky-500" />}
        w={"100%"}
        variant="outline"
        color="slate.4"
      >
        Continue with Facebook
      </Button>
    </div>
  );
}

function EmailAccountForm({ variant }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMesssage] = useState<string | null>(null);

  const location = useLocation();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate:
      variant === AuthenticationView.signin
        ? {}
        : {
            email: isEmail("Enter a valid email"),
            password: (value) => ValidateNewPassword(value).errorMessage,
          },
    validateInputOnBlur: true,
  });

  const buttonText =
    variant === AuthenticationView.signin ? "Sign In" : "Sign Up";

  useEffect(() => {
    setError(null);
    setLoading(false);
    form.reset();
  }, [location]);

  const onSubmit = async (values: typeof form.values) => {
    setError(null);
    setMesssage(null);
    setLoading(true);

    variant === AuthenticationView.signin ? onSignIn(values) : onSignUp(values);
  };

  const onSignUp = async (values: typeof form.values) => {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: "/",
      },
    });

    if (error) {
      setError(error.message);
    } else if (user && !session) {
      setMesssage("Check your email for the confirmation link");
    }

    setLoading(false);
  };

  const onSignIn = async (values: typeof form.values) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <form
      className="flex flex-col space-y-2"
      onSubmit={form.onSubmit(onSubmit)}
    >
      <TextInput
        label="Email"
        placeholder="you@example.com"
        labelProps={{ mb: 5 }}
        {...form.getInputProps("email")}
        onChange={(event) => {
          setError(null);
          setMesssage(null);
          form.setFieldValue("email", event.target.value);
        }}
      />
      <PasswordInput
        {...form.getInputProps("password")}
        label={
          <div className="flex flex-row justify-between items-center">
            <p className="text-sm text-slate-800 font-medium">Password</p>
            {variant === AuthenticationView.signin && (
              <Button variant="transparent" size="compact-xs" p={0}>
                Forgot Password?
              </Button>
            )}
          </div>
        }
        labelProps={{ w: "100%", mb: 5 }}
        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
        onChange={(event) => {
          setError(null);
          setMesssage(null);
          form.setFieldValue("password", event.target.value);
        }}
      />
      <PasswordConditions
        password={form.values.password}
        shouldShow={
          variant === AuthenticationView.signup && form.isTouched("password")
        }
      />

      <Button mt={20} size="lg" type="submit" loading={loading}>
        {buttonText}
      </Button>
      <div
        className={`${
          message ? "max-h-[300px]" : "max-h-0"
        } overflow-y-hidden transition-all`}
      >
        {
          <Alert icon={<Lock />} title={"success"}>
            {message ? message : " "}
          </Alert>
        }
      </div>
      <div
        className={`${
          error ? "max-h-[300px]" : "max-h-0"
        } overflow-y-hidden transition-all`}
      >
        {
          <Alert
            color="rose.6"
            icon={<Lock />}
            title={`${
              variant === AuthenticationView.signin ? "Login" : "Sign up"
            } error`}
          >
            {error ? error : " "}
          </Alert>
        }
      </div>
    </form>
  );
}

function AccountFormFooter({ variant }: Props) {
  const helpText =
    variant === AuthenticationView.signin
      ? "Don't have an account? "
      : "Have an account? ";
  const linkText =
    variant === AuthenticationView.signin ? "Sign Up" : "Sign In Now";
  const link =
    variant === AuthenticationView.signin ? "/auth/signup" : "/auth/signin";

  return (
    <p className="text-sm text-center">
      {helpText}
      <Link className="text-emerald-400" to={link}>
        {linkText}
      </Link>
    </p>
  );
}
