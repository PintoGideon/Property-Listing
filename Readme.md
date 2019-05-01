# A Property Listing App

I created this app as a part of my Netfix and Skill series where I create apps in my spare time. Here is a link to one: [Github Battle](https://github.com/PintoGideon/Battle-on-Github)

I recevied a take away coding challenge by a company which was pretty basic. All I had to do was apply multiple filters across the columns in the table and sort them. I was on track until I decided to refactor my code and wound myself ending up not finishing the test and getting rejected. 



## Home Page
   ![Home Page](https://user-images.githubusercontent.com/15992276/57006723-004de880-6bb1-11e9-9b2c-40f9c733867a.JPG)
   
## Filters
  ![Filter](https://user-images.githubusercontent.com/15992276/57006721-004de880-6bb1-11e9-8379-d682575333a0.JPG)
   
  ![Filters](https://user-images.githubusercontent.com/15992276/57006722-004de880-6bb1-11e9-9990-7ee5186e859b.png)
  


## Sorting the listings

![Sorting](https://user-images.githubusercontent.com/15992276/57006724-004de880-6bb1-11e9-9dd0-488a1fd2d200.JPG)

While coding this application, I realized my mistakes and am documenting it here for future references.

# The Hard Parts

### Multiple Parts

Have an app level state for the filters. In the coding challenge, I used filters as an array but it did not work well. I am not a big fan of storing state like below and would be practising storing it implicitly by creating compoun component. However, it is important to first get a working example of the app and then moving pieces around.

```javascript
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
```

The logic for filtering is that we have an array of objects received as data and we create a filtered list of the data to loop through.

``` javascript
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
		}
      
  ```

 ### Google Maps API
 
 The logic is to move the markers around the map and show the addresses as popups when the user clicks across the listings. Now, I have an active property in the state which is set when the user clicks on a particular listing.
 
 Whenever the we update the state, 
 
 I want the marker to move to the active listing. Initially it is set to the first listing by default. ***getDerivedStateFromProps*** is a static method which is invoked after a component is instantiated as well as when it receives new props. Since it is a static method, you cannot access this inside this method neither you can access any other class method. Unlike componentWillReceiveProps you cannot set state inside this method, so the only way to update state is returning an object. If you don’t want to update any state, simply return null.
 
 ```javascript
 static getDerivedStateFromProps(nextProps) {
		const { activeProperty, filteredProperties, isFiltering } = nextProps;
		const { latitude, longitude, index } = activeProperty;

		//Hide all other info windows

		// Show info window of new active property

		if (isFiltering && filteredProperties.length === 0) {
			this.hidePopup();
		} else {
			this.hidePopup();
			this.showPopup(index);
		}
	}
 
```

The most common uses of ***componentDidUpdate()*** is managing 3rd party UI elements and interacting with the Native UI. When using 3rd Party libraries, like our Chart example, we need to update the UI library with new data.

```
Here we access our markers from the state and update it when the filters are applied.


```
componentDidUpdate() {
		const { filteredProperties, isFiltering } = this.props;
		const { markers } = this.state;

		markers.forEach(marker => {
			const { property } = marker;

			if (isFiltering) {
				// show markers of filtered properties

				if (filteredProperties.includes(property)) {
					markers[property.index].setVisible(true);
				} else {
					//hide all other markers
					markers[property.index].setVisible(false);
				}
			} else {
				//Show all markers
				markers[property.index].setVisible(true);
			}
		});
	}
  ```












