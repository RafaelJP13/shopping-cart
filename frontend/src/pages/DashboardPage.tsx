import MyChart from "../components/charts/MyChart";

export function DashboardPage() {
    return (
        <div className="space-y-4">
            <MyChart />

            {/* Header */}
            <div className="bg-white p-4 rounded shadow-sm">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-500 text-sm">
                    Visão geral das métricas e desempenho do sistema
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-gray-500 text-sm">Total Produtos</p>
                    <p className="text-2xl font-bold">128</p>
                </div>

                <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-gray-500 text-sm">Pedidos hoje</p>
                    <p className="text-2xl font-bold">14</p>
                </div>

                <div className="bg-white p-4 rounded shadow-sm">
                    <p className="text-gray-500 text-sm">Faturamento</p>
                    <p className="text-2xl font-bold">R$ 3.240</p>
                </div>

            </div>




        </div>
    );
}