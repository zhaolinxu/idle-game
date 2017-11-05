import React from 'react'
import InstanceLineItem from 'views/components/InstanceLineItem'
import { format as f, titleify, Color } from 'utils/helpers'

export default class PropertyView extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  render() {
    const { properties, tryCompleteInstance } = this.props
    return (
      <div>
      {Object.values(properties).map((property, i) => {
        if (!property.unlocked) return false

        const instances = property.getInstances()
        const name = titleify(property.name)
        const income = f(property.income(), '0,0')
        const money = f(property.money(), '0,0')
        const research = f(property.researchMoney, '0')

        const currencyName = <Color>{titleify(property.currencyName)}</Color>
        const researchName = <Color>{titleify(property.researchName)}</Color>
        const researchLink = (
          <a href={`#/research/${property.id}`}>{name} 升级</a>
        )

        let last, lastName, next
        if (i > 0) {
          last = properties[i - 1]
          lastName = titleify(last.name)
          next = last.toCompleteUntilNextInstance
        }

        return (
          <div className={property.name} key={i}>

            <h3>{name}</h3>

            {i > 0 && next > 0 &&
              <p>
                {lastName} 下一级 {property.name}: {next}
              </p>
            }

            {instances &&
              <div>
                <p>
                  拥有{money} {currencyName} ，每秒生产 {income} 。
                </p>

                <p>
                  {research} {researchName} 现可提供使用 {researchLink}.
                </p>

                <p>
                  总共有{property.completed} {name}已经完成。
                </p>

                <h4>
                  活动 {name} <span className="badge">{instances.length}</span>
                </h4>

                <ul className="list-group">
                  {instances.map((instance, i) => {
                    return (
                      <InstanceLineItem
                        key={i}
                        instance={instance}
                        clickInstance={id => this.context.router.push(`/instance/${id}`)}
                        clickComplete={id => tryCompleteInstance(id)}>
                      </InstanceLineItem>
                    )
                  })}
                </ul>
              </div>
            }
          </div>
        )
      })}
      </div>
    )

  }
}
