import "./Button.scss";

interface Props {
  label: string;
  disabled?: boolean;
  type?: any;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({ label, onClick, type = 'button', disabled, ...rest }) => (
  <button className="button" onClick={onClick} type={type} disabled={disabled} {...rest}>
    {label}
  </button>
);
