import {
  Button,
  Center,
  Divider,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import BrandGoogle from "../assets/BrandGoogle";
import { Facebook } from "lucide-react";
import { isEmail, useForm } from "@mantine/form";
import PasswordConditions, {
  ValidateNewPassword,
} from "../components/auth/PasswordConditions";
import { Link, useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/auth/useAuthentication";
import { useEffect } from "react";
import { supabase } from "../supabase/supabase";

export enum AccountFormView {
  signin,
  signup,
}

type Props = {
  variant: AccountFormView;
};

export default function AccountForm({ variant }: Props) {
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
    variant === AccountFormView.signin ? "Welcome back" : "Get started";
  const subHeader =
    variant === AccountFormView.signin
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
  const buttonText = variant === AccountFormView.signin ? "Sign In" : "Sign Up";

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate:
      variant === AccountFormView.signin
        ? {}
        : {
            email: isEmail("Enter a valid email"),
            password: (value) => ValidateNewPassword(value).errorMessage,
          },
    validateInputOnBlur: true,
  });

  const onSignUp = async (values: typeof form.values) => {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: "/",
      },
    });

    console.log(data, error);
  };

  const onSignIn = async (values: typeof form.values) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    console.log(data, error);
  };

  return (
    <form
      className="flex flex-col space-y-2"
      onSubmit={form.onSubmit(
        variant === AccountFormView.signin ? onSignIn : onSignUp
      )}
    >
      <TextInput
        label="Email"
        placeholder="you@example.com"
        labelProps={{ mb: 5 }}
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label={
          <div className="flex flex-row justify-between items-center">
            <p className="text-sm text-slate-800 font-medium">Password</p>
            {variant === AccountFormView.signin && (
              <Button variant="transparent" size="compact-xs" p={0}>
                Forgot Password?
              </Button>
            )}
          </div>
        }
        labelProps={{ w: "100%", mb: 5 }}
        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
        {...form.getInputProps("password")}
      />
      <PasswordConditions
        password={form.values.password}
        shouldShow={
          variant === AccountFormView.signup && form.isTouched("password")
        }
      />
      <Button mt={20} size="lg" type="submit">
        {buttonText}
      </Button>
    </form>
  );
}

function AccountFormFooter({ variant }: Props) {
  const helpText =
    variant === AccountFormView.signin
      ? "Don't have an account? "
      : "Have an account? ";
  const linkText =
    variant === AccountFormView.signin ? "Sign Up" : "Sign In Now";
  const link =
    variant === AccountFormView.signin ? "/auth/signup" : "/auth/signin";

  return (
    <p className="text-sm text-center">
      {helpText}
      <Link className="text-emerald-400" to={link}>
        {linkText}
      </Link>
    </p>
  );
}
