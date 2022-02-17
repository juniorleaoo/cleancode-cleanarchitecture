import { validate } from './cpf';

describe('validate', () => {

  describe('passando string', () => {

    it('deve retornar true para um CPF valido', () => {
      expect(validate('935.411.347-80')).toBeTruthy();
      expect(validate('93541134780')).toBeTruthy();
      expect(validate('253.226.570-10')).toBeTruthy();
      expect(validate('25322657010')).toBeTruthy();
    });

    it('deve retornar false para digitos repetidos', () => {
      expect(validate('000.000.000-00')).toBeFalsy();
      expect(validate('111.111.111-11')).toBeFalsy();
      expect(validate('222.222.222-22')).toBeFalsy();
      expect(validate('333.333.333-33')).toBeFalsy();
      expect(validate('444.444.444-44')).toBeFalsy();
      expect(validate('555.555.555-55')).toBeFalsy();
      expect(validate('666.666.666-66')).toBeFalsy();
      expect(validate('777.777.777-77')).toBeFalsy();
      expect(validate('888.888.888-88')).toBeFalsy();
      expect(validate('999.999.999-99')).toBeFalsy();
    });

    it('deve retornar true para um CPF valido que começa com 0', () => {
      expect(validate('039.990.540-50')).toBeTruthy();
      expect(validate('076.515.700-49')).toBeTruthy();
    });

    it('deve retornar false para um CPF inválido', () => {
      expect(validate('123.456.789-99')).toBeFalsy();
      expect(validate('12345678999')).toBeFalsy();
      expect(validate('253.226.570-11')).toBeFalsy();
      expect(validate('25322657011')).toBeFalsy();
    });

    it('deve retornar false para um CPF faltando digitos', () => {
      expect(validate('25.22.57-11')).toBe(false);
      expect(validate('25225711')).toBe(false);
      expect(validate('252')).toBe(false);
    });

    it('deve retornar false para um valor que tem mais de 11 digitos', () => {
      expect(validate('2515.251512.5517-131')).toBe(false);
      expect(validate('25152515125517131')).toBe(false);
    });

    it('deve retornar false para letras e caracteres especiais', () => {
      expect(validate('abc.def.ghi-jk')).toBeFalsy()
      expect(validate('a064.875.987-10')).toBeFalsy()
      expect(validate('03r5.397.803-51')).toBeFalsy()
      expect(validate('13866a3663b')).toBeFalsy()
      expect(validate('a06487598710')).toBeFalsy()
      expect(validate('0&.*00.00a-00')).toBeFalsy()
      expect(validate('00?.*00.01a-89')).toBeFalsy()
      expect(validate('?.**-%^(%(')).toBeFalsy()
    });
  });

  describe('imutabilidade', () => {

    it('deve manter o valor da entrada', () => {
      const cpf = '935.411.347-80';
      validate(cpf);
      expect(cpf).toBe('935.411.347-80');
    });

  });

  describe('passando tipos de valores incorretos', () => {
    it('deve retornar false para uma string vazia', () => {
      expect(validate('')).toBeFalsy()
    })

    it('deve retornar false para true', () => {
      // @ts-expect-error: Accepts string
      expect(validate(true)).toBeFalsy()
    })

    it('deve retornar false para false', () => {
      // @ts-expect-error: Accepts string
      expect(validate(false)).toBeFalsy()
    })

    it('deve retornar false para null', () => {
      // @ts-expect-error: Accepts string
      expect(validate(null)).toBeFalsy()
    })

    it('deve retornar false para undefined', () => {
      // @ts-expect-error: Missing parameter
      expect(validate()).toBeFalsy()
    })

    it('deve retornar false para NaN', () => {
      // @ts-expect-error: Accepts string
      expect(validate(Number.NaN)).toBeFalsy()
    })

    it('deve retornar false para um objeto', () => {
      // @ts-expect-error: Accepts string
      expect(validate({})).toBeFalsy()
    })

    it('deve retornar false para um array', () => {
      // @ts-expect-error: Accepts string
      expect(validate([])).toBeFalsy()
    })
  })
});