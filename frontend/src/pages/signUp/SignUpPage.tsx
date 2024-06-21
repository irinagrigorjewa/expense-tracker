import { Form, Field } from "react-final-form";
import { Input } from "../../components/Input/Input";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (values: any) => {
    console.log(values);
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
      <h2>Sign Up</h2>
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="sign-up-form">
            <Input
              label={"Name"}
              name={"name"}
              placeholder={"Name"}
              type={"text"}
              validate={required}
            />
            <Input
              label={"Username"}
              name={"username"}
              placeholder={"Username"}
              type={"text"}
            />
            <Input
              label={"Password"}
              name={"password"}
              placeholder={"Password"}
              type={"text"}
            />

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
                    {/* {meta.touched && meta.error && <span>{meta.error}</span>} */}
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
                    {/* {meta.touched && meta.error && <span>{meta.error}</span>} */}
                    Female
                  </label>
                </div>
              )}
            </Field>
            <Button disabled={loading} type="submit" label="Submit" />
            <Link to="/login">Login</Link>
          </form>
        )}
      />
    </div>
  );
};
