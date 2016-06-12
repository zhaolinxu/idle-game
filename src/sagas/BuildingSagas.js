import { updateInstance } from 'actions/InstanceActions'
import { doBuildingPurchase } from 'actions/BuildingActions'
import { flashMessage, changeUpgradePoints } from 'actions/InterfaceActions'
import { add } from 'utils/helpers'
import { put, select, fork, take } from 'redux-saga/effects'

function* tryBuildingPurchase() {
  while (true) {
    const action = yield take('TRY_BUILDING_PURCHASE')

    const { buildingKey, instanceKey, cost } = action.payload
    const { money, count } = yield select(state => ({
      money: state.instances[instanceKey].money,
      count: state.ui.multi,
    }))

    if (cost * count <= money) {
      yield put(doBuildingPurchase(buildingKey, instanceKey, cost, count))
    } else {
      yield put(flashMessage(`PURCHASE_ERROR: ${cost - money} money short`))
    }
  }
}

function* upgradePurchase() {
  while (true) {
    const action = yield take('UPGRADE_PURCHASE')

    const { instanceKey, buildingKey, cost } = action.payload
    const { upgrades, building } = yield select(state => ({
      upgrades: state.ui.upgrades,
      building: state.instances[instanceKey].buildings()[buildingKey],
    }))

    if (upgrades >= cost && building.count > 0) {
      yield put(updateInstance(instanceKey, {
        upgradedBuildings: { [building.index]: add(1) },
      }))
      yield put(changeUpgradePoints(0 - cost))
    } else {
      yield put(flashMessage(`PURCHASE_ERROR: ${cost - upgrades} upgrade points short`))
    }
  }
}

export default function* BuildingSagas() {
  yield fork(tryBuildingPurchase)
  yield fork(upgradePurchase)
}
