import { Form, Field } from "react-final-form";
// import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../graphql/mutation/user.mutation";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./SignUpPage.scss";

export const SignUpPage = () => {
  const [signup, { loading }] = useMutation(SIGN_UP, {
    refetchQueries: ["GetAuthenticatedUser"],
  });
  const onSubmit = async (values: any) => {
    try {
      await signup({
        variables: {
          input: values,
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("This didn't work.");
    }
  };

  const required = (value: string | undefined): string | undefined =>
    value ? undefined : "Required";

  return (
    <div className="sign-up-page">
      <h1>Sign Up</h1>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="sign-up-form">
            <Field name="name" validate={required}>
              {({ input, meta }) => (
                <div>
                  <input {...input} type="text" placeholder="Name" />
                  <div className="error">
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                </div>
              )}
            </Field>
            <input name={"username"} placeholder={"Username"} type={"text"} />
            <input name={"password"} placeholder={"Password"} type={"text"} />

            <label>Gender</label>
            <Field name="gender">
              {({ input }) => (
                <div>
                  <label>
                    <input
                      {...input}
                      type="radio"
                      value={"male"}
                      placeholder="Male"
                    />
                    Male
                  </label>
                </div>
              )}
            </Field>
            <Field name="gender">
              {({ input }) => (
                <div>
                  <label>
                    <input
                      {...input}
                      value={"female"}
                      type="radio"
                      placeholder="Female"
                    />
                    Female
                  </label>
                </div>
              )}
            </Field>
            <Button disabled={loading} type="submit" label="Submit" />
            <span>
              {"Already have an account? "}
              <Link className="login-link" to="/login">
                Login
              </Link>
            </span>
          </form>
        )}
      />
    </div>
  );
};
