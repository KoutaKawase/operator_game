function isCalculatedNegative(left: number, right: number): boolean {
  return Math.sign(left - right) === -1;
}

function isCalculatedInteger(left: number, right: number): boolean {
  return Number.isInteger(left / right);
}

//答えの演算子が複数存在するような組み合わせを検査する
//example) 2 + 2 と 2 * 2のような組み合わせ
//全ての演算子のパターンを計算し格納し計算結果が他と重複していれば
//それは答えの演算子が複数あるとして弾く
function isOperatorDuplicate(left: number, right: number): boolean {
  const calculateds = [left + right, left - right, left * right, left / right];
  return new Set(calculateds).size !== calculateds.length;
}

export type Combination = {
  left: number;
  operator: '+' | '-' | '*' | '/';
  right: number;
  calculated: number;
};

//答えが整数のみになる組み合わせの式リスト
export type CombinationList = {
  '+': Combination[];
  '-': Combination[];
  '*': Combination[];
  '/': Combination[];
};

export class Problem {
  //有効な式リスト
  private readonly validCombinations: CombinationList;

  constructor() {
    this.validCombinations = this.createValidCombinations();
    console.log(this.validCombinations);
  }

  private createValidCombinations(): CombinationList {
    let combinatonList: CombinationList = {
      '+': [],
      '-': [],
      '*': [],
      '/': [],
    };

    for (let left = 1; left < 10; left++) {
      for (let right = 1; right < 10; right++) {
        if (!isOperatorDuplicate(left, right)) {
          combinatonList = this.storeCombinations(left, right, combinatonList);
        }
      }
    }

    return combinatonList;
  }

  private storeCombinations(left: number, right: number, list: CombinationList): CombinationList {
    list['+'].push({
      left,
      operator: '+',
      right,
      calculated: left + right,
    });
    if (!isCalculatedNegative(left, right)) {
      list['-'].push({
        left,
        operator: '-',
        right,
        calculated: left - right,
      });
    }
    list['*'].push({
      left,
      operator: '*',
      right,
      calculated: left * right,
    });
    if (isCalculatedInteger(left, right)) {
      list['/'].push({
        left,
        operator: '/',
        right,
        calculated: left / right,
      });
    }

    return list;
  }
}

const problem = new Problem();
problem;
