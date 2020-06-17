import { getProblemFont, getProblemLabel, getProblemPoint } from './utils/entityUtil';

function isCalculatedNegative(left: number, right: number): boolean {
  return Math.sign(left - right) === -1;
}

function isCalculatedInteger(left: number, right: number): boolean {
  return Number.isInteger(left / right);
}

function getRandomOperator(): Operator {
  const operators = ['+', '-', '*', '/'];
  const random = g.game.random;
  return operators[Math.floor(random.generate() * operators.length)] as Operator;
}

function getRandomIndex(max: number): number {
  return Math.floor(g.game.random.generate() * max);
}
//答えの演算子が複数存在するような組み合わせを検査する
//example) 2 + 2 と 2 * 2のような組み合わせ
//全ての演算子のパターンを計算し格納し計算結果が他と重複していれば
//それは答えの演算子が複数あるとして弾く
function isOperatorDuplicate(left: number, right: number): boolean {
  const calculateds = [left + right, left - right, left * right, left / right];
  return new Set(calculateds).size !== calculateds.length;
}

type Operator = '+' | '-' | '*' | '/';

export type Combination = {
  left: number;
  operator: Operator;
  right: number;
  calculated: number;
};

//答えが整数のみになる組み合わせの式リスト
type CombinationList = {
  '+': Combination[];
  '-': Combination[];
  '*': Combination[];
  '/': Combination[];
};

type TextProblem = {
  leftText: string;
  rightText: string;
  equalText: string;
  calculatedText: string;
};

export class Problem {
  //有効な式リスト
  private readonly validCombinations: CombinationList;
  private currentProblem: Combination;
  private scene: g.Scene;
  private problemLabel: g.E;

  constructor(scene: g.Scene) {
    this.validCombinations = this.createValidCombinations();
    this.currentProblem = this.pickProblemRandomly();
    this.scene = scene;
    this.problemLabel = this.createProblemLabel();
  }

  show(): void {
    this.scene.append(this.problemLabel);
  }

  remove(): void {
    this.scene.remove(this.problemLabel);
  }

  pickProblemRandomly(): Combination {
    const operator = getRandomOperator();
    const index = getRandomIndex(this.validCombinations[operator].length);
    return this.validCombinations[operator][index];
  }

  private createProblemLabel(): g.E {
    const scene = this.scene;
    const group = new g.E({ scene, x: 30, y: 110 });
    const { leftText, rightText, equalText, calculatedText } = this.stringifyProblem();
    const {
      leftX,
      leftY,
      rightX,
      rightY,
      equalX,
      equalY,
      calculatedX,
      calculatedY,
    } = getProblemPoint();
    const font: g.BitmapFont = getProblemFont(scene);
    const left = getProblemLabel(scene, font, leftText, leftX, leftY);
    group.append(left);
    const right = getProblemLabel(scene, font, rightText, rightX, rightY);
    group.append(right);
    const equal = getProblemLabel(scene, font, equalText, equalX, equalY);
    group.append(equal);
    const calculated = getProblemLabel(scene, font, calculatedText, calculatedX, calculatedY);
    group.append(calculated);

    return group;
  }

  private stringifyProblem(): TextProblem {
    const leftText = this.currentProblem.left.toString();
    const rightText = this.currentProblem.right.toString();
    const equalText = '=';
    const calculatedText = this.currentProblem.calculated.toString();
    return { leftText, rightText, equalText, calculatedText };
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
