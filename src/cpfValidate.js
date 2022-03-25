function validate(cpf) {
	// Deixando apenas os dígitos do CPF
	const cpfText = cpf.replace(/\D/g,"");

	// Se o tamanho for diferente de 11 o CPF já é inválido
	if(cpfText.length !== 11) {
		throw new Error("O CPF inserido não possui 11 dígitos!");
	}

	// Criando um Array à partir do cpfText e convertendo cada item do mesmo para number
	const cpfFormatted = Array.from(cpfText).map((digit) => Number(digit));

	// Variável auxiliar para executar as operações
	let aux = 10;

	// Soma para verificar o primeiro dígito verificador
	const firstSum = cpfFormatted.reduce((acc, digit, index) => {
		if(index < 9) {
			acc += digit * aux;
			aux--;
			return acc;
		}
		return acc;
	}, 0);

	// Primeiro dígito = soma % 11:
	// Se o resto da divisão for menor que 2 então o dígito vai ser 0;
	// Se não o dígito vai ser 11 - resto da divisão
	const firstDigit = firstSum % 11 < 2 ? 0 : 11 - (firstSum % 11);

	// Atualizando aux para a verificação do outro dígito
	aux = 11;

	// Soma para verificar o segundo dígito verificador
	const secondSum = cpfFormatted.reduce((acc, digit, index) => {
		if(index < 10) {
			acc += digit * aux;
			aux--;
			return acc;
		}
		return acc;
	}, 0);

	// Segundo dígito = soma % 11:
	// Se o resto da divisão for menor que 2 então o dígito vai ser 0;
	// Se não o dígito vai ser 11 - resto da divisão
	const secondDigit = secondSum % 11 < 2 ? 0 : 11 - (secondSum % 11);

	if(cpfFormatted[9] !== firstDigit || cpfFormatted[10] !== secondDigit) {
		return false;
	}

	return true;
}

module.exports = {
	validate
};