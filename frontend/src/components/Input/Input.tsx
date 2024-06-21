import React from "react";
import { Field } from "react-final-form";
import "./Input.scss";

interface Props {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  validate?: (value: string | undefined) => string | undefined;
}

export const Input: React.FC<Props> = ({
  label,
  name,
  placeholder,
  type = "text",
  validate,
}) => (
  <Field name={name} type={type} validate={validate}>
    {({ input, meta }) => (
      <div className="input-group">
        <label htmlFor={name} className="input-group__label">
          {label}
        </label>
        <input
          {...input}
          id={name}
          placeholder={placeholder}
          type={type}
          className="input-group__input"
        />
        {meta.error && meta.touched && <span>{meta.error}</span>}
      </div>
    )}
  </Field>
);
