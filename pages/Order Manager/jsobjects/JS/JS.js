export default {
	getUsersWithoutRoleOM () {
		return getUsersWithRoleOM.run().then(() => {  // Added return
			return getUsers.run().then(() => {  // Return the inner promise
				let users = getUsers.data.filter(user => 
					!getUsersWithRoleOM.data.some(userOM => user.id === userOM.id)
				);
				// Store only userName as an array of strings
				users = users.map(user => user.userName);
				storeValue('usersWithoutRoleOM', users);
				return users;  // Explicitly return the users list
			});
		});
	},

	createOrderManager () {
		if (SelectUser.isValid && SelectSalesOffice.isValid && SelectSalesGroups.isValid) {
			createOrderManager.run().then(() => {
				showAlert('Order manager created with success', 'success');
			}).catch((error) => {
				showAlert('An error occurred during Order Manager creation', 'error');
				console.error('createOrderManager', error);
			});
		} else {
			showAlert('Some fields are required', 'error');
		}
	},

	onChangeSalesOffice () {
		SelectSalesGroups.setSelectedOptions([]);
		getSalesGroups.run();
	}
}