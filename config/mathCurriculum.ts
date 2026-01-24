// 人教版数学教材数据结构

export type GradeLevel = 'elementary' | 'middle' | 'high';
export type ExperimentType = 'cylinder-cone' | 'cut-geometry' | 'unfold' | 'volume-comparison';

export interface Experiment {
  id: string;
  title: string;
  description: string;
  type: ExperimentType;
  formula?: string;
  explanation?: string;
  solution?: string;
}

export interface Unit {
  id: string;
  title: string;
  experiments: Experiment[];
}

export interface Grade {
  id: string;
  level: GradeLevel;
  name: string;
  units: Unit[];
}

export const MATH_CURRICULUM: Grade[] = [
  {
    id: 'elementary-6-2',
    level: 'elementary',
    name: '小学六年级下册',
    units: [
      {
        id: 'unit-3',
        title: '第三单元：圆柱与圆锥',
        experiments: [
          {
            id: 'exp-1',
            title: '等底等高的圆柱与圆锥',
            description: '通过倒水实验，证明圆锥体积是等底等高圆柱体积的三分之一',
            type: 'cylinder-cone',
            formula: 'V_圆锥 = 1/3 × V_圆柱 = 1/3 × Sh',
            explanation: '实验说明：将等底等高的圆柱和圆锥放在一起，将圆柱中的水倒入圆锥，需要倒3次才能倒满。这说明圆锥的体积是圆柱体积的三分之一。',
            solution: '解题思路：\n1. 观察圆柱和圆锥的底面积和高是否相等\n2. 通过倒水实验，发现需要3次才能倒满\n3. 得出结论：V_圆锥 = 1/3 × V_圆柱'
          },
          {
            id: 'exp-2',
            title: '圆柱与圆锥的展开图',
            description: '观察圆柱和圆锥的侧面展开图，理解表面积的计算',
            type: 'unfold',
            formula: 'S_圆柱 = 2πr² + 2πrh\nS_圆锥 = πr² + πrl',
            explanation: '实验说明：展开圆柱和圆锥的侧面，观察展开后的形状。圆柱侧面展开是矩形，圆锥侧面展开是扇形。',
            solution: '解题思路：\n1. 圆柱侧面展开：矩形，长=圆周长，宽=高\n2. 圆锥侧面展开：扇形，弧长=圆周长，半径=母线\n3. 计算表面积 = 底面积 + 侧面积'
          }
        ]
      }
    ]
  },
  {
    id: 'middle-7-1',
    level: 'middle',
    name: '初中七年级上册',
    units: [
      {
        id: 'unit-4',
        title: '第四章：几何图形初步',
        experiments: [
          {
            id: 'exp-3',
            title: '截一个几何体',
            description: '用平面截几何体，观察截面的形状',
            type: 'cut-geometry',
            formula: '截面形状取决于切割角度和位置',
            explanation: '实验说明：用平面截取立方体、圆柱、圆锥等几何体，观察不同角度和位置切割得到的截面形状。',
            solution: '解题思路：\n1. 确定切割平面的位置和角度\n2. 观察截面与几何体的交线\n3. 根据截面形状判断几何体的性质'
          }
        ]
      }
    ]
  },
  {
    id: 'high-10-1',
    level: 'high',
    name: '高中一年级上册',
    units: [
      {
        id: 'unit-2',
        title: '第二章：立体几何',
        experiments: [
          {
            id: 'exp-4',
            title: '体积比较实验',
            description: '比较不同几何体的体积关系',
            type: 'volume-comparison',
            formula: 'V_球 = 4/3πr³\nV_圆柱 = πr²h',
            explanation: '实验说明：比较球、圆柱、圆锥等几何体的体积，理解体积公式的推导过程。',
            solution: '解题思路：\n1. 确定几何体的尺寸\n2. 应用相应的体积公式\n3. 比较不同几何体的体积大小'
          }
        ]
      }
    ]
  }
];
