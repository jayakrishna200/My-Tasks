import './index.css'

const TaskItem = props => {
  const {taskItem} = props
  const {task, tag} = taskItem
  return (
    <li className="task-item">
      <p className="task">{task} </p>
      <p className="tag">{tag}</p>
    </li>
  )
}
export default TaskItem
