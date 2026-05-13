import { Search, CheckCircle2, AlertCircle } from "lucide-react";
import { InputMask } from "@react-input/mask";

type Props = {
    formData: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDocumentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    loadingCNPJ: boolean;
    cnpjStatus: "idle" | "success" | "error";
};

export function CompanyInfoSection({
    formData,
    onChange,
    onDocumentChange,
    loadingCNPJ,
    cnpjStatus,
}: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
                <label className="block text-sm mb-2">
                    Nome do Administrador
                </label>

                <input
                    name="adminName"
                    value={formData.adminName}
                    onChange={onChange}
                    className="w-full px-4 py-3 border rounded-2xl"
                />
            </div>

            <div>
                <label className="block text-sm mb-2">
                    E-mail
                </label>

                <input
                    name="adminEmail"
                    value={formData.adminEmail}
                    disabled
                    className="w-full px-4 py-3 border rounded-2xl bg-gray-100"
                />
            </div>

            {/* CNPJ */}
            <div>
                <label className="block text-sm mb-2">
                    CNPJ
                </label>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2" />

                    <InputMask
                        mask="__.___.___/____-__"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={onDocumentChange}
                        className="w-full pl-12 pr-10 py-3 border rounded-2xl"
                    />

                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {loadingCNPJ && (
                            <span className="animate-spin">⏳</span>
                        )}

                        {cnpjStatus === "success" && (
                            <CheckCircle2 className="text-green-500" />
                        )}

                        {cnpjStatus === "error" && (
                            <AlertCircle className="text-red-500" />
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}