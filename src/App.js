import './App.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TabItem from './components/TabItem'
import TaskItem from './components/TaskItem'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    activeTabId: '',
    taskInput: '',
    tagInput: tagsList[0].optionId,
    allTasksList: [],
  }

  onUpdateActiveTabStatus = tabId => {
    const {activeTabId} = this.state
    if (activeTabId === tabId) {
      this.setState({activeTabId: ''})
    } else {
      this.setState({activeTabId: tabId})
    }
  }

  onChangeTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTabInput = event => {
    this.setState({tagInput: event.target.value})
  }

  onClickAddTask = () => {
    const {taskInput, tagInput} = this.state
    const tagInputTextObj = tagsList.filter(
      eachItem => eachItem.optionId === tagInput,
    )
    const tagInputText = tagInputTextObj[0].displayText
    console.log(tagInputText)
    console.log(tagInput)
    const taskObj = {
      id: uuidv4(),
      task: taskInput,
      tag: tagInputText,
      tagId: tagInput,
    }
    this.setState(prevState => ({
      allTasksList: [...prevState.allTasksList, taskObj],
      tagInput: tagsList[0].optionId,
      taskInput: '',
    }))
  }

  renderTaskInputContainer = () => {
    const {taskInput} = this.state
    return (
      <div className="input-container">
        <label className="label-element" htmlFor="task">
          Task
        </label>
        <input
          type="text"
          className="input-element"
          id="task"
          placeholder="Enter the task here"
          onChange={this.onChangeTaskInput}
          value={taskInput}
        />
      </div>
    )
  }

  renderTagsInputContainer = () => {
    const {tagInput} = this.state
    return (
      <div className="input-container">
        <label className="label-element" htmlFor="tags">
          Tags
        </label>
        <select
          className="input-element"
          id="tags"
          onChange={this.onChangeTabInput}
          value={tagInput}
        >
          {tagsList.map(eachItem => (
            <option key={eachItem.optionId} value={eachItem.optionId}>
              {eachItem.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  onSubmitForm = event => {
    event.preventDefault()
  }

  getTasksList = () => {
    const {allTasksList, activeTabId} = this.state
    const filteredTasks = allTasksList.filter(eachItem =>
      eachItem.tagId.includes(activeTabId),
    )
    return filteredTasks
  }

  renderEmptyView = () => (
    <div className="no-tasks-cont">
      <p className="no-tasks-head">No Tasks Added Yet</p>
    </div>
  )

  renderTasksListView = () => {
    const tasksList = this.getTasksList()
    return (
      <ul className="tasks-list">
        {tasksList.map(eachTask => (
          <TaskItem key={eachTask.id} taskItem={eachTask} />
        ))}
      </ul>
    )
  }

  render() {
    const {activeTabId} = this.state
    const tasksList = this.getTasksList()
    const len = tasksList.length

    return (
      <div className="main-bg">
        <div className="create-task-cont">
          <h1 className="create-task-head">Create a task!</h1>
          <form className="form" onSubmit={this.onSubmitForm}>
            {this.renderTaskInputContainer()}
            {this.renderTagsInputContainer()}
            <div className="add-btn-cont">
              <button
                className="add-task-btn"
                type="submit"
                onClick={this.onClickAddTask}
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="created-tasks-cont">
          <h1 className="tags-head">Tags</h1>
          <ul className="tabs-list">
            {tagsList.map(eachItem => (
              <TabItem
                key={eachItem.optionId}
                tabItem={eachItem}
                isActive={activeTabId === eachItem.optionId}
                onUpdateActiveTabStatus={this.onUpdateActiveTabStatus}
              />
            ))}
          </ul>
          <h1 className="tags-head">Tasks</h1>
          {len === 0 ? this.renderEmptyView() : this.renderTasksListView()}
        </div>
      </div>
    )
  }
}

export default App
