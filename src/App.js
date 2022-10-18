import { MdSearch } from "react-icons/md";
import { useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
	const [input, setInput] = useState("");
	const [cep, setCep] = useState({});

	function handleKeyDown(e) {
		if (e.key === "Enter") {
			handleSearch();
		}
	}

	async function handleSearch() {
		if (input.trim().length === 0) {	
			alert("Preencha o CEP corretamente");
			return;
		}

		try {
			const response = await api.get(`${input}/json`);
			setCep(response.data);
			setInput("");
		} catch {
			alert("Erro ao buscar CEP");
			setInput("");
		}
	}

	return (
		<div className="container">
			<h1 className="title">Buscador CEP</h1>
			<div className="containerInput">
				<input
					type="text"
					placeholder="Digite o CEP..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
					maxLength={8}
					onKeyDown={handleKeyDown}
				/>

				<button className="buttonSearch" onClick={handleSearch}>
					<MdSearch size={25} color="white" />
				</button>
			</div>

			{cep.cep && (
				<main className="main">
					<h2>CEP: {cep.cep}</h2>
					<span>{cep.logradouro}</span>
					<span>Complemento: {cep.complemento}</span>
					<span>{cep.bairro}</span>
					<span>
						{cep.localidade} {cep.uf}
					</span>
				</main>
			)}
		</div>
	);
}

export default App;
