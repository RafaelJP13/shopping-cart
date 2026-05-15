import { ActivityItem } from "./internal/company/components/dashboard/ActivityItem";

export function DashboardPage() {
    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="bg-white p-4 rounded shadow-sm">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-500 text-sm">
                    Visão geral das métricas e desempenho do sistema
                </p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-gray-500 text-sm">Empresas ativas</p>
                    <p className="text-2xl font-bold">1</p>
                </div>

                <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-gray-500 text-sm">Novas (30 dias)</p>
                    <p className="text-2xl font-bold">1</p>
                </div>

                <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-gray-500 text-sm">Empresas inativas</p>
                    <p className="text-2xl font-bold">0</p>
                </div>

                <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-gray-500 text-sm">Receita mensal</p>
                    <p className="text-2xl font-bold">R$ 0.00</p>
                </div>

            </div>

            {/* ATIVIDADES */}
            <div className="bg-white rounded shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-4">
                    Últimas atividades
                </h2>

                <div className="space-y-4">

                    <ActivityItem
                        type="create"
                        text="Empresa Tech Ltda foi criada"
                        time="há 2 minutos"
                    />

                    <ActivityItem
                        type="update"
                        text="Empresa Alpha Corp foi atualizada"
                        time="há 15 minutos"
                    />

                    <ActivityItem
                        type="cnpj"
                        text="Consulta de CNPJ realizada"
                        time="há 1 hora"
                    />

                </div>
            </div>

        </div>
    );
}