import React from 'react';
import Card from './Card';
import GoogleMap from './GoogleMap';
import data from './data/Data';
import jump from 'jump.js';
import { easeInOutCubic } from './utils/Easing';
import Header from './Header';
import image from '../images/location-map.svg';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			properties: data.properties,
			activeProperty: data.properties[0],
			showFilter: false,
			filterBedrooms: 'any',
			filterBathrooms: 'any',
			filterCarSpaces: 'any',
			filteredProperties: [],
			filterSort: 'any',
			priceFrom: 500000,
			priceTo: 1000000,
			isFiltering: false
		};
	}

	handleFilterChange = e => {
		this.setState(
			{
				[e.target.name]: e.target.value
			},
			function() {
				this.filterProperties();
			}
		);
	};

	filterProperties = () => {
		const {
			properties,
			filterBedrooms,
			filterBathrooms,
			filterCarSpaces,
			filterSort,
			priceTo,
			priceFrom
		} = this.state;
		var isFiltering =
			filterBedrooms !== 'any' ||
			filterBathrooms !== 'any' ||
			filterCarSpaces !== 'any' ||
			filterSort !== 'any' ||
			priceFrom !== '0' ||
			priceTo !== '1000001';
		const getFilteredProperties = properties => {
			const filteredProperties = [];
			properties.map(property => {
				const { bedrooms, bathrooms, carSpaces, price } = property;
				const match =
					(bedrooms === parseInt(filterBedrooms) || filterBedrooms === 'any') &&
					(bathrooms === parseInt(filterBathrooms) ||
						filterBathrooms === 'any') &&
					(carSpaces === parseInt(filterCarSpaces) ||
						filterCarSpaces === 'any') &&
					(price >= priceFrom && price <= priceTo);

				match && filteredProperties.push(property);
			});

			switch (filterSort) {
				case '0':
					filteredProperties.sort((a, b) => a.price - b.price);

					break;

				case '1':
					filteredProperties.sort((a, b) => b.price - a.price);

					break;
			}

			return filteredProperties;
		};

		this.setState({
			filteredProperties: getFilteredProperties(properties),
			activeProperty: getFilteredProperties(properties)[0] || properties[0],
			isFiltering
		});
	};

	toggleFilter = e => {
		e.preventDefault();

		this.setState({
			showFilter: !this.state.showFilter
		});
	};

	setActiveProperty = (property, scroll) => {
		const { index } = property;

		this.setState({
			activeProperty: property
		});

		// scroll to the right property

		if (scroll) {
			const target = `#card-${index}`;
			jump(target, {
				duration: 800,
				easing: easeInOutCubic
			});
		}
	};

	clearFilter = (e, form) => {
		e.preventDefault();
		this.setState({
			properties: this.state.properties.sort((a, b) => a.index - b.index),
			filterBedrooms: 'any',
			filterBathrooms: 'any',
			filterCarSpaces: 'any',
			filterSort: 'any',
			isFiltering: false,
			filteredProperties: [],
			activeProperty: this.state.properties[0]
		});
		form.reset();
	};

	render() {
		const {
			properties,
			activeProperty,
			showFilter,
			filteredProperties,
			isFiltering,
			filterSort
		} = this.state;

		// Now sort the propertiesList

		const propertiesList = isFiltering ? filteredProperties : properties;

		return (
			<div>
				{/* listings - Start */}
				<div className="listings">
					<Header
						showFilter={showFilter}
						toggleFilter={this.toggleFilter}
						clearFilter={this.clearFilter}
						handleFilterChange={this.handleFilterChange}
					/>

					<div className="cards container">
						<div
							className={`cards-list row ${
								propertiesList.length === 0 ? 'is-empty' : ''
							}`}
						>
							{propertiesList.map(property => {
								return (
									<Card
										key={property._id}
										property={property}
										activeProperty={activeProperty}
										setActiveProperty={this.setActiveProperty}
									/>
								);
							})}
							{isFiltering && propertiesList.length == 0 && (
								<p className="warning">
									<img src={image} />
									<br />
									No Properties were Found
								</p>
							)}
						</div>
					</div>
				</div>
				{/* listings - End */}

				<GoogleMap
					properties={properties}
					activeProperty={activeProperty}
					setActiveProperty={this.setActiveProperty}
					isFiltering={isFiltering}
					filteredProperties={filteredProperties}
				/>
			</div>
		);
	}
}

export default App;
