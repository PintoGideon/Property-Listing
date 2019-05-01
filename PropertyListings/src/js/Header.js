import React from 'react';
import PropTypes from 'prop-types';
import image from '../images/house-location-pin.svg';
import Filter from './Filter';

const Header = ({
	showFilter,
	toggleFilter,
	handleFilterChange,
	clearFilter
}) => {
	return (
		<header className={`${showFilter ? 'filter-is-visible' : ''}`}>
			<Filter
				toggleFilter={toggleFilter}
				handleFilterChange={handleFilterChange}
				clearFilter={clearFilter}
			/>

			<img src={image} />
			<h1>Property Listings</h1>
			<button className="btn-filter" onClick={e => toggleFilter(e)}>
				Filter
			</button>
		</header>
	);
};

Header.propTypes = {
	showFilter: PropTypes.bool.isRequired,
	toggleFilter: PropTypes.func.isRequired,
	clearFilter: PropTypes.func.isRequired
};

export default Header;
