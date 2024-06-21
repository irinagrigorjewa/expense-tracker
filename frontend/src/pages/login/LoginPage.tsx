import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutation/user.mutation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../../components/Button/Button";

export const LoginPage = () => {
  const [login, {loading}] = useMutation(LOGIN, {
    refetchQueries: ["GetAuthenticatedUser"],
  });
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: unknown) => {
    console.log(data);

    try {
      await login({
        variables: {
          input: data,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input {...register("username")} placeholder="Login" />
        <input {...register("password")} placeholder="Password" />
        <Button type="submit" disabled={loading} label={loading? "Loading...": "Submit"} />
      </form>
    </div>
  );
};
