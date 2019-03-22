import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header/HeaderComponent';
import Home from './Home/HomeComponent';
import ItemsList from './ItemsList/ItemsListContainer';
import Product from './Product/ProductContainer';
import './App.scss';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Header />
					<main>
						<Switch>
							<Route exact path="/" component={Home}/>
							<Route exact path="/items" component={ItemsList} />
							<Route path="/items/:id" component={({ match }) => <Product productId={match.params.id} />} />
							<Redirect to="/" />
						</Switch>
					</main>
				</div>
			</Router>
		);
	}
}

export default App;
