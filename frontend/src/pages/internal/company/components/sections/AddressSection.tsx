import { InputMask } from "@react-input/mask";

type Props = {
    formData: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function AddressSection({ formData, onChange }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
                <label>CEP</label>
                <InputMask
                    mask="_____-___"
                    name="cep"
                    value={formData.cep}
                    onChange={onChange}
                    className="w-full px-4 py-3 border rounded-2xl"
                />
            </div>

            <input
                name="state"
                value={formData.state}
                onChange={onChange}
                placeholder="Estado"
                className="px-4 py-3 border rounded-2xl"
            />

            <input
                name="city"
                value={formData.city}
                onChange={onChange}
                placeholder="Cidade"
                className="px-4 py-3 border rounded-2xl"
            />

            <input
                name="address"
                value={formData.address}
                onChange={onChange}
                placeholder="Endereço"
                className="md:col-span-2 px-4 py-3 border rounded-2xl"
            />

        </div>
    );
}