import React, { useContext, useState, createContext } from 'react';

const ModalContext = createContext();

const useModalVariableContext = () => useContext(ModalContext);

export function ModalVariableProvider({ children }) {
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showSignupModal, setShowSignupModal] = useState(false);
	const [showReviewModal, setShowReviewModal] = useState(false);

	return (
		<ModalContext.Provider
			value={{
				showLoginModal,
				setShowLoginModal,
				showSignupModal,
				setShowSignupModal,
				showReviewModal,
				setShowReviewModal,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
}

export default useModalVariableContext;
