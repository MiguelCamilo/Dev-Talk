interface ButtonProps {
	label: string;
	secondary?: boolean;
	fullWidth?: boolean;
	large?: boolean;
	onClick: () => void;
	disabled?: boolean;
	outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	label,
	secondary,
	fullWidth,
	large,
	onClick,
	disabled,
	outline,
}) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`
            rounded-full
            border-2
            font-semibold
            transition
            hover:opacity-80 
            disabled:cursor-not-allowed
            disabled:opacity-70
            ${fullWidth ? 'w-full' : 'w-fit'}
            ${secondary ? 'bg-green-500' : 'bg-white'}
            ${secondary ? 'text-white' : 'text-black'}
            ${secondary ? 'border-green-500' : 'border-black'}
            ${large ? 'text-lg' : 'text-md'}
            ${large ? 'px-5' : 'px-4'}
            ${large ? 'py-3' : 'py-2'}
            ${outline ? 'bg-transparent' : ''}
            ${outline ? 'border-white' : ''}
            ${outline ? 'text-white' : ''}
        `}
		>
			{label}
		</button>
	);
};

export default Button