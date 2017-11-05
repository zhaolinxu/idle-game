import _ from 'lodash'

const research = {
  discount: {
    rank: 0,
    current: 0,
    percent: true,
    increment: 0.1,
    max: 0.5,
    description: '{name} 建造成本降低 {value}',
  },
  ignoreCost: {
    rank: 0,
    current: 0,
    increment: 2,
    max: 10,
    description: '{name} 建筑降低 {value} 建筑成本',
  },
  startMoney: {
    rank: 0,
    current: 0,
    increment: 200,
    max: 1000,
    description: '{name} 开局拥有 {value} {currency}',
  },
  passiveIncome: {
    rank: 0,
    current: 0,
    increment: 10,
    max: 50,
    description: '{name} 拥有 {value} 被动收入',
  },
  upgradeCost: {
    rank: 0,
    current: 0,
    percent: true,
    increment: 0.1,
    max: 0.5,
    description: '{name} 升级消耗降低 {value}',
  },
  autoComplete: {
    rank: 0,
    current: 50,
    increment: -10,
    min: 0,
    description: '自动完成 {name} 在 {value} 秒之后',
  },
  incrementCost: {
    rank: 0,
    current: 5,
    increment: -1,
    min: 1,
    description: '完成 {value} {name}在下一步之前',
  },
  autoCost: {
    rank: 0,
    current: 1.5,
    percent: true,
    increment: -0.1,
    min: 1,
    description: '自动购买成本降低 {value}',
  },
}

const specialResearch = {
  extraHamlets: {
    rank: 0,
    current: 1,
    increment: 1,
    max: 5,
    description: '您可以一次激活{value} 个 {name} 。',
  },
  autoBuy: {
    rank: 0,
    current: 0,
    percent: true,
    increment: 0.1,
    max: 0.5,
    description: '自动购买 {value} 次 {building} 每秒。',
  },
}


export default (id) => {
  // TODO: clean this up a bit
  let researchTypes = research
  if (id === 0) {
    researchTypes = Object.assign({
      extra: specialResearch.extraHamlets,
    }, researchTypes)
  }
  _.range(0, 10).forEach((b, i) => {
    researchTypes['autoBuy-'+i] = specialResearch.autoBuy
  })
  return researchTypes
}
