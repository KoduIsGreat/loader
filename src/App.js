import React, { Component } from 'react';
import './App.css';

/**
 * Util function
 * @param {*} WrappedComponent The component to  wrap the display name around
 */
const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
/**
 * a simple SFC that will display our async loader
 */
const Loader = () =>
  <div className="loader">
    <svg className="circular">
      <circle className="path" cx="100" cy="100" r="20" fill="none" strokeWidth={5} strokeMiterlimit={10}></circle>
    </svg>
  </div>

/**
 * A HoC that will render the component that is passed, or display a loader
 * @param {*} Component the component to optionally render when isLoading is false
 */
const isAsync = (Component) =>{
  const IsAsync = ({ isLoading, ...props}) =>{
    if(!isLoading) return (<Component {...props}/>)
    return (<Loader />)
  }
  IsAsync.displayName = `isAsync(${getDisplayName(Component)})`
  return IsAsync
}

/**
 * A HoC that does some async work ( a service request ) and passes on the result to the component
 * @param {*} Component the component that is wrapped
 */
const withDataSource = (Component) =>{
  const AsyncComponent = isAsync(Component)
  class DataSource extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        loading : true,
        data : null
      }
      
    }
    componentDidMount(){
      setTimeout(() => {
        this.setState({loading : false})
        this.setState({data: 'weeeeeeee'})
      }, 3000)
    }

    render(){
      return <AsyncComponent {...this.props } data={this.state.data} isLoading={this.state.loading} />
    }
  }
  DataSource.displayName = `withDataSource(${getDisplayName(AsyncComponent)})`
  return DataSource
}

/**
 * a simple SFC that is just displaying some text (this could be any SFC that consumes a data prop!)
 * @param {*} props 
 */
const Paragraph = (props) => <p>This is some text {props.data}</p>

/**
 * the thing our app is going to render which is just the paragraph except with our HoC applied.  
 */
const AsyncDataSourceRender = withDataSource(Paragraph)

/**
 * the app!
 */
class App extends Component {
  render() {
    return <AsyncDataSourceRender />
  }
}

export default App;
