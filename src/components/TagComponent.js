import {Control, Errors} from 'react-redux-form'
import {Badge, Input} from 'reactstrap'
import React, {Component} from 'react'

class TagInput extends Component{
	constructor(props) {
		super(props)
		console.log(props)
		this.state = {
			tags: props.tags
		}
		this.handleKeyPress = this.handleKeyPress.bind(this)
	}

	handleKeyPress(event) {
		let tags = this.state.tags && this.state.tags.length>0 ? this.state.tags.slice(): []
		let value = event.target.value.trim()
		if(event.key == 'Enter' && value.length>0) {
			tags.push({
				content: event.target.value,
				color: 'primary'
			})
			this.setState({
				tags: tags
			})
			event.target.value = ''
			this.props.onChange(tags)
		}

	}

	removeTag(id) {
		let tags = this.state.tags;
		for(let i = 0; i < tags.length; i++){
			if(i === id) {
				tags.splice(i,1)
			}
		}
		this.setState({
			tags: [...tags]
		})
	}

	render(){
		console.log(this.state.tags)
		return (
			<div className={`${this.props.className} tag`} >
				<Input onKeyPress = {this.handleKeyPress}/>
				{
					this.state.tags?
					(
						<React.Fragment>
							<div>{this.state.tags.map((tag,i) => (
								<h4 className='float-left' key={i}><Badge pill color={tag.color}>{tag.content}<span style={{marginLeft:'0.5rem'}} onClick={()=>this.removeTag(i)}>x</span></Badge></h4>
							))}
							</div>
							<div style={{clear:'both'}}></div>
						</React.Fragment>
					)
					: 
					(<React.Fragment></React.Fragment>)
				}
				
			</div>
		)
	}
}

export default TagInput

export class Tags extends Component {
	render() {
		const tags = this.props.tags 
		return (
			<div className = {`${this.props.className} tag`}>
				{
					tags.map((tag,i) => (
						<h4 className='float-left' key={i}><Badge pill color={tag.color}>{tag.content}</Badge></h4>
					))
				}
			</div>
		)
	}
}