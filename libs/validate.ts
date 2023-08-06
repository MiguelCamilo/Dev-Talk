import toast from 'react-hot-toast';

export const validatePassword = (password: string) => {
	const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

	if (!specialChars.test(password)) {
		return toast.error('Password must include special characters.', {
			id: 'special-chars',
			style: { background: 'red', color: 'white', fontSize: 'small'},
		});
	}

	if (password.length < 4) {
		return toast.error('Password must be longer than 4 characters', {
			id: 'char-length',
			style: { background: 'red', color: 'white', fontSize: 'small'},
		});
	}

	if (password.includes(' ')) {
		return toast.error('Password has a space, try again', {
			id: 'includes-string',
			style: { background: 'red', color: 'white', fontSize: 'small'},
		});
	}
};

export const validateUsername = (username: string) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (specialChars.test(username)) {
		return toast.error('Username can not include special characters.', {
			id: 'special-chars',
			style: { background: 'red', color: 'white', fontSize: 'small'},
		});
	}

    if(username.includes(' ')) {
        return toast.error('Username has a space, try again', {
			id: 'includes-string',
			style: { background: 'red', color: 'white', fontSize: 'small'},
		}); 
    }

    if(username.length >= 10) {
        return toast.error('Username must less than 10 characters.', {
			id: 'includes-string',
			style: { background: 'red', color: 'white', fontSize: 'small'},
		}); 
    }

    if(username.length < 4) {
        return toast.error('Username must more than 4 characters.', {
			id: 'includes-string',
			style: { background: 'red', color: 'white', fontSize: 'small'},
		}); 
    }
};
