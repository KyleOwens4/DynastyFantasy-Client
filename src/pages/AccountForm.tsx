import {
  Anchor,
  Button,
  Divider,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import BrandGoogle from "../assets/BrandGoogle";
import { Facebook } from "lucide-react";
import { useForm } from "@mantine/form";

export enum AccountFormView {
  signin,
  signup,
}

type Props = {
  variant: AccountFormView;
};

export default function AccountForm({ variant }: Props) {
  return (
    <Paper
      shadow="md"
      radius={"md"}
      className="flex flex-col space-y-4 w-[50%] px-8 py-4 items-center"
    >
      <AccountFormHeader variant={variant} />
      <OAuthButtons />
      <Divider label={<span className="font-bold">or</span>} />
      <EmailAccountForm variant={variant} />
      <AccountFormFooter variant={variant} />
    </Paper>
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

function AccountFormFooter({ variant }: Props) {
  const helpText =
    variant === AccountFormView.signin
      ? "Don't have an account? "
      : "Have an account? ";
  const anchorText =
    variant === AccountFormView.signin ? "Sign Up" : "Sign In Now";

  return (
    <p className="text-sm text-center">
      {helpText}
      <Anchor size="sm">{anchorText}</Anchor>
    </p>
  );
}

function EmailAccountForm({ variant }: Props) {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const buttonText = variant === AccountFormView.signin ? "Sign In" : "Sign Up";

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <form
      className="flex flex-col space-y-2"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <TextInput label="Email" />
      <PasswordInput
        label={
          <div className="flex flex-row justify-between items-center">
            <p className="text-sm text-slate-800 font-medium">Password</p>
            {variant === AccountFormView.signin && (
              <Button variant="transparent">Forgot Password?</Button>
            )}
          </div>
        }
        labelProps={{ w: "100%" }}
        {...form.getInputProps("password")}
      />
      {variant === AccountFormView.signin && (
        <PasswordConditions password={form.values.password} />
      )}
      <Button mt={20} size="lg">
        {buttonText}
      </Button>
    </form>
  );
}

function PasswordConditions({ password }: { password: string }) {
  console.log(password);
  return <p>{password}</p>;
}
