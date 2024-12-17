import './index.css'

const TabItem = props => {
  const {tabItem, isActive, onUpdateActiveTabStatus} = props
  const {optionId, displayText} = tabItem
  const buttonClassName = isActive ? 'active-button' : 'inactive-button'

  const onClickTabItem = () => {
    onUpdateActiveTabStatus(optionId)
  }

  return (
    <li className="tab-item">
      <button
        type="button"
        className={buttonClassName}
        onClick={onClickTabItem}
      >
        {displayText}
      </button>
    </li>
  )
}
export default TabItem
