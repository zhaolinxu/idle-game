import React from 'react'
import { format as f, titleify, Color } from 'utils/helpers'
import { ProgressBar } from 'react-bootstrap'
import BuildingLineItem from 'views/components/BuildingLineItem'

export default React.createClass({
  render() {
    const instance = this.props.instances[this.props.params.instance]

    if (!instance) return false

    let progressBar

    const { tryBuildingPurchase, tryUpgradePurchase, _unlockBuilding, ui } = this.props
    const { id, money, currencyName, goal } = instance
    const { researchMoney, researchName } = instance.property()

    const name = titleify(instance.name)
    const progress = Math.floor(Math.min(100, instance.progress))
    const income = instance.income()
    const complete = instance.progress >= 100
    const autoCompleteProgress = 100 - instance.autoCompleteProgress()

    const researchLink = (
      <a href={`#/research/${instance.type}`}>{name}升级</a>
    )

    const currencyDiv = <Color>{titleify(currencyName)}</Color>
    const researchDiv = <Color>{titleify(researchName)}</Color>

    if (complete) {
      progressBar = (
        <div onClick={() => this.props.tryCompleteInstance(id)}>

          <ProgressBar
            className="pointer"
            now={autoCompleteProgress}
            label={`${progress}%`}>
          </ProgressBar>

          <h6>
           点击栏以完成级别或等待自动完成
          </h6>

        </div>
      )
    } else {
      progressBar = (
        <ProgressBar now={progress} label={`${progress}%`} />
      )
    }

    return (
      <div className={instance.property().name}>
        <div className="text-center">

          <h2>
            {name}
          </h2>

          {progressBar}

          <h5>
            目标: {goal.description}
          </h5>

        </div>

        <p>
          拥有 {f(money, '0,0')} {currencyDiv} ，生产 {income}  {currencyDiv} / 秒。
        </p>

        <p>
          {researchMoney} {researchDiv} 可以用来 {researchLink}.
        </p>

        <a onClick={() => this.props.toggleAutoBuy(id)}>
          切换自动购买：{instance.disableAutoBuy ? '关闭' : '打开'}
        </a>

        <table className="table">

          <thead><tr>
            <th>建造</th>
            <th>#</th>
            <th>消耗</th>
            <th>收入</th>
            <th>/ 秒</th>
          </tr></thead>

          <tbody>
            {instance.buildings().map((building, index) => {
              return (
                <BuildingLineItem
                  key={`building-${index}`}
                  index={index}
                  ui={ui}
                  building={building}
                  instance={instance}
                  tryUpgradePurchase={tryUpgradePurchase}
                  tryBuildingPurchase={tryBuildingPurchase}
                  _unlockBuilding={_unlockBuilding}>
                </BuildingLineItem>
              )
            })}
          </tbody>

        </table>
      </div>
    )
  },
})
