import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LOGIN } from "../../graphql/mutation/user.mutation";
import { Button } from "../../components/Button/Button";
import "./LoginPage.scss";

export const LoginPage = () => {
  const [login, { loading }] = useMutation(LOGIN, {
    refetchQueries: ["GetAuthenticatedUser"],
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: unknown) => {
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <input {...register("username")} placeholder="Login" />
        <input {...register("password")} placeholder="Password" />
        <Button
          type="submit"
          disabled={loading}
          label={loading ? "Loading..." : "Submit"}
        />
        <span>
          Don't have an account?{" "}
          <Link className="link" to="/signup">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};
