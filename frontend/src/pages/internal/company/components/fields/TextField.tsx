type Props = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
};

export function TextField({
    label,
    name,
    value,
    onChange,
    placeholder,
    disabled,
}: Props) {
    return (
        <div>
            <label className="block text-sm font-medium mb-2">
                {label}
            </label>

            <input
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200"
            />
        </div>
    );
}