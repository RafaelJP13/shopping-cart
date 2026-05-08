export function DashboardPage() {
    return (
        <div className="space-y-4">

            {/* Header */}
            <div className="bg-white p-4 rounded shadow-sm">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-500 text-sm">
                    Overview of your Compre Mais activity
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

            {/* Recent activity */}
            <div className="bg-white p-4 rounded shadow-sm">
                <h2 className="font-semibold mb-2">Atividade recente</h2>

                <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Pedido #1023 foi criado</li>
                    <li>• Produto "Camiseta" atualizado</li>
                    <li>• Novo usuário registrado</li>
                </ul>
            </div>

        </div>
    );
}