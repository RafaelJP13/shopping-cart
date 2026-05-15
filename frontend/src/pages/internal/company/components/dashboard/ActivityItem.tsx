import { CheckCircle2, RefreshCw, Search } from "lucide-react";

type Props = {
    type: "create" | "update" | "cnpj";
    text: string;
    time: string;
};

export function ActivityItem({ type, text, time }: Props) {
    const iconMap = {
        create: <CheckCircle2 className="text-green-500" size={18} />,
        update: <RefreshCw className="text-blue-500" size={18} />,
        cnpj: <Search className="text-orange-500" size={18} />,
    };

    return (
        <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
                {iconMap[type]}

                <span className="text-sm text-gray-700">
                    {text}
                </span>
            </div>

            <span className="text-xs text-gray-400">
                {time}
            </span>
        </div>
    );
}