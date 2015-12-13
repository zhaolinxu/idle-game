import Constants from 'utils/Constants'

export default (id) => {
  const buildingNames = Constants.building[id]
  let researchTypes = research
  if (id === 0) {
    researchTypes = Object.assign({
      extra: specialResearch.extraHamlets
    }, researchTypes)
  }
  buildingNames.forEach((b, i) => {
    researchTypes['autoBuy-'+i] = specialResearch.autoBuy
  })
  return researchTypes
}

const research = {
  discount: {
    rank: 0,
    current: 0,
    percent: true,
    increment: 0.05,
    max: 0.5,
    description: "{name} buildings cost {value} less"
  },
  ignoreCost: {
    rank: 0,
    current: 0,
    increment: 1,
    max: 10,
    description: "{name} buildings ignore {value} buildings when computing cost"
  },
  startMoney: {
    rank: 0,
    current: 0,
    increment: 200,
    max: 2000,
    description: "{name}s start with {value} {currency}"
  },
  activeIncome: {
    rank: 0,
    current: 1,
    increment: 1,
    max: 5,
    description: "{name}s generate {value} when clicking"
  },
  passiveIncome: {
    rank: 0,
    current: 0,
    increment: 5,
    max: 50,
    description: "{name}s have {value} passive income"
  },
  upgradeRate: {
    rank: 0,
    current: 0,
    percent: true,
    increment: 0.2,
    max: 2,
    description: "{name}s generate upgrade points {value} faster"
  },
  autoComplete: {
    rank: 0,
    current: 100,
    increment: -10,
    min: 0,
    description: "Auto Completes {name}s after {value} seconds"
  },
  incrementCost: {
    rank: 0,
    current: 4,
    increment: -1,
    min: 1,
    description: "Finish {value} {name}s before getting next"
  },
  autoCost: {
    rank: 0,
    current: 1.5,
    percent: true,
    increment: -0.05,
    min: 1,
    description: "Lower AutoBuy cost multiplier to {value}"
  }
}

const specialResearch = {
  extraHamlets: {
    rank: 0,
    current: 1,
    increment: 1,
    max: 5,
    description: "You can have {value} {name}s active at once"
  },
  autoBuy: {
    rank: 0,
    current: 0,
    percent: true,
    increment: 0.05,
    max: 0.5,
    description: "AutoBuy {value} of {building} per tick"
  }
}