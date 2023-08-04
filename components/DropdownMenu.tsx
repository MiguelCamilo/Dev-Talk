import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { IconType } from 'react-icons';

interface DropdownMenuProps {
	label?: string;
	className: string;
	btnClassName?: string;
	dropDownClassName: string;
	dropDownIcon: IconType;
	buttonIcon: IconType;
	onClick: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
	label,
	className,
	btnClassName,
	dropDownClassName,
	dropDownIcon: DropDownIcon,
	buttonIcon: ButtonIcon,
	onClick,
}) => {
	const items: MenuProps['items'] = [
		{
			label: (
				<button
					onClick={(event) => {
						event.stopPropagation();
						onClick()
					}}
					className={btnClassName}
				>
					<ButtonIcon size={20} className={className} />
					{label}
				</button>
			),
			key: '0',
		},
	];

	const handleDropDown = (event: any) => {
		event.stopPropagation();
	};
	return (
		<Dropdown menu={{ items }} trigger={['click']}>
			<button onClick={handleDropDown}>
				<Space>
					<DropDownIcon
						size={26}
						className={dropDownClassName}
					/>
				</Space>
			</button>
		</Dropdown>
	);
};

export default DropdownMenu;
