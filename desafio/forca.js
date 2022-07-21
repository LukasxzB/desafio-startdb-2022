class Forca {
	vidas = 6;
	estado = 'aguardando chute';
	letrasChutadas = [];

	constructor(palavra) {
		this.palavraSecreta = palavra;
		this.letrasRestantes = palavra.toLowerCase();
		this.palavraUsuario = new Array(palavra.length).fill('_');
	}

	chutar(letra) {
		// A letra sempre estará em minúsculo para que assim o jogador possa também chutar letras maiusculas
		letra = letra.toLowerCase();

		// Caso o jogador chute mais de uma letra, não deve fazer nada
		if (letra.length > 1) return;

		// Caso o jogador chute uma letra que já foi chutada, não deve fazer nada
		if (this.letrasChutadas.includes(letra)) return;

		// Adiciona a letra chutada ao array de letras chutadas
		this.letrasChutadas.push(letra);

		// Caso o jogador chute uma letra que não está na palavra, deve diminuir uma vida
		if (!this.palavraSecreta.includes(letra)) {
			this.vidas--;
		} else {
			// Caso contrário, deve marcar a letra como acertada e substituir os "_" por ela
			this.letrasRestantes = this.letrasRestantes.replaceAll(letra, '');

			for (var i = 0; i < this.palavraSecreta.length; i++) {
				if (this.palavraSecreta[i] == letra) {
					this.palavraUsuario[i] = letra;
				}
			}
		}

		// Caso o jogador tenha perdido, o estado deve ser "perdeu", caso ganhou o estado deve ser "ganhou", caso contrário "aguardando chute"
		// Caso o jogador tenha perdido, deve alterar o estado para "perdeu"
		this.estado =
			this.vidas <= 0
				? 'perdeu'
				: this.letrasRestantes == ''
				? 'ganhou'
				: 'aguardando chute';
	}

	buscarEstado() {
		return this.estado;
	} // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

	buscarDadosDoJogo() {
		return {
			letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
			vidas: this.vidas, // Quantidade de vidas restantes
			palavra: this.palavraUsuario, // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
		};
	}
}

module.exports = Forca;
