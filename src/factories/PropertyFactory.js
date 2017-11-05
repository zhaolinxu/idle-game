import store from 'utils/reduxStore'
import numeral from 'numeral'
import u from 'updeep'
import { titleify, replaceString } from 'utils/helpers'
import { buildingNames } from 'factories/BuildingFactory'
import ResearchFactory from 'factories/ResearchFactory'

export const name = ['小村', '乡村', '小镇', '城市', '城堡', '王国', '帝国', '星球', '星系', '宇宙']
export const color = ['#D48A5B', '#F8ECC9', '#C85705', '#9A93A1', '#CBA65C', '#F8CA00', '#07557D', '#24D268', '#E566C2', '#333333']
export const currencyNames = ['鹿', '羊羔', '砖头', '铁', '士兵', '黄金', '机器', '星舰', '事项', '存在']
export const researchNames = ['鹿肉', '羊毛', '大理石', '钢', '队长', '白金', '电路', '反物质', '人工智能', '超越']

export default () => {

  // these properties are persisted to local storage
  return name.map((name, id) => {
    return {

      id: id,

      // accumulated research currency from instance completion
      researchMoney: 0,

      // current research levels and rates
      researchTypes: ResearchFactory(id),

      // buildings player has afforded at some point
      unlockedBuildings: [0],

      // instances of this type completed so far
      completed: 0,

      // how many instances are queued up to be created next instance
      toBuild: 0,

      // number of this type to complete until next property up is created
      toCompleteUntilNextInstance: 5 + id,

      // has player has reached this property type?
      unlocked: id == 0,
    }
  })
}

export const rehydrate = (property) => {

  let rehydratedProperty = u(property, helpers)

  return Object.assign({}, {

    name: name[property.id],

    // display color
    color: color[property.id],

    // building currency display name
    currencyName: currencyNames[property.id],

    // research currency display name
    researchName: researchNames[property.id],

    // building display names
    buildingNames: buildingNames[property.id],

  }, rehydratedProperty)
}

const helpers = {

  // computed income for this property
  income() {
    return this.getInstances().reduce((a, b) => a + b.income(), 0)
  },

  // computed money for this property
  money() {
    return this.getInstances().reduce((a, b) => a + b.money, 0)
  },

  // get the current level of the requested research type
  research(key) {
    return this.researchTypes[key].current
  },

  // can the requested research type be increased anymore?
  researchComplete(key) {
    const research = this.researchTypes[key]
    return research.current >= research.max || research.current <= research.min
  },

  // get the cost for the next level of request research type
  researchCost(key) {
    const rank = this.researchTypes[key].rank
    const costFn = (a, b, c, d) => {
      return Math.floor(a * b + Math.pow(c, d))
    }

    if (/extra/.test(key)) {
      return costFn(rank+1, 2, 2, rank)
    }
    else if (/autoBuy/.test(key)) {
      return costFn(rank+1, 1, 1.5, rank-1)
    }
    else {
      return costFn(1, 1, 1.5, rank-1)
    }
  },

  // get description of research based on current state
  researchDescription(key) {
    const research = this.researchTypes[key]

    const autoBuy = parseInt(key.replace('autoBuy-', ''))
    const buildingName = this.buildingNames[autoBuy]

    const percentify = (n) => {
      if (!research.percent) return n
      return numeral(n*100).format('0') + '%'
    }

    const current = percentify(research.current)
    const next = percentify(research.current + research.increment)

    return replaceString({
      name: titleify(this.name),
      currency: titleify(this.currencyName),
      building: titleify(buildingName),
      value: this.researchComplete(key) ? current : `${next} (${current})`,
    }, research.description)
  },

  // short hand for get instances
  getInstances() {
    const instances = Object.values(store.getState().instances)
    return instances.filter(i => i.type == this.id && !i.complete)
  },

  completedInstances() {
    const instances = Object.values(store.getState().instances)
    return instances.filter(i => i.type == this.id && i.complete)
  },
}
