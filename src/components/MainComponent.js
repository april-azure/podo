import React, { Component } from 'react'
import Footer from './FooterComponent'
import Header from './HeaderComponent'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Marketing } from './MarketingComponent'
import Login from './LoginComponent'
import MyPage from './MyPageComponent'
import { connect } from 'react-redux'
import ProjectDetail from './ProjectDetailComponent'
import { fetchProjects } from '../redux/ActionCreator'

const mapStateToProps = (state) => {
	return {
		projects: state.projects
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProjects: () => dispatch(fetchProjects())
	}
}

class Main extends Component {

	componentDidMount() {
		this.props.fetchProjects()
	}

	render() {
		return (
			<div>
				<Header/>
					<Switch>
						<Route path='/marketing' component = { Marketing }/>
						<Route path = '/login' component = { Login }/>
						<Route path = '/mypage' component = { () => ( <MyPage projects={this.props.projects} /> ) } />
						<Route path = '/projectdetail' component = { ProjectDetail } />
						<Redirect to = '/marketing' />
					</Switch>
				<Footer/>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)