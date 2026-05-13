type Props = {
    onSubmit: (e: React.FormEvent) => void;
    children: React.ReactNode;
};

export function CompanyForm({ onSubmit, children }: Props) {
    return (
        <form
            onSubmit={onSubmit}
            className="
                bg-white border
                rounded-3xl shadow-sm
                overflow-hidden
            "
        >
            <div className="h-2 bg-gradient-to-r from-[#ffac2e] to-orange-400" />
            <div className="p-8">{children}</div>
        </form>
    );
}