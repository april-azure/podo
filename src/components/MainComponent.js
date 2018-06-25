import React, { Component } from 'react'
import Footer from './FooterComponent'
import Header from './HeaderComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { Marketing } from './MarketingComponent'
import Login from './LoginComponent'
import MyPage from './MyPageComponent'
import { connect } from 'react-redux'
import ProjectDetail from './ProjectDetailComponent'
import { fetchProjects, addProject, fetchTaskPanels, addTaskPanel, fetchTasks, 
	addTodo, signIn, signOut, finishTask, updateTitle } from '../redux/ActionCreator'

const mapStateToProps = (state) => {
	return {
		projects: state.projects,
		taskPanels: state.taskPanels,
		tasks: state.tasks,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProjects: () => dispatch(fetchProjects()),
		addProject:(project) => dispatch(addProject(project)),
		fetchTaskPanels: () => dispatch(fetchTaskPanels()),
		addTaskPanel: (taskList) => dispatch(addTaskPanel(taskList)),
		fetchTasks: () => dispatch(fetchTasks()),
		finishTask: (taskId) => dispatch(finishTask(taskId)),
		addTodo: (todo) => dispatch(addTodo(todo)),
		signIn: (username) => dispatch(signIn(username)),
		signOut: () => dispatch(signOut()),
		updateTitle: (panelId, title) => dispatch(updateTitle(panelId, title))
	}
}

class Main extends Component {

	componentDidMount() {
		this.props.fetchProjects()
		this.props.fetchTaskPanels()
		this.props.fetchTasks()
	}

	render() {
		const RenderTaskPanel = ({match}) => {
			const projectId = parseInt(match.params.projectId)
			var taskPanels = [], tasks = [], project = []
			if (this.props.taskPanels.taskPanels){
				taskPanels = this.props.taskPanels.taskPanels.filter((taskPenel)=> taskPenel.projectId === projectId )
			}
			
			if (this.props.tasks.tasks) {
				tasks = this.props.tasks.tasks.filter((task) => task.projectId === projectId)
			}

			if (this.props.projects.projects) {
				project = this.props.projects.projects.filter((project) => project.id === projectId)[0]
			}

			return (
				<ProjectDetail 
					addTaskList = {this.props.addTaskPanel} 
					project = {project} 
					taskPanels = {taskPanels}
					tasks = {tasks}
					addTodo = {this.props.addTodo}
					finishTask = {this.props.finishTask}
					updateTitle = {this.props.updateTitle}
				/>
			)
		}

		const RenderMyPage = () => {
			return (
				<MyPage addProject = {this.props.addProject} projects = {this.props.projects} tasks = {this.props.tasks} />
			)
		}

		return (
			<div>
				<Header user = {this.props.user} signOut = {this.props.signOut} />
					<Switch>
						<Route path= '/marketing' component = { Marketing }/>
						<Route path = '/login'  component = {()=> <Login signIn = {this.props.signIn}/> }/>
						<Route path = '/mypage'  component = { RenderMyPage } />
						<Route path = '/projectdetail/:projectId' component = { RenderTaskPanel } />
						<Redirect to = '/login' />
					</Switch>
				<Footer/>
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))