import { Save } from "lucide-react";

type Props = {
    loading: boolean;
};

export function ActionsSection({ loading }: Props) {
    return (
        <div className="flex justify-end mt-10">
            <button
                type="submit"
                disabled={loading}
                className="
                    flex items-center gap-2
                    px-6 py-3
                    rounded-2xl
                    bg-[#ffac2e]
                    text-white font-semibold
                    shadow-lg shadow-[#ffac2e]/20
                    hover:opacity-90
                    transition
                    disabled:opacity-50
                "
            >
                <Save size={18} />
                {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
        </div>
    );
}