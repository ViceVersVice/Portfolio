import { baseUrl } from '../base/baseUrls.js'

const getCurrentUserData = (callback) => {
    fetch(`${baseUrl}/accounts/userinfo/`,
			{	
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			}
		).then(callback);
}


export { getCurrentUserData }