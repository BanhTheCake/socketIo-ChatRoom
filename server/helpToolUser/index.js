let usersData = []
let id = 0;

const isExistUser = (data) => {
    const currentUser = usersData.filter(user => user?.username === data.username)
    if (currentUser.length > 0) {
        return true
    }
    return false
}

const addUsersData = (data, id) => {
    usersData.push({id: id, ...data})
}

const getAllUsers = (room) => {
    return usersData.filter(user => user.room === room)
}

const deleteUser = (id) => {
    const currentUserIndexOf = usersData.findIndex(user => user.id === id)
    const currentUser = usersData.find(user => user.id === id)
    if(currentUserIndexOf !== -1) {
        usersData.splice(currentUserIndexOf, 1)
    }
    return { usersData, room: currentUser?.room, username: currentUser?.username }
}

module.exports = { isExistUser, getAllUsers, deleteUser, addUsersData }