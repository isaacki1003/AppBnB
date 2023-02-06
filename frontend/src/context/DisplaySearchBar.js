import React, { useContext, useState, createContext } from 'react';

const DisplaySearchBar = createContext();

export function DisplaySearchBarProvider({ children }) {
	const [searchBarModalActive, setSearchBarModalActive] = useState(false);

	return (
		<DisplaySearchBar.Provider
			value={{
				setSearchBarModalActive,
				searchBarModalActive
			}}
		>
			{children}
		</DisplaySearchBar.Provider>
	);
}

const useDisplaySearchBar = () => useContext(DisplaySearchBar);

export default useDisplaySearchBar;
