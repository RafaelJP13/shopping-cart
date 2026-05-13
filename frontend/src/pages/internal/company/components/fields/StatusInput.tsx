import { CheckCircle2, AlertCircle } from "lucide-react";

type Props = {
    label: string;
    value: string;
    status: "idle" | "success" | "error";
};

export function StatusInput({ label, value, status }: Props) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            <div className="relative">
                <input
                    value={value}
                    disabled
                    className="
                        w-full px-4 py-3
                        rounded-2xl border
                        bg-gray-100 text-gray-500
                        cursor-not-allowed
                    "
                />

                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {status === "success" && (
                        <CheckCircle2 className="text-green-500" size={20} />
                    )}

                    {status === "error" && (
                        <AlertCircle className="text-red-500" size={20} />
                    )}
                </div>
            </div>
        </div>
    );
}